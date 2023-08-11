/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, OpenApp, BotApp } from "@prisma/client";

export class OpenAppServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.OpenAppCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppCountArgs>
  ): Promise<number> {
    return this.prisma.openApp.count(args);
  }

  async findMany<T extends Prisma.OpenAppFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppFindManyArgs>
  ): Promise<OpenApp[]> {
    return this.prisma.openApp.findMany(args);
  }
  async findOne<T extends Prisma.OpenAppFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppFindUniqueArgs>
  ): Promise<OpenApp | null> {
    return this.prisma.openApp.findUnique(args);
  }
  async create<T extends Prisma.OpenAppCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppCreateArgs>
  ): Promise<OpenApp> {
    return this.prisma.openApp.create<T>(args);
  }
  async update<T extends Prisma.OpenAppUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppUpdateArgs>
  ): Promise<OpenApp> {
    return this.prisma.openApp.update<T>(args);
  }
  async delete<T extends Prisma.OpenAppDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.OpenAppDeleteArgs>
  ): Promise<OpenApp> {
    return this.prisma.openApp.delete(args);
  }

  async findBotApp(
    parentId: string,
    args: Prisma.BotAppFindManyArgs
  ): Promise<BotApp[]> {
    return this.prisma.openApp
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .botApp(args);
  }
}
