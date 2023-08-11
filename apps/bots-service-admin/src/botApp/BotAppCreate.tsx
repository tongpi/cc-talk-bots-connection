import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { OpenAppTitle } from "../openApp/OpenAppTitle";

export const BotAppCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="AI应用名称" source="appName" />
        <TextInput label="简单介绍" source="appDesc" />
        <TextInput label="API 端点" source="apiEndPoint" />
        <TextInput label="API 密钥" source="apiSecret" />
        <TextInput label="对话开场白" source="welcome" />
        <div />
        <ReferenceArrayInput
          source="openApps"
          reference="OpenApp"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={OpenAppTitle} />
        </ReferenceArrayInput>
        <TextInput label="对话开场白" source="welcome" />
      </SimpleForm>
    </Create>
  );
};
