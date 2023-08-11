import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { OpenAppTitle } from "../openApp/OpenAppTitle";

export const BotAppCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="API 端点" source="apiEndPoint" />
        <TextInput label="API 密钥" source="apiSecret" />
        <TextInput label="简单介绍" source="appDesc" />
        <TextInput label="AI应用名称" source="appName" />
        <div />
        <ReferenceInput
          source="openApps.id"
          reference="OpenApp"
          label="OpenApps"
        >
          <SelectInput optionText={OpenAppTitle} />
        </ReferenceInput>
        <TextInput label="对话开场白" source="welcome" />
      </SimpleForm>
    </Create>
  );
};
