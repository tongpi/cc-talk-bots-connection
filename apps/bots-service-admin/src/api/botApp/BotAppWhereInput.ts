import { StringFilter } from "../../util/StringFilter";
import { OpenAppWhereUniqueInput } from "../openApp/OpenAppWhereUniqueInput";

export type BotAppWhereInput = {
  appName?: StringFilter;
  id?: StringFilter;
  openApps?: OpenAppWhereUniqueInput;
};
