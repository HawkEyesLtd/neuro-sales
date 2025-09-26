import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    posmId: null,
    posmName: null,
};

const townSummaryFilterSlice = createSlice({
    name: 'townSummaryFilter',
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
        resetTownSummaryFilter: (state) => {
            state.dateRange = [];
            state.posmId = null;
            state.posmName = null;
        },
    },
});

export const { setDateRange, setPosmId, setPosmName, resetTownSummaryFilter } =
    townSummaryFilterSlice.actions;

export default townSummaryFilterSlice.reducer;
