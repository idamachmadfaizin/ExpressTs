/**
 * Helper to write log in stdout or file
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:19:14
 */

import { createLogger } from 'bunyan';
import fs from 'fs';
import { environment } from './../../config/environment';

/** Base directory and every date directory */
const basePath: string = './logs';
const currentDatePath: string = `/${new Date().toISOString().substr(0, 10)}`;
const todayDirectory: string = `${basePath}${currentDatePath}`;

/** Define log extension */
const extension: string = '.log';

/** Log Path */
const infoPath: string = `/info${extension}`;
const errorPath: string = `/error${extension}`;
const warnPath: string = `/warn${extension}`;

/**
 * Check exist and create base directory
 */
function existsDirectory() {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  if (fs.existsSync(basePath) && !fs.existsSync(todayDirectory)) {
    fs.mkdirSync(todayDirectory);
  }
}

/**
 * Logger Config
 */
function config() {
  return createLogger({
    name: environment.APP_NAME || 'Undefined .env->APP_NAME',
    src: true,
    streams: [
      {
        level: 'debug',
        stream: process.stdout,
      },
      {
        level: 'info',
        path: `${todayDirectory}${infoPath}`,
      },
      {
        level: 'warn',
        stream: process.stdout,
      },
      {
        level: 'warn',
        path: `${todayDirectory}${warnPath}`,
      },
      {
        level: 'error',
        path: `${todayDirectory}${errorPath}`,
      },
    ],
    checkExist: existsDirectory(),
  });
}

// tslint:disable-next-line: variable-name
const LogHelper = config();

export default LogHelper;
