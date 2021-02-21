import { AppBar, Tabs, Tab } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { FC } from 'react'
import { UserAdmin } from './UserAdmin'

export const tabRoutes = [
  {
    label: '用户',
    component: UserAdmin,
  },
  {
    label: '视频',
    component: UserAdmin,
  },
]

const Admin: FC = () => {
  const [value, setValue] = React.useState(0)

  return (
    <div className="bd7-admin">
      <AppBar position="static">
        <Tabs
          aria-label="simple tabs example"
          onChange={(evt, newValue) => {
            setValue(newValue)
          }}
          value={value}
        >
          {tabRoutes.map((tabRoute) => (
            <Tab
              key={tabRoute.label}
              label={tabRoute.label}
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabRoutes.map((tabRoute, idx) => (
        <TabPanel index={idx} key={idx} value={value}>
          <tabRoute.component />
        </TabPanel>
      ))}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props: { value: any; index: number; children: any }) {
  const { children, value, index, ...other } = props

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default Admin
