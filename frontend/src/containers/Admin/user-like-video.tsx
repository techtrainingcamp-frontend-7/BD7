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
  NumberInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
} from 'react-admin'

export const UserLikeVideoList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <ReferenceField
        label="用户（喜欢发起者）"
        reference="admin/user"
        source="uid"
      >
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField
        label="视频（被喜欢者）"
        reference="admin/video"
        source="vid"
      >
        <TextField source="id" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const UserLikeVideoEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <ReferenceInput
        label="用户（喜欢发起者）"
        reference="admin/user"
        source="uid"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        label="视频（被喜欢者）"
        reference="admin/video"
        source="vid"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const UserLikeVideoCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="用户（喜欢发起者）"
        reference="admin/user"
        source="uid"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        label="视频（被喜欢者）"
        reference="admin/video"
        source="vid"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
