import * as React from "react";

import {
  List,
  Datagrid,
  ListProps,
  BooleanField,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";

import Pagination from "../Components/Pagination";
import { BOTAPP_TITLE_FIELD } from "../botApp/BotAppTitle";

export const OpenAppList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"OpenApps"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="ID" source="id" />
        <TextField label="应用标识" source="appId" />
        <TextField label="应用名" source="appName" />
        <TextField label="密钥" source="appSecret" />
        <BooleanField label="激活状态" source="activate" />
        <ReferenceField
          label="大模型应用"
          source="botapp.id"
          reference="BotApp"
        >
          <TextField source={BOTAPP_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="创建时间" />
        <DateField source="updatedAt" label="更新时间" />
      </Datagrid>
    </List>
  );
};
