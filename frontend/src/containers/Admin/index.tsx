// in src/App.js
import * as React from 'react'
import { Admin } from 'react-admin'
import { fetchUtils } from 'ra-core'
import simpleRestProvider from 'ra-data-simple-rest'
import { useHistory } from 'react-router-dom'

export const AdminApp: React.FC = () => {
  const history = useHistory()

  return (
    <Admin
      dataProvider={simpleRestProvider(
        '/api/admin/',
        fetchUtils.fetchJson,
        'X-Total-Count',
      )}
      history={history}
    />
  )
}

export default AdminApp
