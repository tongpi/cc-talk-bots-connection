import { BooleanFilter } from "../../util/BooleanFilter";
import { StringFilter } from "../../util/StringFilter";
import { BotAppWhereUniqueInput } from "../botApp/BotAppWhereUniqueInput";

export type OpenAppWhereInput = {
  activate?: BooleanFilter;
  appId?: StringFilter;
  appName?: StringFilter;
  botApp?: BotAppWhereUniqueInput;
  id?: StringFilter;
};
