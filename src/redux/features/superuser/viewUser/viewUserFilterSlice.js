import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: null,
    group: null,
    status: undefined,
    username: null,
    name: null,
    email: null,
};

const viewUserFilterSlice = createSlice({
    name: 'viewUserFilterSlice',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        resetViewUserFilter: (state, action) => {
            state.username = null;
            state.group = null;
            state.userType = null;
            state.email = null;
            state.status = undefined;
        },
    },
});

export default viewUserFilterSlice.reducer;
export const {
    setUsername,
    setGroup,
    setUserType,
    setEmail,
    setStatus,
    setName,
    resetViewUserFilter,
} = viewUserFilterSlice.actions;
