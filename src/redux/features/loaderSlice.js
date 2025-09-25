import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    globalLoading: false,
    reFetchFilter: false,
};

const globalLoadingSlice = createSlice({
    name: 'globalLoadingSlice',
    initialState,
    reducers: {
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
        setReFetchFilter: (state, action) => {
            state.reFetchFilter = action.payload;
        },
    },
});

export default globalLoadingSlice.reducer;
export const { setGlobalLoading, setReFetchFilter } = globalLoadingSlice.actions;
