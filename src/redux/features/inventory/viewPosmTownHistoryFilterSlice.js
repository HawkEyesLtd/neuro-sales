import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    dateRange: [dayjs(), dayjs()],
    posmName: '',
    entryType: '',
    posmCode: '',
};

const viewPosmTownHistoryFilterSlice = createSlice({
    name: 'viewPosmTownHistoryFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setEntryType: (state, action) => {
            state.entryType = action.payload;
        },
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        resetTownHistoryFilterSlice: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.entryType = '';
            state.posmName = '';
            state.posmCode = '';
        },
    },
});

export default viewPosmTownHistoryFilterSlice.reducer;
export const { setDateRange, setEntryType, setPosmName, setPosmCode, resetTownHistoryFilterSlice } =
    viewPosmTownHistoryFilterSlice.actions;
