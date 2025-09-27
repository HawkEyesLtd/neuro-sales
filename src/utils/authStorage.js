/**
 * Centralized auth storage utility
 * All sessionStorage operations for auth data should go through this module
 */

const AUTH_KEY = 'auth';

const authStorage = {
    /**
     * Save auth data to sessionStorage
     * @param {Object} authData - { accessToken, user }
     */
    save: (authData) => {
        try {
            sessionStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        } catch (error) {
            console.error('Failed to save auth to storage:', error);
        }
    },

    /**
     * Load auth data from sessionStorage
     * @returns {Object|null} - { accessToken, user } or null
     */
    load: () => {
        try {
            const auth = sessionStorage.getItem(AUTH_KEY);
            return auth ? JSON.parse(auth) : null;
        } catch (error) {
            console.error('Failed to load auth from storage:', error);
            return null;
        }
    },

    /**
     * Remove auth data from sessionStorage
     */
    remove: () => {
        try {
            sessionStorage.removeItem(AUTH_KEY);
        } catch (error) {
            console.error('Failed to remove auth from storage:', error);
        }
    },

    /**
     * Check if auth data exists in sessionStorage
     * @returns {boolean}
     */
    exists: () => {
        try {
            return sessionStorage.getItem(AUTH_KEY) !== null;
        } catch (error) {
            console.error('Failed to check auth storage:', error);
            return false;
        }
    },
};

export default authStorage;
