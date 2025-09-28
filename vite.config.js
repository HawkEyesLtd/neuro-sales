import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            include: /\.(jsx|js|ts|tsx)$/,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@utils': '/src/utils',
            '@assets': '/src/assets',
            '@hooks': '/src/hooks',
            '@redux': '/src/redux',
        },
    },
    base: './',
    esbuild: {
        loader: 'jsx',
        include: /\.(jsx|js|ts|tsx)$/,
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.jsx': 'jsx',
                '.ts': 'tsx',
                '.tsx': 'tsx',
            },
        },
    },
});
