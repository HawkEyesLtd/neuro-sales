import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to get the user's current geolocation with integrated message handling.
 * @returns {Object} { location, hasLocation, error, loading, getLocation, retry }
 */
export default function useGeolocation() {
    const [location, setLocation] = useState(null); // { lat, lon }
    const [error, setError] = useState(null); // string | null
    const [loading, setLoading] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const key = 'locationMessage';

    /**
     * Attempts to retrieve the user's current position with message feedback.
     * @param {PositionOptions} [options] - Optional geolocation options.
     */
    const getLocation = useCallback(
        async (options) => {
            setError(null);
            setLoading(true);
            setHasLocation(false);

            // Show loading message
            messageApi.open({
                key,
                content: 'Retrieving your Location...',
                duration: 0,
            });

            if (!('geolocation' in navigator)) {
                const errorMsg = 'Geolocation is not supported by your browser.';
                setError(errorMsg);
                setLoading(false);

                // Close loading and show error
                messageApi.destroy();
                messageApi.error(errorMsg);
                return;
            }

            try {
                await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            setLocation({
                                lat: pos.coords.latitude,
                                lon: pos.coords.longitude,
                            });
                            setLoading(false);
                            setHasLocation(true);

                            // Close loading and show success
                            messageApi.destroy();
                            messageApi.success('Location retrieved successfully.');
                            resolve();
                        },
                        (err) => {
                            let errorMsg = 'Unable to retrieve your location.';
                            if (err && err.code === 1)
                                errorMsg = 'Permission denied for geolocation.';
                            else if (err && err.code === 2) errorMsg = 'Position unavailable.';
                            else if (err && err.code === 3)
                                errorMsg = 'Geolocation request timed out.';

                            setError(errorMsg);
                            setLoading(false);

                            // Close loading and show error
                            messageApi.destroy();
                            messageApi.error(errorMsg);
                            reject(err);
                        },
                        options
                    );
                });
            } catch (err) {
                // Error already handled in the callback above
                console.error('Geolocation error:', err);
            }
        },
        [messageApi]
    );

    // Retry is just calling getLocation again
    const retry = useCallback(() => getLocation(), [getLocation]);

    // Auto-start location retrieval on mount
    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return {
        location,
        hasLocation,
        error,
        loading,
        getLocation,
        retry,
        contextHolder, // Export contextHolder for the component to render
    };
}
