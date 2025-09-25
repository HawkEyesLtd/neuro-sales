import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    dateRange: [dayjs(), dayjs()],
    dhCode: '',
    posmId: '',
    posmName: '',
};

const townSummaryFilterSlice = createSlice({
    name: 'townSummaryFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setPosmId: (state, action) => {
            state.posmId = action.payload;
        },
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        resetTownSummaryFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.dhCode = '';
            state.posmId = '';
            state.posmName = '';
        },
    },
});

export default townSummaryFilterSlice.reducer;
export const { setDateRange, setPosmId, setPosmName, resetTownSummaryFilter } =
    townSummaryFilterSlice.actions;
