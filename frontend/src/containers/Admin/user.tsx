import * as React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ImageField,
  ListProps,
  Edit,
  EditProps,
  TextInput,
  SimpleForm,
  NumberInput,
  EditButton,
  Create,
  CreateProps,
} from 'react-admin'

export const UserList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="username" />
      <TextField source="password" />
      <TextField source="profile" />
      <NumberField source="gender" />
      <ImageField source="avatar_url" />
      <NumberField source="followings_count" />
      <NumberField source="followers_count" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const UserEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <TextInput source="username" />
      {/* TODO: 修改用户的密码需要 hash */}
      <TextInput source="password" />
      <TextInput source="profile" />
      <NumberInput source="gender" />
      <TextInput multiline source="avatar_url" />
      <NumberInput source="followings_count" />
      <NumberInput source="followers_count" />
    </SimpleForm>
  </Edit>
)

export const UserCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      {/* TODO: 新增用户的密码需要 hash */}
      <TextInput source="password" />
      <TextInput source="profile" />
      <NumberInput source="gender" />
      <TextInput multiline source="avatar_url" />
      <NumberInput source="followings_count" />
      <NumberInput source="followers_count" />
    </SimpleForm>
  </Create>
)
