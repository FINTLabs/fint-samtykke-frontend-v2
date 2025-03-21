import express from 'express';
import log4js from 'log4js';
import morgan from 'morgan';
import prometheusMiddleware from 'express-prometheus-middleware';
import process from 'node:process';
import { createRequestHandler } from '@react-router/express';

const PORT = process.env.PORT || '8000';
const BASE_PATH = process.env.BASE_PATH || '/';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

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

const build = viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:react-router/server-build')
    : await import('../build/server/index.js');

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

app.all('*', createRequestHandler({ build }));

logger.info('BASE_PATH', BASE_PATH);

app.listen(PORT, () => {
    logger.info('LOG_LEVEL', LOG_LEVEL);
    logger.info(`App listening on http://localhost:${PORT}${BASE_PATH}`);
});
