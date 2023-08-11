import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  BooleanInput,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { BotAppTitle } from "../botApp/BotAppTitle";

export const OpenAppCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput label="激活状态" source="activate" />
        <TextInput label="应用标识" source="appId" />
        <TextInput label="应用名" source="appName" />
        <TextInput label="密钥" source="appSecret" />
        <ReferenceArrayInput
          source="botApp"
          reference="BotApp"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={BotAppTitle} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
