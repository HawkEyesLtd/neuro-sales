import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    mtCmCode: '',
    mtCmNme: '',
    errorReason: '',
    channel: '',
    outletCode: '',
    aiRun: '',
    executionDone: '',
};

const mtcmCallFilter = createSlice({
    name: 'mtcmCallFilter',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setMtCmCode: (state, action) => {
            state.mtCmCode = action.payload;
        },
        setMtCmName: (state, action) => {
            state.mtCmNme = action.payload;
        },
        setErrorReason: (state, action) => {
            state.errorReason = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        setAiRun: (state, action) => {
            state.aiRun = action.payload;
        },
        setExecutionDone: (state, action) => {
            state.executionDone = action.payload;
        },
        resetVisitCallFilter: (state, action) => {
            state.dateRange = [];
            state.mtCmCode = '';
            state.mtCmNme = '';
            state.errorReason = '';
            state.channel = '';
            state.outletCode = '';
            state.aiRun = '';
            state.executionDone = '';
        },
    },
});

export default mtcmCallFilter.reducer;
export const {
    setAiRun,
    setChannel,
    setDateRange,
    setErrorReason,
    setMtCmCode,
    setMtCmName,
    setOutletCode,
    setExecutionDone,
    resetVisitCallFilter,
} = mtcmCallFilter.actions;
