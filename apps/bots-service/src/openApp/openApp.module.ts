import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { OpenAppModuleBase } from "./base/openApp.module.base";
import { OpenAppService } from "./openApp.service";
import { OpenAppController } from "./openApp.controller";
import { OpenAppResolver } from "./openApp.resolver";

@Module({
  imports: [OpenAppModuleBase, forwardRef(() => AuthModule)],
  controllers: [OpenAppController],
  providers: [OpenAppService, OpenAppResolver],
  exports: [OpenAppService],
})
export class OpenAppModule {}
