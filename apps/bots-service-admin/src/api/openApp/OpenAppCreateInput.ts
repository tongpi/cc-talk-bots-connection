import { BotAppCreateNestedManyWithoutOpenAppsInput } from "./BotAppCreateNestedManyWithoutOpenAppsInput";

export type OpenAppCreateInput = {
  activate: boolean;
  appId: string;
  appName: string;
  appSecret: string;
  botApp?: BotAppCreateNestedManyWithoutOpenAppsInput;
};
