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
        // Generate CSP-friendly builds
        rollupOptions: {
            output: {
                // Ensure proper chunking for better CSP compatibility
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    antd: ['antd'],
                    charts: ['apexcharts', 'react-apexcharts', 'echarts', 'echarts-for-react'],
                    utils: ['dayjs', 'xlsx'],
                },
            },
        },
        // Generate source maps for better debugging
        sourcemap: process.env.NODE_ENV === 'development',
        // Terser options for production builds
        terserOptions:
            process.env.NODE_ENV === 'production'
                ? {
                      compress: {
                          drop_console: true,
                          drop_debugger: true,
                      },
                  }
                : undefined,
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: [],
        // Drop console statements in production
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
