import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const authData = sessionStorage.getItem('auth');
const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    dateRange: [dayjs(), dayjs()],
    ffLevel: [user?.projectAccess?.[0] || 'CM'],
    ffId: [],
    entryType: '',
    materialType: '',
    posmId: '',
    ffCode: '',
    posmCode: '',
};

const ffHistoryFilterSlice = createSlice({
    name: 'ffHistoryFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setFFLevel: (state, action) => {
            state.ffLevel = action.payload;
        },
        setFFId: (state, action) => {
            state.ffId = action.payload;
        },
        setEntryType: (state, action) => {
            state.entryType = action.payload;
        },
        setMaterialType: (state, action) => {
            state.materialType = action.payload;
        },
        setPosmId: (state, action) => {
            state.posmId = action.payload;
        },
        setFFCode: (state, action) => {
            state.ffCode = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        resetFFHistoryFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.ffLevel = [user?.projectAccess?.[0] || 'CM'];
            state.ffId = [];
            state.entryType = '';
            state.materialType = '';
            state.posmId = '';
            state.ffCode = '';
            state.posmCode = '';
        },
    },
});

export default ffHistoryFilterSlice.reducer;
export const {
    setDateRange,
    setEntryType,
    setFFLevel,
    setFFId,
    setMaterialType,
    setPosmId,
    setFFCode,
    setPosmCode,
    resetFFHistoryFilter,
} = ffHistoryFilterSlice.actions;
