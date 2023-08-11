import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  BooleanInput,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { BotAppTitle } from "../botApp/BotAppTitle";

export const OpenAppEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
