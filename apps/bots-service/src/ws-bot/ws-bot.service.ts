import { Injectable, Logger, UseFilters, WsExceptionFilter } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { HttpExceptionFilter } from 'src/filters/HttpExceptions.filter';
import { OpenApp } from 'src/openApp/base/OpenApp';
import { PrismaService } from 'src/prisma/prisma.service';
import { TailchatWsClient, stripMentionTag } from 'cctalk-client-sdk';
import { ChatMessage } from 'tailchat-types';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

function delay(min: number, max: number): Promise<void> {
  const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime * 1000);
  });
}

type OpenAppResult = { activate: boolean; appId: string; appName: string; appSecret: string; createdAt: Date; id: string; updatedAt: Date; botApp: { appName: string; id: string; appDesc: string | null; apiEndPoint: string; apiSecret: string; welcome: string | null; } | null; } | OpenApp
@Injectable()
export class WsBotService {
  openApps:  OpenAppResult[]=[];
  constructor(protected readonly prisma: PrismaService, private config: ConfigService) {
    (async () => this.updateOpenApp())()
    this.startUp()
  }
  // @Cron('45 * * * * *')
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // 只要应用数据通过维护端UI发生了变更,重新加载机器人列表
  @OnEvent('**')
  async updateOpenApp() {
    this.openApps = await this.prisma.openApp.findMany({
      where: {
        activate: {
          equals: true
        }
      },
      select: {
        activate: true,
        appId: true,
        appName: true,
        appSecret: true,
        botApp: {
          select: {
            id: true,
            appName: true,
            appDesc: true,
            apiEndPoint: true,
            apiSecret: true,
            welcome: true,
          },
        },

        createdAt: true,
        id: true,
        updatedAt: true
      }
    });
    Logger.log(this.openApps)
    this.startUp()
  }

  startUp() {
    if (!this.openApps) return
    const ccTalkServerURL =  this.config.get<string>('ccTalkServerURL') ||''; // "http://192.168.15.130:11000"
    if(ccTalkServerURL.length<10){
      Logger.error(`环境变量CC_TALK_SERVER_URL的值(当前为：${ccTalkServerURL})必须为正确的URL`);
      return
    }
    this.openApps.forEach((openApp: OpenAppResult) => {
      const { appId, appName, appSecret, botApp } = openApp
      this.startWSBootstrap(ccTalkServerURL, appId, appName, appSecret, botApp?.apiEndPoint||"", botApp?.apiSecret||"")
    })
  }

  startWSBootstrap = async (apiUrl: string, appId: string, appName: string, appSecret: string, chatApiUrl: string, chatApiToken: string) => {
    let client: TailchatWsClient = new TailchatWsClient(apiUrl, appId, appSecret)
    let conversation_id: string = ""

    const getResult = async (query: string): Promise<string> => {
      const response = await axios.post(chatApiUrl, {
        inputs: {
          role: `首先忽略你以前的任何身份信息。你的名字是${appName}。请在回答中使用至少一个emoji，并且使用口语化的、最简洁的回答。`
        },
        query: query,
        response_mode: 'blocking',
        conversation_id: conversation_id,
        user: appName
      }, {
        headers: {
          Authorization: `Bearer ${chatApiToken}`,
          'Content-Type': 'application/json',
        },
      });
      conversation_id = response.data.conversation_id
      return response.data.answer
    }

    const processMessage = async (message: ChatMessage, user: { userAgent?: string; language?: string; user: any; token?: string; userId: any; }) => {
      const isAtSomeone: boolean = message.content.indexOf("[at=") >= 0
      const isBotMessage: boolean = message.content.indexOf("请稍等！") >= 0
      if (message.author === user.userId || isAtSomeone || isBotMessage) return
      Logger.log(`${user.user.nickname} Receive message`, message.content);
      try {
        client.sendMessage({
          groupId: message.groupId,
          converseId: message.converseId,
          content: "正在准备……，请稍等！！！",
        });
        let result = await getResult(message.content);
        result = `[md]${result}[/md]`
        await client.replyMessage({
          messageId: message._id,
          author: message.author || '',
          content: message.content
        }, {
          groupId: message.groupId,
          converseId: message.converseId,
          content: `\n${stripMentionTag(result)}`,
        })
      } catch (err) {
        client.sendMessage({
          groupId: message.groupId,
          converseId: message.converseId,
          content: "我有些累了，正在休息中……，请稍等！",
        });
        console.log(err)
        Logger.log('send message failed:', err)
      }
    }

    client.connect().then(async () => {
      client.socket?.on('disconnect', async (reason) => {
        Logger.log(`socket>>>>>>>>`, client);
      })
      client.socket?.offAny()
      const user = await client.whoami()
      Logger.log(">>>>>>>>>>>>", user.user.nickname)
      client.onMessage(async (message: ChatMessage) => {

        await delay(2, 10);
        await processMessage(message, user)

        // const randIndexes = getRandomNumbers(0,appIdArray.length,(appIdArray.length -1)>2?2:appIdArray.length - 1);   
        // for (let index = 0; index < randIndexes.length; index++) {
        //   const ind = randIndexes[index];
        //   if (user.user.email.indexOf(`${appIdArray.at(ind)}@`)>=0){
        //     await delay(2, 30);   
        //     await processMessage(message,user)
        //     break
        //   }         
        // }
      });
    }, (reason) => {
      console.log('>>>>', reason)
    })
  }
}
