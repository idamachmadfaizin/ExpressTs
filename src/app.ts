import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import pug from 'pug';
import serveFavicon from 'serve-favicon';
import { cors, logger } from './middlewares';

dotenv.config();

const app: Application = express();

/** Middleware */
app.use(logger());
app.use(cors());
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
app.use('/public', express.static(path.join(__dirname, 'public')));

/** Set favicon file */
app.use(serveFavicon(path.join(__dirname, 'public/favicon.ico')));

/** Template engine */
app.engine('pug', pug.__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
  if (req.accepts().includes('text/html'))
    return res.render('index', {
      title: 'Hey',
      message: 'Hello world',
    });

  res.json({
    version: 'v' + process.env.APP_VERSION,
  });
});

export default app;
