import { InputJsonValue } from "../../types";
import { OpenAppCreateNestedManyWithoutBotAppsInput } from "./OpenAppCreateNestedManyWithoutBotAppsInput";

export type BotAppCreateInput = {
  apiEndPoint: string;
  apiSecret: string;
  appDesc?: string | null;
  appName: string;
  inputs?: InputJsonValue;
  openApps?: OpenAppCreateNestedManyWithoutBotAppsInput;
  welcome?: string | null;
};
