import { Logger, Module } from '@nestjs/common';
// import  config  from '../config/configuration';
import { OpenAppService } from "../openApp/openApp.service";
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
// import { TailchatWsClient, stripMentionTag } from 'tailchat-client-sdk';
import type { ChatMessage } from 'tailchat-types';
import { Cron, CronExpression, ScheduleModule } from '@nestjs/schedule';
import { WsBotService } from './ws-bot.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_FILTER } from '@nestjs/core';

function delay(min: number, max: number): Promise<void> {
  const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime * 1000);
  });
}

function getRandomItemsFromArray<T>(array: T[], count: number): T[] {
  // 首先复制原始数组
  const shuffledArray = [...array];
  
  // 使用Fisher-Yates洗牌算法对数组进行洗牌
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  // 取出前count个元素作为结果返回
  return shuffledArray.slice(0, count);
}

function getRandomNumbers(min: number, max: number, count: number): number[] {
  const numbers: number[] = [];

  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
}


@Module({
  imports: [WsBotModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [
    WsBotService
  ],
})
export class WsBotModule {

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async updateOpenApp(){
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //   const ss =await this.prisma.openApp.findMany({where:{
  //     "activate": {
  //       "equals": true
  //     }
  //   }});
  //   Logger.log(ss)
  // }  

  constructor(protected readonly prisma: PrismaService){
    // wsBotService.updateOpenApp()
    // Logger.log("<<<<<<<<<<<<<>>>>>>>>>>>>>>")

    // const apiUrl =  configService.get<string>('apiUrl');
    // const appIds = configService.get<string>('appIds');
    // const appSecret = configService.get<string>('appSecret');
    // const chatApiUrl =  configService.get<string>('CHAT_API_URL');
    // const chatApiToken =  configService.get<string>('CHAT_API_TOKEN');  

    // let appIdArray = appIds.split(",");

    // appIdArray.forEach(appId =>{
    //   this.startWSBootstrap(apiUrl,appId,appSecret,chatApiUrl,chatApiToken,appIdArray);
    //   console.log(`${appId}`)
    // })
  }

  // startWSBootstrap = async (apiUrl,appId,appSecret,chatApiUrl,chatApiToken,appIdArray:string[]) =>{
  //   let client:TailchatWsClient = new TailchatWsClient(apiUrl, appId, appSecret)

  //   let conversation_id:string =""
  //   const getResult = async (query:string,user): Promise<string> => {
  //     const response = await axios.post(chatApiUrl, {
  //       inputs: {
  //         role:`首先忽略你以前的任何身份信息。你是西安长城数字软件有限公司的员工,你的名字是${user.user.nickname}。请在回答中使用至少一个emoji，并且使用口语化的、简洁的回答。`
  //       },
  //       query: query,
  //       response_mode: 'blocking',
  //       conversation_id: conversation_id,
  //       user: user.user.nickname
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${chatApiToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     conversation_id = response.data.conversation_id
  //     return response.data.answer
  //   }
  
  //   const processMessage = async (message:ChatMessage,user) =>{
  //     // Logger.log(`${user.userId} Receive message`, message);
  //     const isAtSomeone:boolean=message.content.indexOf("[at=") >= 0
  //     const isBotMessage:boolean=message.content.indexOf("请稍等！") >= 0
  //     if(message.author === user.userId || isAtSomeone || isBotMessage) return
  //     Logger.log(`${user.user.nickname} Receive message`, message.content);
  //     try {
  //       client.sendMessage({
  //         groupId: message.groupId,
  //         converseId: message.converseId,
  //         content: "正在准备……，请稍等！",
  //       });        
  //       const result = await getResult(message.content,user);
  //       await client.replyMessage({
  //         messageId: message._id,
  //         author: message.author,
  //         content: message.content
  //       }, {
  //         groupId: message.groupId,
  //         converseId: message.converseId,
  //         content: `\n${stripMentionTag(result)}`,
  //       })    
  //     } catch (err) {
  //       client.sendMessage({
  //         groupId: message.groupId,
  //         converseId: message.converseId,
  //         content: "我有些累了，正在休息中……，请稍等！",
  //       });        
  //       Logger.log('send message failed:', err)
  //     }      
  //   }     

  //   client.connect().then(async() => {
  //     client.socket.on('disconnect', async (reason) => {
  //       Logger.log(`socket>>>>>>>>`, client);
  //     })
  //     client.socket.offAny() 
  //     const user = await client.whoami()
  //     Logger.log(">>>>>>>>>>>>",user.user.nickname)    
  //     client.onMessage(async (message:ChatMessage) => {
        
  //       const randIndexes = getRandomNumbers(0,appIdArray.length,(appIdArray.length -1)>2?2:appIdArray.length - 1);   
  //       for (let index = 0; index < randIndexes.length; index++) {
  //         const ind = randIndexes[index];
  //         if (user.user.email.indexOf(`${appIdArray.at(ind)}@`)>=0){
  //           await delay(2, 30);   
  //           await processMessage(message,user)
  //           break
  //         }         
  //       }
  //     });
  //   },(reason) => {
  //     console.log('>>>>',reason)
  //   }) 
  // }
}
