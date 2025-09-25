import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    route: '',
    outletCode: '',
    channel: '',
    outletType: [],
    displayType: [],
};

const pjpMappingFilterSlice = createSlice({
    name: 'pjpMappingFilterSlice',
    initialState,
    reducers: {
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
            state.route = '';
            state.outletCode = '';
            state.channel = '';
            state.outletType = [];
            state.displayType = [];
        },
    },
});

export default pjpMappingFilterSlice.reducer;
export const {
    setChannel,
    setOutletCode,
    setOutletType,
    setRoute,
    resetPjpStatusFilter,
    setDisplayType,
} = pjpMappingFilterSlice.actions;
