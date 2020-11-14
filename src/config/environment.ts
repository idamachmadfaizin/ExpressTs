import * as dotenv from 'dotenv';

/**
 * Env Config
 */
dotenv.config();

export const environment = {
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT || 3000,
  APP_URL: process.env.APP_URL,
  APP_VERSION: process.env.APP_VERSION,

  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_HOST: process.env.DB_HOST || '',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'jkashdfsadfas786@&sdafkjhasd',
};
