import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BotAppServiceBase } from "./base/botApp.service.base";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BotApp, Prisma } from "@prisma/client";
import { BotAppCreatedEvent, BotAppDeletedEvent, BotAppUpdatedEvent } from "./events/openApp-created.event";

@Injectable()
export class BotAppService extends BotAppServiceBase {
  constructor(protected readonly prisma: PrismaService, private eventEmitter: EventEmitter2) {
    super(prisma);
  }

  async create<T extends Prisma.BotAppCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BotAppCreateArgs>
  ): Promise<BotApp> {
    const result = this.prisma.botApp.create<T>(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:BotAppCreatedEvent={name,description}
    this.eventEmitter.emit('botApp.created', openAppCreatedEvent);
    return result;
  }

  async update<T extends Prisma.BotAppUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BotAppUpdateArgs>
  ): Promise<BotApp> {
    const result = this.prisma.botApp.update<T>(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:BotAppUpdatedEvent={name,description}
    this.eventEmitter.emit('botApp.updated', openAppCreatedEvent);
    return result;    
  }  

  async delete<T extends Prisma.BotAppDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BotAppDeleteArgs>
  ): Promise<BotApp> {
    const result = this.prisma.botApp.delete(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:BotAppDeletedEvent={name,description}
    this.eventEmitter.emit('botApp.deleted', openAppCreatedEvent);
    return result;     
  }  
}
