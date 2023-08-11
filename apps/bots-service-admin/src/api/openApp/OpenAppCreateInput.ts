import { BotAppWhereUniqueInput } from "../botApp/BotAppWhereUniqueInput";

export type OpenAppCreateInput = {
  activate: boolean;
  appId: string;
  appName: string;
  appSecret: string;
  botApp?: BotAppWhereUniqueInput | null;
};
