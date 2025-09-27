import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression(), // Bundle Compressor
    ],
    base: '/',
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@utils': '/src/utils',
            '@store': '/src/store',
            '@assets': '/src/assets',
            '@constants': '/src/constants',
            '@hooks': '/src/hooks',
            '@services': '/src/services',
            '@redux': '/src/redux',
            '@components/ui': '/src/components/ui',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    antd: ['antd'],
                    charts: ['apexcharts', 'react-apexcharts', 'echarts', 'echarts-for-react'],
                },
            },
        },
        sourcemap: process.env.NODE_ENV === 'development',
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: [],
        drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.ts': 'tsx',
            },
        },
        include: [
            'react',
            'react-dom',
            'antd',
            '@ant-design/icons',
            'dayjs',
            'react-router-dom',
            '@reduxjs/toolkit',
            'react-redux',
        ],
        exclude: ['firebase'],
    },
});
