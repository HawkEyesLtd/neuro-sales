import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const authData = sessionStorage.getItem('auth');
const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    dateRange: [dayjs(), dayjs()],
    ffLevel: [user?.projectAccess?.[0] || 'CM'],
    ffName: [],
    posmName: '',
    ffCode: '',
    posmCode: '',
};

const damageAndLostFilterSlice = createSlice({
    name: 'damageAndLostFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setFFLevel: (state, action) => {
            state.ffLevel = action.payload;
        },
        setFFName: (state, action) => {
            state.ffName = action.payload;
        },
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        setFFCode: (state, action) => {
            state.ffCode = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        resetDamageAndLostFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.ffLevel = [user?.projectAccess?.[0] || 'CM'];
            state.ffName = [];
            state.posmName = '';
            state.ffCode = '';
            state.posmCode = '';
        },
    },
});

export default damageAndLostFilterSlice.reducer;
export const {
    setDateRange,
    setFFLevel,
    setFFName,
    setPosmName,
    setFFCode,
    setPosmCode,
    resetDamageAndLostFilter,
} = damageAndLostFilterSlice.actions;
