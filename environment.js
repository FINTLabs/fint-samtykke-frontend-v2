import * as process from 'node:process';
// import 'dotenv/config';

const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_PATH = isDevelopment
    ? 'http://localhost:8080'
    : process.env.BASE_PATH || 'beta/fintlabs-no';
export const PORT = process.env.PORT || '3000';
export const USER_API_URL = process.env.USER_API_URL || 'http://localhost:8062';
export const CONSENT_API_URL = isDevelopment
    ? 'http://localhost:8080'
    : process.env.CONSENT_API_URL || 'http://localhost:8064';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
