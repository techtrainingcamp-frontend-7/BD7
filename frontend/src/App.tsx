import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { PathName, RouteConfig, routes } from './routes'
import { Tabs } from './tabs'
import { RootDispatch, RootState } from '@/store'
import './boot'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Portal,
  Button,
  IconButton,
  DialogActions,
  Snackbar,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const App = (): JSX.Element => {
  return (
    <Router
      // https://reactrouter.com/web/api/HashRouter/basename-string
      basename={process.env.PUBLIC_URL}
    >
      <div className="App">
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
        <Tabs />
      </div>
    </Router>
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const mapState = (state: RootState) => ({
  state: state.common,
})
const mapDispatch = (dispatch: RootDispatch) => ({
  dispatch: dispatch.common,
})

/**
 * 路由守卫
 */
const RouteWithSubRoutes = connect(
  mapState,
  mapDispatch,
)(
  (
    route: RouteConfig &
      ReturnType<typeof mapState> &
      ReturnType<typeof mapDispatch>,
  ): JSX.Element => {
    const { state, path, dispatch } = route

    const isLoggedIn = Boolean(state.userInfo.id)

    if (path === PathName.LOGIN && isLoggedIn) {
      console.warn('路由守卫：当前登录成功，自动从 Login 跳转到 User')
      return <Redirect to={PathName.USER} />
    }
    if (path === PathName.USER && !isLoggedIn) {
      console.warn('路由守卫：当前登录失效，自动从 User 跳转到 Login')
      dispatch.SET_SNACKSTATUS(true)
      dispatch.SET_SNACKCONTENT('登陆失效，请重新登陆')
      return <Redirect to={PathName.LOGIN} />
    }
    const handleDialogClose = () => {
      dispatch.SET_DIALOGSTATUS(false)
    }
    const handleSnackClose = () => {
      dispatch.SET_SNACKSTATUS(false)
    }
    const root = document.querySelector('#root')
    return (
      <Fragment>
        <Route
          {...route.routeProps}
          path={route.path}
          render={(props: any) => (
            <route.component {...props} routes={route.routes} />
          )}
        />
        <Portal container={root}>
          <Dialog
            className="global__dialog"
            onClick={handleDialogClose}
            onClose={handleDialogClose}
            open={state.dialogStatus}
          >
            <DialogTitle>{state.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{state.dialogContent}</DialogContentText>
              <DialogActions>
                <Button
                  autoFocus
                  color="primary"
                  onClick={handleDialogClose}
                  variant="contained"
                >
                  确定
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Snackbar
            action={
              <Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={handleSnackClose}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Fragment>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={3000}
            message={state.snackContent}
            onClose={handleSnackClose}
            open={state.snackStatus}
          />
        </Portal>
      </Fragment>
    )
  },
)
export default App
