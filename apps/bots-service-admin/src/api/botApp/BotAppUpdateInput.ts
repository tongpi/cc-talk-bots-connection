import { InputJsonValue } from "../../types";
import { OpenAppUpdateManyWithoutBotAppsInput } from "./OpenAppUpdateManyWithoutBotAppsInput";

export type BotAppUpdateInput = {
  apiEndPoint?: string;
  apiSecret?: string;
  appDesc?: string | null;
  appName?: string;
  inputs?: InputJsonValue;
  openApps?: OpenAppUpdateManyWithoutBotAppsInput;
  welcome?: string | null;
};
