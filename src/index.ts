import compression from 'compression';
import { debug } from 'console';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import serveFavicon from 'serve-favicon';

dotenv.config();
const app: Application = express();

/** Middleware */
app.use(
	morgan(
		'[:date[clf]] :method :url :status :response-time ms - :res[content-length] Bytes',
	),
);
app.use(
	cors({
		origin: process.env.NODE_ENV ? `${process.env.BASE_URL}` : true,
		credentials: true,
	}),
);

app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

/**
 * Static File
 * Example: http://localhost:3000/public/favicon.ico
 */
app.use('/public', express.static(path.resolve(__dirname, 'public')));

/** Set favicon file */
app.use(serveFavicon(path.resolve(__dirname, 'assets/favicon.ico')));

app.get('/', (req: any, res: any) => {
	res.json('v' + process.env.APP_VERSION);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
	const parsePort = parseInt(val, 10);
	if (isNaN(parsePort)) return val; // named pipe
	if (parsePort >= 0) return parsePort; // port number
	return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error: any) {
	if (error.syscall !== 'listen') throw error;

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			error(`${bind} is already in use`);
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
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr?.port}`;
	debug(
		`⚡[Server]: Listening at ${
			isNaN(+bind) ? bind : `${process.env.APP_URL}:${bind}`
		}`,
	);
}

const port = normalizePort(process.env.APP_PORT);
const server = app.listen(port);

server.on('error', onError);
server.on('listening', onListening);

export default app;
