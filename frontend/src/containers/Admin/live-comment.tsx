import * as React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ListProps,
  ReferenceField,
  EditProps,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
} from 'react-admin'

export const LiveCommentList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <ReferenceField label="评论所处直播" reference="admin/live" source="lid">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField label="评论发送者" reference="admin/user" source="uid">
        <TextField source="username" />
      </ReferenceField>
      <TextField source="content" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
)

export const LiveCommentEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="评论所处直播" reference="admin/live" source="lid">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput label="评论发送者" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="content" />
    </SimpleForm>
  </Edit>
)

export const LiveCommentCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="评论所处直播" reference="admin/live" source="lid">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput label="评论发送者" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput multiline source="content" />
    </SimpleForm>
  </Create>
)
