import React from 'react'
import { RootState, store } from '@/store'
import { useSelector } from 'react-redux'
import { useAsync } from 'react-use'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import { Gender } from '@/utils/request/user'

const columns: ColDef[] = [
  {
    field: 'id',
    type: 'number',
    headerName: '用户ID',
  },
  {
    field: 'username',
    type: 'string',
    headerName: '用户名',
  },
  {
    field: 'profile',
    type: 'string',
    headerName: '个人简介',
    width: 200,
  },
  {
    field: 'gender',
    type: 'string',
    headerName: '性别',
    valueFormatter(params) {
      switch (params.value) {
        case Gender.MALE:
          return '男'
        case Gender.FEMALE:
          return '女'
      }
      return '未知'
    },
  },
  {
    field: 'avatar_url',
    headerName: '头像',
    renderCell(params) {
      return (
        <div
          className="user-avatar"
          style={{
            backgroundImage: `url(${params.value as string})`,
          }}
        />
      )
    },
  },
  {
    field: 'followings_count',
    type: 'number',
    headerName: '关注数',
  },
  {
    field: 'followers_count',
    type: 'number',
    headerName: '粉丝数',
  },
]
export const UserAdmin = () => {
  const dispatch = useSelector(() => store.dispatch.admin)
  const state = useSelector((state: RootState) => state.admin)

  useAsync(async () => {
    await dispatch.getUsers()
  }, [])

  return (
    <div className="user-admin">
      {state.users.length ? (
        <DataGrid
          autoPageSize
          checkboxSelection
          columns={columns}
          onRowSelected={(param) => {
            console.log('param', param)
          }}
          onSelectionModelChange={(param) => {
            console.log('onSelectionModelChange', param)
          }}
          rows={state.users}
        />
      ) : null}
    </div>
  )
}
