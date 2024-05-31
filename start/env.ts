// Mapper for environment variables
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const CORS_URL = process.env.CORS_URL;
const DEFAULT_LOCATION = process.env.DEFAULT_LOCATION || 'toronto';

const DB_APP_NAME = process.env.DB_APP_NAME || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT || '';
const DB_USER = process.env.DB_USER || '';
const DB_USER_PWD = process.env.DB_USER_PWD || '';
const DB_MIN_POOL_SIZE = process.env.DB_MIN_POOL_SIZE || '5';
const DB_MAX_POOL_SIZE = process.env.DB_MAX_POOL_SIZE || '10';

const TEST_POS_API_URL = process.env.TEST_POS_API_URL || '';

export const Env = {
  NODE_ENV,
  PORT,
  CORS_URL,
  DEFAULT_LOCATION,

  DB_APP_NAME,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_USER_PWD,
  DB_MIN_POOL_SIZE,
  DB_MAX_POOL_SIZE,

  TEST_POS_API_URL,
};
