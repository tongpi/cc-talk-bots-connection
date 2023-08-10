import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BotAppServiceBase } from "./base/botApp.service.base";

@Injectable()
export class BotAppService extends BotAppServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
