import { createSlice } from '@reduxjs/toolkit';

import authStorage from '@/utils/authStorage';

// Load initial state from sessionStorage
const loadAuthFromStorage = () => {
    const auth = authStorage.load();
    return (
        auth || {
            accessToken: null,
            user: null,
        }
    );
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            // Save to sessionStorage using centralized utility
            authStorage.save({
                accessToken: action.payload.accessToken,
                user: action.payload.user,
            });
        },
        userLoggedOut: (state) => {
            state.accessToken = null;
            state.user = null;
            // Remove from sessionStorage using centralized utility
            authStorage.remove();
        },
    },
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
