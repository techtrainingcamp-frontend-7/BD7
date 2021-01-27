#!/usr/bin/env node

/**
 * Config import
 */
import { serverConfig } from '@config';
import { init as DatabaseInit } from '@database';

/**
 * Module dependencies.
 */
const APP = require('../app');
const DEBUG = require('debug')('server:server');
const HTTP = require('http');

/**
 * Get port from environment and store in Express.
 */
const PORT = normalizePort(process.env.PORT || serverConfig.port);
APP.set('port', PORT);

/**
 * Create HTTP server.
 */
const SERVER = HTTP.createServer(APP);

/**
 * Listen on provided port, on all network interfaces.
 */
DatabaseInit().then(() => {
  SERVER.listen(PORT, () => {
    console.log(`服务器开始监听 ${PORT} 端口！`);
  });
  SERVER.on('error', onError);
  SERVER.on('listening', onListening);
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : '端口 ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' 需要更高权限');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' 已被占用');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = SERVER.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : '端口 ' + addr.port;
  DEBUG('正在监听' + bind);
}
