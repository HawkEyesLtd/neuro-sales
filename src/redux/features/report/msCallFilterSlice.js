import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    callType: '',
    msId: '',
    ffName: '',
    msCallType: '',
    aiSatisfactory: '',
    outletStatusByAi: '',
    outletStatusByMs: '',
    outletCode: '',
    evaluationScore: 0,
};

const msCallFilterSlice = createSlice({
    name: 'msCallFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setFFName: (state, action) => {
            state.ffName = action.payload;
        },
        setMsId: (state, action) => {
            state.msId = action.payload;
        },
        setCallType: (state, action) => {
            state.callType = action.payload;
        },
        setMsCallType: (state, action) => {
            state.msCallType = action.payload;
        },
        setAiSatisfactory: (state, action) => {
            state.aiSatisfactory = action.payload;
        },
        setOutletStatusByAi: (state, action) => {
            state.outletStatusByAi = action.payload;
        },
        setOutletStatusByMs: (state, action) => {
            state.outletStatusByMs = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        setEvaluationScore: (state, action) => {
            state.evaluationScore = action.payload;
        },
        resetMsCallFilter: (state, action) => {
            state.dateRange = [];
            state.msId = '';
            state.ffName = '';
            state.callType = '';
            state.msCallType = '';
            state.aiSatisfactory = '';
            state.outletStatusByAi = '';
            state.outletStatusByMs = '';
            state.outletCode = '';
            state.evaluationScore = 0;
        },
    },
});

export default msCallFilterSlice.reducer;
export const {
    setAiSatisfactory,
    setCallType,
    setDateRange,
    setFFName,
    setMsCallType,
    setMsId,
    setOutletStatusByAi,
    setOutletStatusByMs,
    setOutletCode,
    resetMsCallFilter,
    setEvaluationScore,
} = msCallFilterSlice.actions;
