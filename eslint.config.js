import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            prettier,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
                URL: 'readonly',
                Blob: 'readonly',
                File: 'readonly',
                FormData: 'readonly',
                crypto: 'readonly',
                atob: 'readonly',
                btoa: 'readonly',
                addEventListener: 'readonly',
                PerformanceObserver: 'readonly',

                // Node.js globals
                process: 'readonly',
                Buffer: 'readonly',
                global: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',

                // Timer functions
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearTimeout: 'readonly',
                clearInterval: 'readonly',

                // Jest globals
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                jest: 'readonly',
            },
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                alias: { map: [['@', './src']], extensions: ['.js', '.jsx', '.json'] },
            },
        },
        rules: {
            // React rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
            'react/jsx-closing-bracket-location': [1, 'line-aligned'],
            'react/self-closing-comp': [
                'warn',
                {
                    component: true,
                    html: true,
                },
            ],
            'react/jsx-uses-react': 'off',
            'react/jsx-uses-vars': 'error',

            // General rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            camelcase: 'warn',
            'no-nested-ternary': 'warn',

            // JSX A11y rules
            'jsx-a11y/control-has-associated-label': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/alt-text': 'warn',

            // Import rules
            'import/prefer-default-export': 'warn',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                },
            ],

            // Unused imports rules
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'none',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],

            // React Hooks rules
            ...reactHooks.configs.recommended.rules,
            'no-constant-binary-expression': 'warn',
            'no-constant-condition': 'warn',

            // Prettier rules
            'prettier/prettier': [
                'warn',
                {
                    trailingComma: 'es5',
                    singleQuote: true,
                    printWidth: 100,
                    tabWidth: 4,
                    semi: true,
                    endOfLine: 'auto',
                },
            ],
        },
    },
    {
        files: ['vite.config.js', 'webpack.config.js', 'rollup.config.js', '.*rc.js'],
        rules: { 'import/no-extraneous-dependencies': ['warn', { devDependencies: true }] },
    },
    {
        ignores: [
            'src/assets/**/*',
            'src/firebase.config.js',
            'node_modules/**/*',
            'public/**/*',
            'dist/**/*',
            'build/**/*',
            'vite.config.js',
        ],
    },
    prettierConfig,
];
