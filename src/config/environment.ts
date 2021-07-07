import * as dotenv from 'dotenv';

/**
 * Env Config
 */
dotenv.config();

interface IEnvironment {
  APP_NAME: string | undefined;
  APP_VERSION: string;
  APP_URL: string;
  APP_PORT: string;
  PRODUCTION: boolean;

  DB_CONNECTION: string | 'mongodb' | undefined ;
  DB_HOST: string;

  TOKEN_SECRET: string;
  TOKEN_LIFETIME: string;
  REFRESH_TOKEN_LIFETIME: string;
}

export const environment: IEnvironment = {
  APP_NAME: process.env.APP_NAME || 'ExpressTs',
  APP_VERSION: process.env.APP_VERSION || '1.0',
  APP_URL: process.env.APP_URL || 'http://localhost',
  APP_PORT: process.env.APP_PORT || '3000',
  PRODUCTION: Boolean(process.env.PRODUCTION) || false,

  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb',
  DB_HOST: process.env.DB_HOST || '',

  TOKEN_SECRET: process.env.TOKEN_SECRET || 'jkashdfsadfas786@&sdafkjhasd',
  TOKEN_LIFETIME: process.env.TOKEN_LIFETIME || '10h',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '3d',
};
