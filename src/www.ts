import { debug } from 'console';
import * as dotenv from 'dotenv';
import app from './app/app';

dotenv.config();
const port = normalizePort(process.env.APP_PORT);
const server = app.listen(port);

server.on('error', onError);
server.on('listening', onListening);

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
            error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr?.port}`;
    debug(
        `⚡[Server]: Listening at ${
            isNaN(+bind) ? bind : `${process.env.APP_URL}:${bind}`
        }`
    );
}
