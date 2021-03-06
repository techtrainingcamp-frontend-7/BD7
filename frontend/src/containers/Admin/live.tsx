import * as React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ListProps,
  ReferenceField,
  EditButton,
  EditProps,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
  BooleanField,
  BooleanInput,
} from 'react-admin'
import { MyUrlField } from './components/MyUrlField'

export const LiveList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <ReferenceField label="所属用户" reference="admin/user" source="uid">
        <TextField source="username" />
      </ReferenceField>
      <TextField source="description" />
      <MyUrlField source="live_url" />
      <MyUrlField source="push_url" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const LiveEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="所属用户" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="description" />
      <TextInput multiline source="live_url" />
      <TextInput multiline source="push_url" />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
)

export const LiveCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="所属用户" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="description" />
      <TextInput source="live_url" />
      <TextInput multiline source="push_url" />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Create>
)
