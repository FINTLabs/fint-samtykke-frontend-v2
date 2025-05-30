import * as process from 'node:process';

const isDevelopment = process.env.NODE_ENV === 'development';

export const BASE_PATH = process.env.BASE_PATH || '/beta/fintlabs-no';

export const PORT = process.env.PORT || '3000';
export const CONSENT_API_URL = isDevelopment
    ? 'http://localhost:8080'
    : process.env.CONSENT_API_URL || 'http://localhost:8064';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const VITE_USE_MOCKS = false;
