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
  BooleanInput,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
} from 'react-admin'

export const FollowingList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField
        label="用户（关注发起者）"
        reference="admin/user"
        source="uid_from"
      >
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField
        label="用户（被关注者）"
        reference="admin/user"
        source="uid_to"
      >
        <TextField source="username" />
      </ReferenceField>
      <NumberField source="followed" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
)

export const FollowingEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput
        label="用户（关注发起者）"
        reference="admin/user"
        source="uid_from"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>

      <ReferenceInput
        label="用户（被关注者）"
        reference="admin/user"
        source="uid_to"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <NumberInput source="followed" />
    </SimpleForm>
  </Edit>
)

export const FollowingCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="用户（关注发起者）"
        reference="admin/user"
        source="uid_from"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        label="用户（被关注者）"
        reference="admin/user"
        source="uid_to"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <BooleanInput defaultValue={1} source="followed" />
    </SimpleForm>
  </Create>
)
