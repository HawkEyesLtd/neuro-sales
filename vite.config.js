import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression(), // Bundle Compressor
        // Bundle analyzer - only in analysis mode
        process.env.ANALYZE === 'true' &&
            visualizer({
                filename: 'dist/stats.html',
                open: true,
                brotliSize: true,
                gzipSize: true,
            }),
    ].filter(Boolean),
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
    build: {
        // outDir: 'build',
        chunkSizeWarningLimit: 500, // Further reduced for better performance
        sourcemap: process.env.NODE_ENV !== 'production',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Create more granular chunks
                    if (id.includes('node_modules')) {
                        // Core React libraries
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                        if (id.includes('react-router')) {
                            return 'vendor-router';
                        }
                        if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
                            return 'vendor-redux';
                        }

                        // UI Libraries
                        if (id.includes('antd') && !id.includes('icons')) {
                            return 'vendor-antd';
                        }
                        if (id.includes('@ant-design/icons')) {
                            return 'vendor-antd-icons';
                        }

                        // Chart libraries - split into smaller chunks
                        if (id.includes('apexcharts')) {
                            return 'vendor-apexcharts';
                        }
                        if (id.includes('react-apexcharts')) {
                            return 'vendor-react-apexcharts';
                        }
                        if (id.includes('recharts')) {
                            return 'vendor-recharts';
                        }

                        // Firebase (large, should be separate)
                        if (id.includes('firebase')) {
                            return 'vendor-firebase';
                        }

                        // Google Maps
                        if (id.includes('@react-google-maps/api')) {
                            return 'vendor-maps';
                        }

                        // Date utilities
                        if (id.includes('dayjs')) {
                            return 'vendor-dayjs';
                        }

                        // File processing
                        if (id.includes('xlsx')) {
                            return 'vendor-xlsx';
                        }

                        // Smaller React component libraries
                        if (
                            id.includes('react-') &&
                            (id.includes('confirm-alert') ||
                                id.includes('countdown') ||
                                id.includes('countup') ||
                                id.includes('csv') ||
                                id.includes('diff-viewer') ||
                                id.includes('helmet') ||
                                id.includes('highlight-words') ||
                                id.includes('multi-select') ||
                                id.includes('top-loading-bar'))
                        ) {
                            return 'vendor-react-utils';
                        }

                        // Lucide icons
                        if (id.includes('lucide-react')) {
                            return 'vendor-lucide';
                        }

                        // Analytics
                        if (
                            id.includes('@vercel/analytics') ||
                            id.includes('@vercel/speed-insights')
                        ) {
                            return 'vendor-analytics';
                        }

                        // Any other node_modules
                        return 'vendor-misc';
                    }

                    // Feature-based chunks for application code
                    if (id.includes('/src/features/Dashboard')) {
                        return 'feature-dashboard';
                    }
                    if (id.includes('/src/features/Report')) {
                        return 'feature-reports';
                    }
                    if (id.includes('/src/features/Auth')) {
                        return 'feature-auth';
                    }
                    if (
                        id.includes('/src/features/') &&
                        (id.includes('Salary') || id.includes('salary'))
                    ) {
                        return 'feature-salary';
                    }
                    if (
                        id.includes('/src/features/') &&
                        (id.includes('Inventory') || id.includes('Material') || id.includes('Posm'))
                    ) {
                        return 'feature-inventory';
                    }
                    if (
                        id.includes('/src/features/') &&
                        (id.includes('Team') || id.includes('SuperUser') || id.includes('Training'))
                    ) {
                        return 'feature-management';
                    }

                    // Redux chunks
                    if (id.includes('/src/redux/features/')) {
                        return 'redux-features';
                    }
                    if (id.includes('/src/redux/')) {
                        return 'redux-store';
                    }
                },
                // Better file naming strategy
                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId
                        ? chunkInfo.facadeModuleId.split('/').pop()
                        : 'chunk';
                    return `js/${facadeModuleId}-[hash].js`;
                },
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                        return `media/[name]-[hash].${ext}`;
                    }
                    if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
                        return `img/[name]-[hash].${ext}`;
                    }
                    if (ext === 'css') {
                        return `css/[name]-[hash].${ext}`;
                    }
                    return `assets/[name]-[hash].${ext}`;
                },
            },
        },
    },
    // server: {
    //     port: 3000,
    //     open: true,
    // },
});
