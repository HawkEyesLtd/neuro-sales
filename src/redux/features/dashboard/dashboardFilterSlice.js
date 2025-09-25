import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    projectType: '',
};

const dashboardFilterSlice = createSlice({
    name: 'dashboardFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setProjectType: (state, action) => {
            state.projectType = action.payload;
        },
        resetDashboardFilter: (state, action) => {
            state.dateRange = [];
            state.projectType = '';
        },
    },
});

export default dashboardFilterSlice.reducer;
export const { setDateRange, setProjectType, resetDashboardFilter } = dashboardFilterSlice.actions;
