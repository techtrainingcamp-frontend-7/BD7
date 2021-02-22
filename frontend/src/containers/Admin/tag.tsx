import * as React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ListProps,
  EditButton,
  EditProps,
  SimpleForm,
  TextInput,
  NumberInput,
  Edit,
  Create,
  CreateProps,
} from 'react-admin'

export const TagList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="content" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const TagEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />

      <TextInput source="content" />
    </SimpleForm>
  </Edit>
)

export const TagCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="content" />
    </SimpleForm>
  </Create>
)
