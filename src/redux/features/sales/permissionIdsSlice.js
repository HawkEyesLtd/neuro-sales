import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ids: [],
};

const permissionIdsSlice = createSlice({
    initialState,
    name: 'permissionIdsSlices',
    reducers: {
        addIds: (state, action) => {
            state.ids.push(...action.payload);
        },
        setIds: (state, action) => {
            state.ids = action.payload;
        },
    },
});

export default permissionIdsSlice.reducer;
export const { setIds, addIds } = permissionIdsSlice.actions;
