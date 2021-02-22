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
  NumberInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
  EditButton,
} from 'react-admin'

export const UserPlayVideoList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <ReferenceField
        label="用户（播放发起者）"
        reference="admin/user"
        source="uid"
      >
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField
        label="视频（被播放者）"
        reference="admin/video"
        source="vid"
      >
        <TextField source="id" />
      </ReferenceField>
      <NumberField source="play_count" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const UserPlayVideoEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <ReferenceInput
        label="用户（播放发起者）"
        reference="admin/user"
        source="uid"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        label="视频（被播放者）"
        reference="admin/video"
        source="vid"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
      <NumberInput defaultValue={1} source="play_count" />
    </SimpleForm>
  </Edit>
)

export const UserPlayVideoCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="用户（播放发起者）"
        reference="admin/user"
        source="uid"
      >
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput
        label="视频（被播放者）"
        reference="admin/video"
        source="vid"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
      <NumberInput defaultValue={1} source="play_count" />
    </SimpleForm>
  </Create>
)
