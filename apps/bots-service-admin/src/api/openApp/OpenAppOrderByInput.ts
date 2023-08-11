import { SortOrder } from "../../util/SortOrder";

export type OpenAppOrderByInput = {
  activate?: SortOrder;
  appId?: SortOrder;
  appName?: SortOrder;
  appSecret?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
