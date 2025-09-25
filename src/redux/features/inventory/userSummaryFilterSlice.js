import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const authData = sessionStorage.getItem('auth');
const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    dateRange: [dayjs(), dayjs()],
    ffLevel: [user?.projectAccess?.[0] || 'CM'],
    ffId: [],
    posmName: '',
    posmOriginalName: '',
    ffCode: '',
    posmCode: '',
    empName: '',
    empUsername: '',
};

const userSummaryFilterSlice = createSlice({
    name: 'userSummaryFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setFFId: (state, action) => {
            state.ffId = action.payload;
        },
        setFFLevel: (state, action) => {
            state.ffLevel = action.payload;
        },
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        setPosmOriginalName: (state, action) => {
            state.posmOriginalName = action.payload;
        },
        setFFCode: (state, action) => {
            state.ffCode = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        setEmpName: (state, action) => {
            state.empName = action.payload;
        },
        setEmpUsername: (state, action) => {
            state.empUsername = action.payload;
        },
        resetUserSummaryFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.ffId = [];
            state.ffLevel = [user?.projectAccess?.[0] || 'CM'];
            state.posmName = '';
            state.posmOriginalName = '';
            state.ffCode = '';
            state.posmCode = '';
            state.empName = '';
            state.empUsername = '';
        },
    },
});

export default userSummaryFilterSlice.reducer;
export const {
    setDateRange,
    setFFId,
    setFFLevel,
    setPosmName,
    setPosmOriginalName,
    setFFCode,
    setPosmCode,
    setEmpName,
    setEmpUsername,
    resetUserSummaryFilter,
} = userSummaryFilterSlice.actions;
