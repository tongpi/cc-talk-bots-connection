import { User as TUser } from "../api/user/User";

export const USER_TITLE_FIELD = "username";

export const UserTitle = (record: TUser): string => {
  return record.username || record.firstName || String(record.id);
};
