import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OpenAppServiceBase } from "./base/openApp.service.base";

@Injectable()
export class OpenAppService extends OpenAppServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
