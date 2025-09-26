import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';

// Middleware: reset RTK Query cache and clear session on logout
const resetOnLogoutMiddleware = (storeAPI) => (next) => (action) => {
    if (action?.type === 'authSlice/userLoggedOut') {
        try {
            sessionStorage.removeItem('auth');
        } catch {
            // ignore storage errors
        }
        storeAPI.dispatch(apiSlice.util.resetApiState());
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({ serializableCheck: false }).concat(
            apiSlice.middleware,
            resetOnLogoutMiddleware
        ),
});

export default store;
