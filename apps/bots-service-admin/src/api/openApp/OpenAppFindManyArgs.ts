import { OpenAppWhereInput } from "./OpenAppWhereInput";
import { OpenAppOrderByInput } from "./OpenAppOrderByInput";

export type OpenAppFindManyArgs = {
  where?: OpenAppWhereInput;
  orderBy?: Array<OpenAppOrderByInput>;
  skip?: number;
  take?: number;
};
