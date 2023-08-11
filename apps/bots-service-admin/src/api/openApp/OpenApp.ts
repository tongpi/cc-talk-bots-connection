import { BotApp } from "../botApp/BotApp";

export type OpenApp = {
  activate: boolean;
  appId: string;
  appName: string;
  appSecret: string;
  botApp?: Array<BotApp>;
  createdAt: Date;
  id: string;
  updatedAt: Date;
};
