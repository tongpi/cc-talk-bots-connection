import { BotAppUpdateManyWithoutOpenAppsInput } from "./BotAppUpdateManyWithoutOpenAppsInput";

export type OpenAppUpdateInput = {
  activate?: boolean;
  appId?: string;
  appName?: string;
  appSecret?: string;
  botApp?: BotAppUpdateManyWithoutOpenAppsInput;
};
