import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import { OPENAPP_TITLE_FIELD } from "../openApp/OpenAppTitle";

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
        <ReferenceField
          label="OpenApps"
          source="openapp.id"
          reference="OpenApp"
        >
          <TextField source={OPENAPP_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="更新时间" />
        <TextField label="对话开场白" source="welcome" />
      </SimpleShowLayout>
    </Show>
  );
};
