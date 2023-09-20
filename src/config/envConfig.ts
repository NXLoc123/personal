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
  nodeMailer: {
    host: process.env.MAILER_HOST,
    secure: process.env.MAILER_SECURE === 'true',
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
  },
  eSms: {
    host: process.env.ESMS_HOST,
    apikey: process.env.ESMS_API_KEY,
    secretkey: process.env.ESMS_SECRET_KEY,
  },
});

export const envPathFile = () => {
  return process.env.NODE_ENV === NODE_ENV.Development
    ? '.env.dev'
    : '.env.local';
};
