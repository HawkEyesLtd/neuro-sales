import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: '',
    month: '',
    outletCode: '',
};

const dffDashboardFilterSlice = createSlice({
    name: 'dffDashboardFilter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        resetDffDashboardFilter: (state, action) => {
            state.category = '';
            state.month = '';
        },
    },
});

export default dffDashboardFilterSlice.reducer;
export const { setCategory, setMonth, resetDffDashboardFilter } = dffDashboardFilterSlice.actions;
