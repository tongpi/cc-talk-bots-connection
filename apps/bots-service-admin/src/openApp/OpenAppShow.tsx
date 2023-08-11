import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  BooleanField,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";

import { BOTAPP_TITLE_FIELD } from "../botApp/BotAppTitle";

export const OpenAppShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="ID" source="id" />
        <TextField label="应用标识" source="appId" />
        <TextField label="应用名" source="appName" />
        <TextField label="密钥" source="appSecret" />
        <ReferenceField
          label="大模型应用"
          source="botapp.id"
          reference="BotApp"
        >
          <TextField source={BOTAPP_TITLE_FIELD} />
        </ReferenceField>
        <BooleanField label="激活状态" source="activate" />
        <DateField source="createdAt" label="创建时间" />
        <DateField source="updatedAt" label="更新时间" />
      </SimpleShowLayout>
    </Show>
  );
};
