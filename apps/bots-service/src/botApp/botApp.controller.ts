import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BotAppService } from "./botApp.service";
import { BotAppControllerBase } from "./base/botApp.controller.base";

@swagger.ApiTags("botApps")
@common.Controller("botApps")
export class BotAppController extends BotAppControllerBase {
  constructor(
    protected readonly service: BotAppService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
