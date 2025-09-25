import { useEffect } from 'react';

/**
 * Accessibility audit hook for checking common a11y issues
 */
export const useA11yAudit = () => {
    useEffect(() => {
        // Only run in development
        if (process.env.NODE_ENV !== 'development') {
            return;
        }

        const auditA11y = () => {
            console.group('🔍 Accessibility Audit');

            // Check for missing alt text on images
            const images = document.querySelectorAll('img');
            const imagesWithoutAlt = Array.from(images).filter(
                (img) => !img.alt && !img.getAttribute('aria-label')
            );
            if (imagesWithoutAlt.length > 0) {
                console.warn(
                    `⚠️ Found ${imagesWithoutAlt.length} images without alt text:`,
                    imagesWithoutAlt
                );
            } else {
                console.log('✅ All images have alt text');
            }

            // Check for missing form labels
            const inputs = document.querySelectorAll('input, select, textarea');
            const inputsWithoutLabels = Array.from(inputs).filter((input) => {
                if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') {
                    return false;
                }
                const hasLabel = input.labels?.length > 0;
                const hasAriaLabel = input.getAttribute('aria-label');
                const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
                return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
            });
            if (inputsWithoutLabels.length > 0) {
                console.warn(
                    `⚠️ Found ${inputsWithoutLabels.length} form inputs without labels:`,
                    inputsWithoutLabels
                );
            } else {
                console.log('✅ All form inputs have proper labels');
            }

            // Check for missing headings hierarchy
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length === 0) {
                console.warn('⚠️ No headings found on the page');
            } else {
                const headingLevels = Array.from(headings).map((h) =>
                    parseInt(h.tagName.charAt(1))
                );
                let prevLevel = 0;
                let hasSkippedLevel = false;

                headingLevels.forEach((level) => {
                    if (level - prevLevel > 1) {
                        hasSkippedLevel = true;
                    }
                    prevLevel = level;
                });

                if (hasSkippedLevel) {
                    console.warn('⚠️ Heading hierarchy has gaps (e.g., h1 → h3)', headings);
                } else {
                    console.log('✅ Heading hierarchy is proper');
                }
            }

            // Check for buttons without accessible names
            const buttons = document.querySelectorAll('button, [role="button"]');
            const buttonsWithoutNames = Array.from(buttons).filter((button) => {
                const hasTextContent = button.textContent?.trim();
                const hasAriaLabel = button.getAttribute('aria-label');
                const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
                return !hasTextContent && !hasAriaLabel && !hasAriaLabelledBy;
            });
            if (buttonsWithoutNames.length > 0) {
                console.warn(
                    `⚠️ Found ${buttonsWithoutNames.length} buttons without accessible names:`,
                    buttonsWithoutNames
                );
            } else {
                console.log('✅ All buttons have accessible names');
            }

            // Check for links without accessible names
            const links = document.querySelectorAll('a');
            const linksWithoutNames = Array.from(links).filter((link) => {
                const hasTextContent = link.textContent?.trim();
                const hasAriaLabel = link.getAttribute('aria-label');
                const hasAriaLabelledBy = link.getAttribute('aria-labelledby');
                return !hasTextContent && !hasAriaLabel && !hasAriaLabelledBy;
            });
            if (linksWithoutNames.length > 0) {
                console.warn(
                    `⚠️ Found ${linksWithoutNames.length} links without accessible names:`,
                    linksWithoutNames
                );
            } else {
                console.log('✅ All links have accessible names');
            }

            // Check for low contrast text (simplified check)
            const checkContrast = () => {
                const elements = document.querySelectorAll('*');
                let lowContrastElements = 0;

                Array.from(elements).forEach((el) => {
                    const style = window.getComputedStyle(el);
                    const color = style.color;
                    const backgroundColor = style.backgroundColor;

                    // This is a simplified check - in practice, you'd use a proper color contrast library
                    if (color === 'rgb(128, 128, 128)' || color === '#808080') {
                        lowContrastElements++;
                    }
                });

                if (lowContrastElements > 0) {
                    console.warn(
                        `⚠️ Potential low contrast elements found: ${lowContrastElements}`
                    );
                } else {
                    console.log('✅ No obvious low contrast issues detected');
                }
            };

            checkContrast();

            // Check for missing focus indicators
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            console.log(`📊 Found ${focusableElements.length} focusable elements`);

            // Check for ARIA landmarks
            const landmarks = document.querySelectorAll(
                '[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer'
            );
            if (landmarks.length === 0) {
                console.warn('⚠️ No ARIA landmarks found');
            } else {
                console.log(`✅ Found ${landmarks.length} ARIA landmarks`);
            }

            console.groupEnd();
        };

        // Run audit after DOM is ready
        if (document.readyState === 'complete') {
            setTimeout(auditA11y, 1000); // Delay to ensure all components are mounted
        } else {
            window.addEventListener('load', () => {
                setTimeout(auditA11y, 1000);
            });
        }
    }, []);
};

/**
 * A11y audit component
 */
const A11yAudit = ({ children }) => {
    useA11yAudit();
    return children;
};

export default A11yAudit;
