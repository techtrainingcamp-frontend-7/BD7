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
  NumberInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Create,
  CreateProps,
} from 'react-admin'
import { MyUrlField } from './components/MyUrlField'

export const VideoList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <ReferenceField label="所属用户" reference="admin/user" source="uid">
        <TextField source="username" />
      </ReferenceField>
      <MyUrlField source="video_url" />
      <MyUrlField source="poster_url" />
      <TextField source="description" />
      <NumberField source="like_count" />
      <NumberField source="play_count" />
      <NumberField source="reference" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
)

export const VideoEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <ReferenceInput label="所属用户" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput multiline source="video_url" />
      <TextInput multiline source="poster_url" />
      <TextInput multiline source="description" />
      <NumberInput source="like_count" />
      <NumberInput source="play_count" />
      <ReferenceInput
        label="所引用的视频"
        reference="admin/video"
        source="reference"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const VideoCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="所属用户" reference="admin/user" source="uid">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <TextInput source="video_url" />
      <TextInput source="poster_url" />
      <TextInput source="description" />
      <NumberInput source="like_count" />
      <NumberInput source="play_count" />
      <ReferenceInput
        label="所引用的视频"
        reference="admin/video"
        source="reference"
      >
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
