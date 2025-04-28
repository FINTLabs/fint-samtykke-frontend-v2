import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BASE_PATH } from './environment';

function mockServerPlugin() {
    return {
        name: 'mock-server-plugin',
        // @ts-ignore
        configureServer(server) {
            if (process.env.USE_MOCKS === 'true') {
                // @ts-ignore
                import('./mock/mockServer.js').then(({ mockServer }) => {
                    mockServer.listen();
                    console.log('Mock server started');
                });
            }
        },
    };
}

export default defineConfig({
    base: `${BASE_PATH.replace(/\/$/, '')}/`,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), mockServerPlugin()],
});
