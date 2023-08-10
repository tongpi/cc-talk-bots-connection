import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const BotAppList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"BotApps"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="API 端点" source="apiEndPoint" />
        <TextField label="API 密钥" source="apiSecret" />
        <TextField label="简单介绍" source="appDesc" />
        <TextField label="AI应用名称" source="appName" />
        <DateField source="createdAt" label="创建时间" />
        <TextField label="ID" source="id" />
        <TextField label="提示词参数" source="inputs" />
        <DateField source="updatedAt" label="更新时间" />
        <TextField label="对话开场白" source="welcome" />
      </Datagrid>
    </List>
  );
};
