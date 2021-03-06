/**
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:29:32
 */

import { debug } from 'console';
import http from 'http';
import app from './app/app';
import { Database } from './config/database';

const port = normalizePort(3000);
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () =>
  console.log(`⚡[Server]: Listening at http://localhost:${port}`),
);
server.on('error', onError);
server.on('listening', onListening);

Database.connect();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const parsePort = parseInt(val, 10);

  if (isNaN(parsePort)) {
    // named pipe
    return val;
  }

  if (parsePort >= 0) {
    // port number
    return parsePort;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}
