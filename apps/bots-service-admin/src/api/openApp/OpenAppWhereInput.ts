import { BooleanFilter } from "../../util/BooleanFilter";
import { StringFilter } from "../../util/StringFilter";
import { BotAppListRelationFilter } from "../botApp/BotAppListRelationFilter";

export type OpenAppWhereInput = {
  activate?: BooleanFilter;
  appId?: StringFilter;
  appName?: StringFilter;
  botApp?: BotAppListRelationFilter;
  id?: StringFilter;
};
