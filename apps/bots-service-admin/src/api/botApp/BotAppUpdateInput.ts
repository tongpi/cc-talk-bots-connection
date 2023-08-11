import { InputJsonValue } from "../../types";
import { OpenAppWhereUniqueInput } from "../openApp/OpenAppWhereUniqueInput";

export type BotAppUpdateInput = {
  apiEndPoint?: string;
  apiSecret?: string;
  appDesc?: string | null;
  appName?: string;
  inputs?: InputJsonValue;
  openApps?: OpenAppWhereUniqueInput | null;
  welcome?: string | null;
};
