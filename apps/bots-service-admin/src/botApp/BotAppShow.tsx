import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
  ReferenceField,
} from "react-admin";

import { BOTAPP_TITLE_FIELD } from "./BotAppTitle";

export const BotAppShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="ID" source="id" />
        <TextField label="简单介绍" source="appDesc" />
        <TextField label="AI应用名称" source="appName" />
        <TextField label="API 端点" source="apiEndPoint" />
        <TextField label="API 密钥" source="apiSecret" />
        <TextField label="提示词参数" source="inputs" />
        <TextField label="对话开场白" source="welcome" />
        <ReferenceManyField
          reference="OpenApp"
          target="botAppId"
          label="开放应用"
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
        </ReferenceManyField>
        <DateField source="createdAt" label="创建时间" />
        <DateField source="updatedAt" label="更新时间" />
      </SimpleShowLayout>
    </Show>
  );
};
