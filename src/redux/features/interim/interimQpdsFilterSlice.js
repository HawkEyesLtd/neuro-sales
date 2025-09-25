import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    visited: '',
    completedVisit: '',
    outletcode: '',
    channel: '',
    qpdsName: '',
    ffName: '',
    month: dayjs(),
};

const interimReportQpdsFilter = createSlice({
    name: 'interimReportQpdsFilter',
    initialState,
    reducers: {
        setVisited: (state, action) => {
            state.visited = action.payload;
        },
        setCompleteVisit: (state, action) => {
            state.completedVisit = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletcode = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setQpdsName: (state, action) => {
            state.qpdsName = action.payload;
        },
        setFfName: (state, action) => {
            state.ffName = action.payload;
        },
        resetInterimQpdsFilter: (state, action) => {
            state.visited = '';
            state.channel = '';
            state.completedVisit = '';
            state.outletcode = '';
            state.qpdsName = '';
            state.ffName = '';
            state.month = dayjs();
        },
    },
});

export default interimReportQpdsFilter.reducer;
export const {
    setChannel,
    setCompleteVisit,
    setOutletCode,
    setOutletType,
    setVisited,
    setMonth,
    setFfName,
    setQpdsName,
    resetInterimQpdsFilter,
} = interimReportQpdsFilter.actions;
