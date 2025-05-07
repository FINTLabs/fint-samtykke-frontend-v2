import express from 'express';
import log4js from 'log4js';
import morgan from 'morgan';
import prometheusMiddleware from 'express-prometheus-middleware';
import process from 'node:process';
import { createRequestHandler } from '@react-router/express';
import { BASE_PATH, PORT } from '../environment.js';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const logger = log4js.getLogger();
logger.level = LOG_LEVEL;

const isProduction = process.env.NODE_ENV === 'production';

logger.info(`Running in ${isProduction ? 'production' : 'dev'} mode`);

let viteDevServer = null;
if (!isProduction) {
    const vite = await import('vite');
    viteDevServer = await vite.createServer({
        server: { middlewareMode: true },
    });
}

const build = viteDevServer
    ? async () => await viteDevServer.ssrLoadModule('virtual:react-router/server-build')
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

app.use(
    `${BASE_PATH.replace(/\/$/, '')}/assets(/*)?`,
    express.static('build/client/assets', { immutable: true, maxAge: '1y', redirect: false })
);

if (viteDevServer) {
    app.use(viteDevServer.middlewares);
}
app.use(`${BASE_PATH.replace(/\/$/, '')}`, express.static('build/client', { maxAge: '1h' }));
app.use(`/`, express.static('public'));
app.all(`${BASE_PATH.replace(/\/$/, '')}/*`, createRequestHandler({ build }));

logger.info('BASE_PATH', BASE_PATH);

app.listen(PORT, () => {
    logger.info('LOG_LEVEL', LOG_LEVEL);
    logger.info(`App listening on http://localhost:${PORT}${BASE_PATH.replace(/\/$/, '')}`);
});
