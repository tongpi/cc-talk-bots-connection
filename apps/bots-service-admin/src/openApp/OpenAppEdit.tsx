import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  BooleanInput,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { BotAppTitle } from "../botApp/BotAppTitle";

export const OpenAppEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="应用标识" source="appId" />
        <TextInput label="应用名" source="appName" />
        <TextInput label="密钥" source="appSecret" />
        <ReferenceInput
          source="botApp.id"
          reference="BotApp"
          label="大模型应用"
        >
          <SelectInput optionText={BotAppTitle} />
        </ReferenceInput>
        <BooleanInput label="激活状态" source="activate" />
      </SimpleForm>
    </Edit>
  );
};
