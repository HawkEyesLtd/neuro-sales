import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    month: dayjs(),
    reportType: '',
    globalLoading: false,
};

const dffDownloadReportFilter = createSlice({
    name: 'dffDownloadReportFilter',
    initialState,
    reducers: {
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setReportType: (state, action) => {
            state.reportType = action.payload;
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
        resetDffDownloadReportFilter: (state, action) => {
            state.month = dayjs();
            state.reportType = '';
        },
    },
});

export default dffDownloadReportFilter.reducer;
export const { setMonth, setReportType, setGlobalLoading, resetDffDownloadReportFilter } =
    dffDownloadReportFilter.actions;
