import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    eligibility: '',
    ffLevel: '',
    ffCode: null,
    status: null,
    month: dayjs().format('MMMM'),
    year: dayjs().format('YYYY'),
    received: null,
    evaluated: null,
    penalty: null,
};

const salaryEvaluationFilterSlice = createSlice({
    name: 'salaryEvaluationFilterSlice',
    initialState,
    reducers: {
        setEligibility: (state, action) => {
            state.eligibility = action.payload;
        },
        setFFLevel: (state, action) => {
            state.ffLevel = action.payload;
        },
        setFFCode: (state, action) => {
            state.ffCode = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setMonth: (state, action) => {
            const date = action.payload.split('-');
            const [month, year] = date;
            state.month = month;
            state.year = year;
        },
        setReceived: (state, action) => {
            state.received = action.payload;
        },
        setEvaluated: (state, action) => {
            state.evaluated = action.payload;
        },
        setPenalty: (state, action) => {
            state.penalty = action.payload;
        },
        resetSalaryDisbursementFilter: (state) => {
            state.eligibility = '';
            state.ffLevel = '';
            state.ffCode = '';
            state.status = '';
            state.month = dayjs().format('MMMM');
            state.year = dayjs().format('YYYY');
            state.received = null;
            state.evaluated = null;
            state.penalty = null;
        },
    },
});

export default salaryEvaluationFilterSlice.reducer;
export const {
    setEligibility,
    setFFLevel,
    setFFCode,
    setStatus,
    setMonth,
    setReceived,
    resetSalaryDisbursementFilter,
    setEvaluated,
    setPenalty,
} = salaryEvaluationFilterSlice.actions;
