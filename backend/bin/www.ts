import http from 'http'
import debug from 'debug'

import { port } from '@config'
import { init } from '@database'

import { app } from '../app'
const DEBUG = debug('server:server')
/**
 * Get port from environment and store in Express.
 */
const PORT = normalizePort(process.env.PORT || port)
app.set('port', PORT)

/**
 * Create HTTP server.
 */
const SERVER = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
init()
  .then(() => {
    SERVER.listen(PORT, () => {
      console.log(`服务器开始监听 ${PORT} 端口！`)
    })
    SERVER.on('error', onError)
    SERVER.on('listening', onListening)
  })
  .catch((e) => {
    console.log(String(e))
  })
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): number | string {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  throw new Error('端口设置错误')
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `端口 ${PORT}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' 需要更高权限')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' 已被占用')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = SERVER.address()
  const bind =
    typeof addr === 'string' ? `Pipe ${addr}` : `端口 ${addr?.port || ''}`
  DEBUG('正在监听' + bind)
}
