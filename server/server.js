import express from 'express';
import log4js from 'log4js';
import morgan from 'morgan';
import prometheusMiddleware from 'express-prometheus-middleware';
import process from 'node:process';
import { createRequestHandler } from 'react-router';

export const PORT = process.env.PORT || '8000';
export const BASE_PATH = process.env.BASE_PATH || '/';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
// export const USER_API_URL = process.env.USER_API_URL || 'http://localhost:8062';

const logger = log4js.getLogger();
logger.level = LOG_LEVEL;

logger.info(`Running in ${process.env.NODE_ENV === 'production' ? 'production' : 'dev'} mode`);

const viteDevServer = await (async () => {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    const vite = await import('vite');
    return vite.createServer({
        server: { middlewareMode: true },
    });
})();

const reactRouterHandler = createRequestHandler({
    build: await (async () => {
        if (viteDevServer) {
            return viteDevServer.ssrLoadModule('virtual:react-router/server-build');
        }
        return import('../build/server/index.js');
    })(),
});

const app = express();

app.use(morgan('combined'));
app.disable('x-powered-by');

app.use(
    prometheusMiddleware({
        collectDefaultMetrics: true,
        metricsPath: `${BASE_PATH.replace(/\/$/, '')}/metrics`,
    })
);

if (viteDevServer) {
    app.use(viteDevServer.middlewares);
} else {
    app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }));
}
app.use(express.static('build/client', { maxAge: '1h' }));

app.all('*', reactRouterHandler);

app.listen(PORT, () => {
    logger.info('LOG_LEVEL', LOG_LEVEL);
    logger.info(`App listening on http://localhost:${PORT}${BASE_PATH}`);
});
