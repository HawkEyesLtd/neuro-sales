import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    town: '',
    month: '',
    route: '',
    outletCode: '',
    channel: '',
    outletType: [],
    displayType: [],
};

const pjpStatusFilterSlice = createSlice({
    name: 'pjpStatusFilterSlice',
    initialState,
    reducers: {
        setPjpTown: (state, action) => {
            state.town = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setRoute: (state, action) => {
            state.route = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        },
        setOutletType: (state, action) => {
            state.outletType = action.payload;
        },
        setDisplayType: (state, action) => {
            state.displayType = action.payload;
        },
        resetPjpStatusFilter: (state, action) => {
            state.town = '';
            state.month = '';
            state.route = '';
            state.outletCode = '';
            state.channel = '';
            state.outletType = [];
            state.displayType = [];
        },
    },
});

export default pjpStatusFilterSlice.reducer;
export const {
    setPjpTown,
    setChannel,
    setMonth,
    setOutletCode,
    setOutletType,
    setRoute,
    resetPjpStatusFilter,
    setDisplayType,
} = pjpStatusFilterSlice.actions;
