import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import 'fontsource-roboto'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#fff',
    },
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#EE1D52',
    },
    success: {
      main: '#69C9D0',
    },
    background: {
      default: '#111',
    },
  },
})
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
