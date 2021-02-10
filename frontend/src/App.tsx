import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RouteConfig, routes } from './routes'

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
      </div>
    </Router>
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const RouteWithSubRoutes = (route: RouteConfig): JSX.Element => {
  return (
    <Route
      {...route.routeProps}
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export default App
