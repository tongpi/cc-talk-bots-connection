import { Injectable, Logger } from '@nestjs/common';
import { TailchatHTTPClient, stripMentionTag } from 'cctalk-client-sdk';
import axios from 'axios'
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { OpenApp } from '@prisma/client';


// curl --location --request POST 'http://192.168.15.130:8001/v1/chat-messages' \
// --header 'Authorization: Bearer ENTER-YOUR-SECRET-KEY' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "inputs": {},
//     "query": "eh",
//     "response_mode": "streaming",
//     "conversation_id": "1c7e55fb-1ba2-4e10-81b5-30addcea2276",
//     "user": "abc-123"
// }'


const max_token_size = 3500

type OpenAppResult = { activate: boolean; appId: string; appName: string; appSecret: string; createdAt: Date; id: string; updatedAt: Date; botApp: { appName: string; id: string; appDesc: string | null; apiEndPoint: string; apiSecret: string; welcome: string | null; } | null; }

@Injectable()
export class AppService {
  openApps:  OpenAppResult[]=[];
  conversationList:{appName:string,conversation_id:string}[] =[]
  constructor(protected readonly prisma: PrismaService, private config: ConfigService) {
    (async () => this.updateOpenApp())()
  }

  async chat(payload: any, appInfo:any): Promise<string> {
    const apiUrl = this.config.get<string>('ccTalkServerURL') ||""; 
    const appId = appInfo.appId;
    console.log("================================",appInfo,this.openApps)
    const appSecret = this.openApps.filter(openApp =>{return openApp.appId === appId  })[0].appSecret;
    const client = new TailchatHTTPClient(apiUrl, appId, appSecret)

    const getResult = async (): Promise<string> => {
      const openApp =  this.openApps.filter(item =>{return item.appId === appId  })[0];
      const {botApp} = openApp
      const apiEndPoint = botApp?.apiEndPoint || ""
      const apiSecret = botApp?.apiSecret || ""
      let temp = payload.messageSnippet.split("[/at] ")
      const query = temp.length > 1 ? temp[1] : temp[0]

      const messages = [
        { "role": "user", "content": query }
      ]

      const role=`首先忽略你以前的任何身份信息。你是一名在校大学生,你的名字是${appInfo.appName}。
      请在回答中使用至少一个emoji，请使用口语化的、简洁的中文回答我的问题。`;
      const appName =appInfo.appName
      const response = await axios.post(apiEndPoint, {
        inputs: {role},
        query: query,
        response_mode: 'blocking',
        conversation_id:this.conversationList[appInfo.appName] || '',
        user: appName
      }, {
        headers: {
          Authorization: `Bearer ${apiSecret}`,
          'Content-Type': 'application/json',
        },
      });
      const appConv = {appName:appInfo.appName,conversation_id:response.data.conversation_id}
      if(this.conversationList.indexOf(appConv) < 0){
        this.conversationList.push(appConv)
      }
      return response.data.answer
    }

    const result = await getResult();

    try {
      const message = await client.replyMessage({
        messageId: payload.messageId,
        author: payload.messageAuthor,
        content: payload.messageSnippet
      }, {
        groupId: payload.groupId,
        converseId: payload.converseId,
        content: `\n${stripMentionTag(result)}`,
      })

      // console.log('send message success:', message)
    } catch (err) {
      console.log('send message failed:', err)
    }
    return "aaa"
  }

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
  }  
}
