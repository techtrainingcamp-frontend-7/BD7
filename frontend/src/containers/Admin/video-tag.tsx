import * as React from 'react'
import {
  List,
  Datagrid,
  TextField,
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

export const VideoTagList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField label="视频" reference="admin/video" source="vid">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField label="标签" reference="admin/tag" source="tid">
        <TextField source="content" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
)

export const VideoTagEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="视频" reference="admin/video" source="vid">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput label="标签" reference="admin/tag" source="tid">
        <SelectInput optionText="content" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const VideoTagCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="视频" reference="admin/video" source="vid">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput label="标签" reference="admin/tag" source="tid">
        <SelectInput optionText="content" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
