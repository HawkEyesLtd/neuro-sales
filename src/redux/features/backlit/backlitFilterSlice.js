import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outletCode: '',
    quarter: '',
    status: '',
};

const backlitFilterSlice = createSlice({
    name: 'backlitFilterSlice',
    initialState,
    reducers: {
        setQuarter: (state, action) => {
            state.quarter = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },

        resetQuarterFilter: (state, action) => {
            state.quarter = '';
            state.status = '';
            state.outletCode = '';
        },
    },
});

export default backlitFilterSlice.reducer;
export const { setOutletCode, setQuarter, setStatus, resetQuarterFilter } =
    backlitFilterSlice.actions;
