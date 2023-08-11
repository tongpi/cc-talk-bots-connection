import { StringFilter } from "../../util/StringFilter";
import { OpenAppListRelationFilter } from "../openApp/OpenAppListRelationFilter";

export type BotAppWhereInput = {
  appName?: StringFilter;
  id?: StringFilter;
  openApps?: OpenAppListRelationFilter;
};
