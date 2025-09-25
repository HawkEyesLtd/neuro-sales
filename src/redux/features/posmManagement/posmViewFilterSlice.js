import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posmName: '',
    posmType: '',
    posmBrand: '',
    posmChannel: '',
    posmCode: '',
    owner: '',
};

const posmViewFilterSlice = createSlice({
    name: 'posmViewFilterSlice',
    initialState,
    reducers: {
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        setPosmType: (state, action) => {
            state.posmType = action.payload;
        },
        setPosmBrand: (state, action) => {
            state.posmBrand = action.payload;
        },
        setPosmChannel: (state, action) => {
            state.posmChannel = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        setOwner: (state, action) => {
            state.owner = action.payload;
        },
        resetPosmViewListFilter: (state, action) => {
            state.posmName = '';
            state.posmType = '';
            state.posmBrand = '';
            state.posmChannel = '';
            state.posmCode = '';
            state.owner = '';
        },
    },
});

export default posmViewFilterSlice.reducer;
export const {
    setPosmName,
    setPosmType,
    setPosmBrand,
    setPosmChannel,
    setPosmCode,
    setOwner,
    resetPosmViewListFilter,
} = posmViewFilterSlice.actions;
