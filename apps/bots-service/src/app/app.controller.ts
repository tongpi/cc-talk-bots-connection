import { Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("cctalk-callback")
  @Header('Cache-Control', 'none')
  chat(@Req() request: any):  Promise<string> {
    return this.appService.chat(request.body.payload.payload,request.body.appInfo);
  }
}