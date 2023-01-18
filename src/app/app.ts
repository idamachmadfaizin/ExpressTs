import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import serveFavicon from 'serve-favicon';

const app: Application = express();

/** Middleware */
// app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV
    ? `${process.env.BASE_URL}`
    : true,
  credentials: true,
}));

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
app.use('/public', express.static(path.join(__dirname, '../public')));

/** Set favicon file */
app.use(serveFavicon(path.join(__dirname, '../assets/favicon.ico')));

app.get("/", (req, res) => {
  res.json("v" + process.env.APP_VERSION)
})

export default app;
