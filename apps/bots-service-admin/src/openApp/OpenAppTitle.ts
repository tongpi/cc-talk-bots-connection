import { OpenApp as TOpenApp } from "../api/openApp/OpenApp";

export const OPENAPP_TITLE_FIELD = "appName";

export const OpenAppTitle = (record: TOpenApp): string => {
  return record.appName || record.appId || String(record.id);
};
