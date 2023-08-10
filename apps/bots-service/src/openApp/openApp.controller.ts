import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OpenAppService } from "./openApp.service";
import { OpenAppControllerBase } from "./base/openApp.controller.base";

@swagger.ApiTags("openApps")
@common.Controller("openApps")
export class OpenAppController extends OpenAppControllerBase {
  constructor(
    protected readonly service: OpenAppService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
