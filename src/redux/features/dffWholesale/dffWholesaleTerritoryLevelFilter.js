import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: '',
    company: '',
    outletCode: '',
};

const dffWholesaleNationalLevelFilterSlice = createSlice({
    name: 'dffWholesaleNationalLevelFilter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setCompany: (state, action) => {
            state.company = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        resetDffWholesaleNationalLevelFilter: (state, action) => {
            state.category = '';
            state.company = '';
            state.outletCode = '';
        },
    },
});

export default dffWholesaleNationalLevelFilterSlice.reducer;
export const { setCategory, setCompany, setOutletCode } =
    dffWholesaleNationalLevelFilterSlice.actions;
