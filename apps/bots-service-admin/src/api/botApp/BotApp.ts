import { JsonValue } from "type-fest";
import { OpenApp } from "../openApp/OpenApp";

export type BotApp = {
  apiEndPoint: string;
  apiSecret: string;
  appDesc: string | null;
  appName: string;
  createdAt: Date;
  id: string;
  inputs: JsonValue;
  openApps?: Array<OpenApp>;
  updatedAt: Date;
  welcome: string | null;
};
