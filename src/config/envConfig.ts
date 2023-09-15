import { NODE_ENV } from '../shared/constants/env.constant';

export const envConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: {
    jwt: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});

export const envPathFile = () => {
  return process.env.NODE_ENV === NODE_ENV.Development
    ? '.env.dev'
    : '.env.local';
};