import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  BooleanField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";

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
        <BooleanField label="激活状态" source="activate" />
        <TextField label="应用标识" source="appId" />
        <TextField label="应用名" source="appName" />
        <TextField label="密钥" source="appSecret" />
        <DateField source="createdAt" label="创建时间" />
        <TextField label="ID" source="id" />
        <DateField source="updatedAt" label="更新时间" />
      </Datagrid>
    </List>
  );
};
