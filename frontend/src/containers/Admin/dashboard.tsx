// in src/Dashboard.js
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'
export const Dashboard = () => (
  <Card
    style={{
      margin: 20,
    }}
  >
    <Title title="我和我的抖音后台管理系统" />
    <CardContent>请在左侧选择要修改的数据</CardContent>
  </Card>
)
