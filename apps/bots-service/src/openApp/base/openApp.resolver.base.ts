/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateOpenAppArgs } from "./CreateOpenAppArgs";
import { UpdateOpenAppArgs } from "./UpdateOpenAppArgs";
import { DeleteOpenAppArgs } from "./DeleteOpenAppArgs";
import { OpenAppCountArgs } from "./OpenAppCountArgs";
import { OpenAppFindManyArgs } from "./OpenAppFindManyArgs";
import { OpenAppFindUniqueArgs } from "./OpenAppFindUniqueArgs";
import { OpenApp } from "./OpenApp";
import { BotApp } from "../../botApp/base/BotApp";
import { OpenAppService } from "../openApp.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => OpenApp)
export class OpenAppResolverBase {
  constructor(
    protected readonly service: OpenAppService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "read",
    possession: "any",
  })
  async _openAppsMeta(
    @graphql.Args() args: OpenAppCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [OpenApp])
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "read",
    possession: "any",
  })
  async openApps(
    @graphql.Args() args: OpenAppFindManyArgs
  ): Promise<OpenApp[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => OpenApp, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "read",
    possession: "own",
  })
  async openApp(
    @graphql.Args() args: OpenAppFindUniqueArgs
  ): Promise<OpenApp | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => OpenApp)
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "create",
    possession: "any",
  })
  async createOpenApp(
    @graphql.Args() args: CreateOpenAppArgs
  ): Promise<OpenApp> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        botApp: args.data.botApp
          ? {
              connect: args.data.botApp,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => OpenApp)
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "update",
    possession: "any",
  })
  async updateOpenApp(
    @graphql.Args() args: UpdateOpenAppArgs
  ): Promise<OpenApp | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          botApp: args.data.botApp
            ? {
                connect: args.data.botApp,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => OpenApp)
  @nestAccessControl.UseRoles({
    resource: "OpenApp",
    action: "delete",
    possession: "any",
  })
  async deleteOpenApp(
    @graphql.Args() args: DeleteOpenAppArgs
  ): Promise<OpenApp | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => BotApp, {
    nullable: true,
    name: "botApp",
  })
  @nestAccessControl.UseRoles({
    resource: "BotApp",
    action: "read",
    possession: "any",
  })
  async resolveFieldBotApp(
    @graphql.Parent() parent: OpenApp
  ): Promise<BotApp | null> {
    const result = await this.service.getBotApp(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
