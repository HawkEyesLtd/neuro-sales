import { useEffect } from 'react';

/**
 * Performance monitoring hook for tracking Core Web Vitals and other metrics
 */
export const usePerformanceMonitoring = () => {
    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== 'production') {
            return;
        }

        // Track Core Web Vitals using the web-vitals library pattern
        const trackWebVitals = () => {
            // Largest Contentful Paint (LCP)
            if (
                window.PerformanceObserver?.supportedEntryTypes?.includes(
                    'largest-contentful-paint'
                )
            ) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries?.length - 1];

                    // LCP should be under 2.5s for good performance
                    console.log('LCP:', lastEntry.startTime);

                    // Send to analytics if available
                    if (window.gtag) {
                        window.gtag('event', 'LCP', {
                            custom_parameter: lastEntry.startTime,
                            event_category: 'Web Vitals',
                        });
                    }
                });

                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            }

            // First Input Delay (FID) - measured on first user interaction
            if ('PerformanceEventTiming' in window) {
                const observer = new PerformanceObserver((list) => {
                    const firstInput = list.getEntries()[0];
                    if (firstInput) {
                        const fid = firstInput.processingStart - firstInput.startTime;
                        console.log('FID:', fid);

                        if (window.gtag) {
                            window.gtag('event', 'FID', {
                                custom_parameter: fid,
                                event_category: 'Web Vitals',
                            });
                        }
                    }
                });

                observer.observe({ entryTypes: ['first-input'] });
            }

            // Cumulative Layout Shift (CLS)
            if (window.PerformanceObserver?.supportedEntryTypes?.includes('layout-shift')) {
                let clsValue = 0;
                let clsEntries = [];

                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            clsEntries.push(entry);
                        }
                    }
                });

                observer.observe({ entryTypes: ['layout-shift'] });

                // Report CLS on page unload
                const reportCLS = () => {
                    console.log('CLS:', clsValue);

                    if (window.gtag) {
                        window.gtag('event', 'CLS', {
                            custom_parameter: clsValue,
                            event_category: 'Web Vitals',
                        });
                    }
                };

                // Report when page is hidden or being unloaded
                ['pagehide', 'beforeunload'].forEach((type) => {
                    window.addEventListener(type, reportCLS, { once: true });
                });
            }
        };

        // Track page load performance
        const trackPageLoad = () => {
            if (typeof window !== 'undefined' && window.performance) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;

                console.log('Page Load Time:', pageLoadTime);
                console.log('DOM Ready Time:', domReady);

                if (window.gtag) {
                    window.gtag('event', 'timing_complete', {
                        name: 'page_load',
                        value: pageLoadTime,
                        event_category: 'Performance',
                    });

                    window.gtag('event', 'timing_complete', {
                        name: 'dom_ready',
                        value: domReady,
                        event_category: 'Performance',
                    });
                }
            }
        };

        // Track bundle sizes (if available)
        const trackBundleSize = () => {
            if (navigator?.connection?.effectiveType) {
                console.log('Connection Type:', navigator.connection.effectiveType);

                if (window.gtag) {
                    window.gtag('event', 'connection_type', {
                        custom_parameter: navigator.connection.effectiveType,
                        event_category: 'Performance',
                    });
                }
            }
        };

        // Initialize tracking
        trackWebVitals();

        if (document.readyState === 'complete') {
            trackPageLoad();
            trackBundleSize();
        } else {
            window.addEventListener('load', () => {
                trackPageLoad();
                trackBundleSize();
            });
        }
    }, []);
};

/**
 * Performance monitoring component
 */
const PerformanceMonitor = ({ children }) => {
    usePerformanceMonitoring();
    return children;
};

export default PerformanceMonitor;
