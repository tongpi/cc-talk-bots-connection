import { BotAppWhereInput } from "./BotAppWhereInput";
import { BotAppOrderByInput } from "./BotAppOrderByInput";

export type BotAppFindManyArgs = {
  where?: BotAppWhereInput;
  orderBy?: Array<BotAppOrderByInput>;
  skip?: number;
  take?: number;
};
