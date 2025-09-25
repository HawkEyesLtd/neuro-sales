import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: '',
    attendance: '',
    assignedRoutes: '',
    dayend: '',
    level: '',
    dhCode: '',
    employeeCode: '',
};

const dailyActivityReportFilterSlice = createSlice({
    name: 'dailyActivityReportFilter',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setAttendance: (state, action) => {
            state.attendance = action.payload;
        },
        setAssignedRoutes: (state, action) => {
            state.assignedRoutes = action.payload;
        },
        setDayend: (state, action) => {
            state.dayend = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setDhCodeDailyActivity: (state, action) => {
            state.dhCode = action.payload;
        },
        setEmployeeCode: (state, action) => {
            state.employeeCode = action.payload;
        },
        resetDailyActivityFilter: (state, action) => {
            state.date = '';
            state.attendance = '';
            state.assignedRoutes = '';
            state.dayend = '';
            state.level = '';
            state.dhCode = '';
            state.employeeCode = '';
        },
    },
});

export default dailyActivityReportFilterSlice.reducer;
export const {
    setAssignedRoutes,
    setAttendance,
    setDate,
    setDayend,
    setLevel,
    setDhCodeDailyActivity,
    setEmployeeCode,
    resetDailyActivityFilter,
} = dailyActivityReportFilterSlice.actions;
