import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    dateRange: [dayjs(), dayjs()],
    reportType: '',
    report: '',
    globalLoading: false,
    posmIds: [],
};

const downloadReportFilterSlice = createSlice({
    name: 'downloadReportFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        reportType: (state, action) => {
            state.reportType = action.payload;
        },
        setReport: (state, action) => {
            state.report = action.payload;
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
        resetDownloadFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.report = '';
            state.reportType = '';
        },
        setPOSMIds: (state, action) => {
            state.posmIds = action.payload;
        },
    },
});

export default downloadReportFilterSlice.reducer;
export const {
    setDateRange,
    reportType,
    setReport,
    setGlobalLoading,
    resetDownloadFilter,
    setPOSMIds,
} = downloadReportFilterSlice.actions;
