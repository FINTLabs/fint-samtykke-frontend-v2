import { type RouteConfig, index, prefix } from '@react-router/dev/routes';
import { BASE_PATH } from '../environment';

export default [
    ...prefix(`${BASE_PATH.replace(/\/$/, '')}`, [index('./routes/home.tsx')]),
] satisfies RouteConfig;
