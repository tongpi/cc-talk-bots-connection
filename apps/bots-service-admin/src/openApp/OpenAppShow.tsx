import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  BooleanField,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { OPENAPP_TITLE_FIELD } from "./OpenAppTitle";

export const OpenAppShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <BooleanField label="激活状态" source="activate" />
        <TextField label="应用标识" source="appId" />
        <TextField label="应用名" source="appName" />
        <TextField label="密钥" source="appSecret" />
        <DateField source="createdAt" label="创建时间" />
        <TextField label="ID" source="id" />
        <DateField source="updatedAt" label="更新时间" />
        <ReferenceManyField
          reference="BotApp"
          target="openAppsId"
          label="BotApps"
        >
          <Datagrid rowClick="show">
            <TextField label="API 端点" source="apiEndPoint" />
            <TextField label="API 密钥" source="apiSecret" />
            <TextField label="简单介绍" source="appDesc" />
            <TextField label="AI应用名称" source="appName" />
            <DateField source="createdAt" label="创建时间" />
            <TextField label="ID" source="id" />
            <TextField label="提示词参数" source="inputs" />
            <ReferenceField
              label="OpenApps"
              source="openapp.id"
              reference="OpenApp"
            >
              <TextField source={OPENAPP_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="更新时间" />
            <TextField label="对话开场白" source="welcome" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
