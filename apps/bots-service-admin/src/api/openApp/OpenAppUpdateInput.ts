import { BotAppWhereUniqueInput } from "../botApp/BotAppWhereUniqueInput";

export type OpenAppUpdateInput = {
  activate?: boolean;
  appId?: string;
  appName?: string;
  appSecret?: string;
  botApp?: BotAppWhereUniqueInput | null;
};
