import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OpenAppServiceBase } from "./base/openApp.service.base";
import { OpenAppCreatedEvent, OpenAppDeletedEvent, OpenAppUpdatedEvent } from "./events/openApp-created.event";
import { OpenApp, Prisma } from "@prisma/client";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OpenAppService extends OpenAppServiceBase {
  constructor(protected readonly prisma: PrismaService, private eventEmitter: EventEmitter2) {
    super(prisma);
  }

  async create<T extends Prisma.OpenAppCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppCreateArgs>
  ): Promise<OpenApp> {
    const result = this.prisma.openApp.create<T>(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:OpenAppCreatedEvent={name,description}
    this.eventEmitter.emit('openApp.created', openAppCreatedEvent);
    return result;
  }

  async update<T extends Prisma.OpenAppUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppUpdateArgs>
  ): Promise<OpenApp> {
    const result = this.prisma.openApp.update<T>(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:OpenAppUpdatedEvent={name,description}
    this.eventEmitter.emit('openApp.updated', openAppCreatedEvent);
    return result;    
  }  

  async delete<T extends Prisma.OpenAppDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppDeleteArgs>
  ): Promise<OpenApp> {
    const result = this.prisma.openApp.delete(args);
    const name = (await result).appName;
    const description = (await result).appName
    let openAppCreatedEvent:OpenAppDeletedEvent={name,description}
    this.eventEmitter.emit('openApp.deleted', openAppCreatedEvent);
    return result;     
  }  
}
