import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
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
app.use(express.urlencoded({ extended: true }));
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
app.use(serveFavicon(path.resolve(__dirname, 'public/favicon.ico')));

app.get('/', (req: Request, res: Response) => {
	res.json('v' + process.env.APP_VERSION);
});

export default app;
