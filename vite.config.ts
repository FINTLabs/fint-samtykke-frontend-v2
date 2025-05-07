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
            console.log('VITE_USE_MOCKS:', process.env.VITE_USE_MOCKS);
            if (process.env.VITE_USE_MOCKS === 'true') {
                import('./mock/mockServer.js')
                    .then(({ mockServer }) => {
                        mockServer.listen();
                        console.log('Mock server started');
                    })
                    .catch((error) => {
                        console.error('Failed to start mock server:', error);
                    });
            }
        },
    };
}

export default defineConfig({
    base: `${BASE_PATH.replace(/\/$/, '')}/`,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), mockServerPlugin()],
});
