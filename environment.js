import * as process from 'node:process';
// import 'dotenv/config';

export const API_BASE_PATH = process.env.BASE_PATH || 'beta/fintlabs-no';

export const PORT = process.env.PORT || '3000';

export const USER_API_URL = process.env.USER_API_URL || 'http://localhost:8062';
export const CONSENT_API_URL = process.env.CONSENT_API_URL || 'http://localhost:8064';
