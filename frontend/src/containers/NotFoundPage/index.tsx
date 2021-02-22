import React, { FC } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import './index.less'
const NotFoundPage: FC<RouteComponentProps> = ({ history }) => {
  return (
    <div className="bd7-404">
      <div className="bd7-404__backward">
        <IconButton
          aria-label="back"
          onClick={() => {
            history.goBack()
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>
      <Typography variant="h1">404</Typography>
    </div>
  )
}
export default withRouter(NotFoundPage)
