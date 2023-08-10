import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BotAppModuleBase } from "./base/botApp.module.base";
import { BotAppService } from "./botApp.service";
import { BotAppController } from "./botApp.controller";
import { BotAppResolver } from "./botApp.resolver";

@Module({
  imports: [BotAppModuleBase, forwardRef(() => AuthModule)],
  controllers: [BotAppController],
  providers: [BotAppService, BotAppResolver],
  exports: [BotAppService],
})
export class BotAppModule {}
