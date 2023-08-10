import { BotApp as TBotApp } from "../api/botApp/BotApp";

export const BOTAPP_TITLE_FIELD = "apiEndPoint";

export const BotAppTitle = (record: TBotApp): string => {
  return record.apiEndPoint || String(record.id);
};
