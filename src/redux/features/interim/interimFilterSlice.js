import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    scheduledVisit: '',
    completedVisit: '',
    outletcode: '',
    channel: '',
    outletType: [],
    month: dayjs(),
    passedFailed: '',
    displayItems: [
        'GAL',
        'PONDS',
        'Hair Care',
        'Nutrition',
        // 'LB LIQUID QPDS',
        'LUX BODYWASH QPDS',
        'VIM LIQUID DISPLAY',
        'ORAL_QPDS',
        // 'Nutrition Store Lite',
        // 'SURF EXCEL DISPLAY',
    ],
};

const interimReportFilter = createSlice({
    name: 'interimReportFilter',
    initialState,
    reducers: {
        setScheduledVisit: (state, action) => {
            state.scheduledVisit = action.payload;
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
        setOutletType: (state, action) => {
            state.outletType = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setPassedOrFailed: (state, action) => {
            state.passedFailed = action.payload;
        },
        setDisplayItems: (state, action) => {
            state.displayItems = action.payload;
        },
        resetInterimFilter: (state, action) => {
            state.channel = '';
            state.completedVisit = '';
            state.outletType = [];
            state.outletcode = '';
            state.scheduledVisit = '';
            state.month = dayjs();
            state.passedFailed = '';
            state.displayItems = [
                'GAL',
                'PONDS',
                'Hair Care',
                'Nutrition',
                // 'Nutrition Store Lite',
                // 'SURF EXCEL DISPLAY',
                'VIM LIQUID DISPLAY',
                'LUX BODYWASH QPDS',
                'ORAL_QPDS',
                // 'LB LIQUID QPDS',
            ];
        },
    },
});

export default interimReportFilter.reducer;
export const {
    setChannel,
    setCompleteVisit,
    setOutletCode,
    setOutletType,
    setScheduledVisit,
    setMonth,
    setPassedOrFailed,
    setDisplayItems,
    resetInterimFilter,
} = interimReportFilter.actions;
