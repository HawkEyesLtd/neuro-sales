import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';

// Middleware: reset RTK Query cache on logout
const resetOnLogoutMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    if (action?.type === 'authSlice/userLoggedOut') {
        // Only reset API cache - sessionStorage is handled in authSlice
        storeAPI.dispatch(apiSlice.util.resetApiState());
    }
    return result;
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({ serializableCheck: false }).concat(
            apiSlice.middleware,
            resetOnLogoutMiddleware
        ),
});

export default store;
