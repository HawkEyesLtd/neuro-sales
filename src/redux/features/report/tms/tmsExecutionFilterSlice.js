import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    uddoktaCode: '',
    tmsCode: '',
    callType: '',
};

const tmsExecutionFilterSlice = createSlice({
    name: 'tmsExecutionFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setUddoktaCode: (state, action) => {
            state.uddoktaCode = action.payload;
        },
        setTmsCode: (state, action) => {
            state.tmsCode = action.payload;
        },
        setCallType: (state, action) => {
            state.callType = action.payload;
        },
        resetTmsExecutionFilter: (state, action) => {
            state.dateRange = [];
            state.uddoktaCode = '';
            state.tmsCode = '';
            state.callType = '';
        },
    },
});

export default tmsExecutionFilterSlice.reducer;
export const { setCallType, setDateRange, setTmsCode, setUddoktaCode, resetTmsExecutionFilter } =
    tmsExecutionFilterSlice.actions;
