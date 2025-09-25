import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ownerName: '',
    sovCount: '',
    ctg: '',
};

const aiPosmListFilterSlice = createSlice({
    name: 'aiPosmListFilterSlice',
    initialState,
    reducers: {
        setOwnerName: (state, action) => {
            state.ownerName = action.payload;
        },
        setSovCount: (state, action) => {
            state.sovCount = action.payload;
        },
        setCategory: (state, action) => {
            state.ctg = action.payload;
        },
        resetPosmAiListFilter: (state, action) => {
            state.ownerName = '';
            state.sovCount = '';
            state.ctg = '';
        },
    },
});

export default aiPosmListFilterSlice.reducer;
export const { setCategory, setOwnerName, setSovCount, resetPosmAiListFilter } =
    aiPosmListFilterSlice.actions;
