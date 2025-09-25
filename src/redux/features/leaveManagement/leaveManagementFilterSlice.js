import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    empLevel: '',
    ffId: '',
};

const leaveManagementFilterSlice = createSlice({
    name: 'leaveManagementFilter',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setEmpLevel: (state, action) => {
            state.empLevel = action.payload;
        },
        setFFid: (state, action) => {
            state.ffId = action.payload;
        },
        resetLeaveManagementFilter: (state, action) => {
            state.dateRange = [];
            state.empLevel = '';
            state.ffId = '';
        },
    },
});

export default leaveManagementFilterSlice.reducer;
export const { setDateRange, setEmpLevel, setFFid, resetLeaveManagementFilter } =
    leaveManagementFilterSlice.actions;
