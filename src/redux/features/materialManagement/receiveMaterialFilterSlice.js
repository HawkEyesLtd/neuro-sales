import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dhCode: '',
};

const receiveMaterialFilterSlice = createSlice({
    name: 'receiveMaterialFilter',
    initialState,
    reducers: {
        setDhCodeReceiveMaterial: (state, action) => {
            state.dhCode = action.payload;
        },
        resetReceiveMaterialFilter: (state, action) => {
            state.dhCode = '';
        },
    },
});

export default receiveMaterialFilterSlice.reducer;
export const { setDhCodeReceiveMaterial, resetReceiveMaterialFilter } =
    receiveMaterialFilterSlice.actions;
