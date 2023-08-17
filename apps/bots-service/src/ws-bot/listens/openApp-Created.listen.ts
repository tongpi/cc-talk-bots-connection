import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OpenAppCreatedEvent } from '../../openApp/events/openApp-created.event';

@Injectable()
export class OpenAppCreatedListener {
  @OnEvent('openApp.created')
  handleOrderCreatedEvent(event: OpenAppCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log("添加了新应用",event);
  }
  @OnEvent('openApp.updated')
  handleOrderUpdatedEvent(event: OpenAppCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log("修改了应用",event);
  }
}