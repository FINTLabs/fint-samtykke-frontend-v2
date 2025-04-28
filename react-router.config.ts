import type { Config } from '@react-router/dev/config';
import { BASE_PATH } from './environment';

export default {
    ssr: true,
    appDirectory: 'app',
    basename: `${BASE_PATH.replace(/\/$/, '')}/`,
} satisfies Config;
