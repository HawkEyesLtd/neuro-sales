class GlobalErrorHandler {
    static originalConsoleError = null;
    static isInitialized = false;

    static init() {
        if (this.isInitialized) {
            return;
        }

        this.originalConsoleError = console.error.bind(console);

        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Uncaught Error', event);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection', event);
        });

        console.error = (...args) => {
            const stack = new Error().stack;
            if (!stack.includes('GlobalErrorHandler') && !stack.includes('handleConsoleError')) {
                this.handleConsoleError(...args);
            }
            this.originalConsoleError.apply(console, args);
        };

        this.isInitialized = true;
    }

    static handleError(error, type, event) {
        try {
            const errorMessage = error?.message || String(error);

            if (errorMessage.includes("Cannot read properties of undefined (reading 'length')")) {
                this.originalConsoleError(`🚨 LENGTH ERROR DETECTED: ${errorMessage}`);
                this.originalConsoleError('Error Stack:', error?.stack);
                this.originalConsoleError('Event Details:', event);
                this.identifyLengthErrorSource(error);
            }

            this.originalConsoleError(`${type}: ${errorMessage}`);
        } catch (handlerError) {
            this.originalConsoleError('Error in GlobalErrorHandler:', handlerError);
        }
    }

    static handleConsoleError(...args) {
        try {
            const message = args.join(' ');
            if (message.includes('length') && !message.includes('🔍')) {
                this.originalConsoleError('🔍 Potential length-related error:', message);
            }
        } catch {
            // Silently fail to prevent more loops
        }
    }

    static identifyLengthErrorSource(error) {
        try {
            const stack = error?.stack || '';
            const patterns = [
                { pattern: /\.map\(/g, desc: 'Array.map() operation' },
                { pattern: /\.filter\(/g, desc: 'Array.filter() operation' },
                { pattern: /\.length/g, desc: 'Length property access' },
                { pattern: /useState/g, desc: 'React useState hook' },
                { pattern: /useSelector/g, desc: 'Redux useSelector hook' },
            ];

            patterns.forEach(({ pattern, desc }) => {
                if (pattern.test(stack)) {
                    this.originalConsoleError(`🎯 Likely source: ${desc}`);
                }
            });
        } catch {
            // Silently fail to prevent more errors
        }
    }
}

// Initialize on module load
if (typeof window !== 'undefined') {
    GlobalErrorHandler.init();
}

export default GlobalErrorHandler;
