import { BotApp as TBotApp } from "../api/botApp/BotApp";

export const BOTAPP_TITLE_FIELD = "appName";

export const BotAppTitle = (record: TBotApp): string => {
  return record.appName || record.apiEndPoint || String(record.id);
};
