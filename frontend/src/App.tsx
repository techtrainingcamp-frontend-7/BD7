import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RouteConfig, routes } from './routes'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const RouteWithSubRoutes = (route: RouteConfig): JSX.Element => {
  return (
    <Route
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export default App
