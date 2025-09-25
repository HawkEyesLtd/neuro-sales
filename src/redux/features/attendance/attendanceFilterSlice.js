import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const authData = sessionStorage.getItem('auth');
const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    date: dayjs(),
    employeeCode: '',
    level: [user?.projectAccess?.[0] || 'CM'],
    townCode: '',
    locationMatch: '',
    lateAttendance: '',
    employeeId: '',
    facialError: '',
};

const attendanceFilterSlice = createSlice({
    name: 'attendanceFilterSlice',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setEmployeeCode: (state, action) => {
            state.employeeCode = action.payload;
        },
        setLeveL: (state, action) => {
            state.level = action.payload;
        },
        setTownCodeAttendance: (state, action) => {
            state.townCode = action.payload;
        },
        setLocationMatch: (state, action) => {
            state.locationMatch = action.payload;
        },
        setLateAttendance: (state, action) => {
            state.lateAttendance = action.payload;
        },
        setEmployeeId: (state, action) => {
            state.employeeId = action.payload;
        },
        setFacialError: (state, action) => {
            state.facialError = action.payload;
        },
        resetAttendanceFilter: (state, action) => {
            state.date = dayjs();
            state.employeeCode = '';
            state.level = [user?.projectAccess?.[0] || 'CM'];
            state.townCode = '';
            state.locationMatch = '';
            state.lateAttendance = '';
            state.employeeId = '';
            state.facialError = '';
        },
    },
});

export default attendanceFilterSlice.reducer;
export const {
    setDate,
    setEmployeeCode,
    setLeveL,
    setTownCodeAttendance,
    setLocationMatch,
    setLateAttendance,
    setEmployeeId,
    resetAttendanceFilter,
    setFacialError,
} = attendanceFilterSlice.actions;
