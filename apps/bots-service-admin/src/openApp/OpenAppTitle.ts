import { OpenApp as TOpenApp } from "../api/openApp/OpenApp";

export const OPENAPP_TITLE_FIELD = "appId";

export const OpenAppTitle = (record: TOpenApp): string => {
  return record.appId || String(record.id);
};
