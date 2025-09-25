import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    circle: [],
    region: [],
    area: [],
    territory: [],
    town: [],
};

const dataManagementFilterSlice = createSlice({
    name: 'dataManagementFilterSlice',
    initialState,
    reducers: {
        setCircle: (state, action) => {
            state.circle = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setArea: (state, action) => {
            state.area = action.payload;
        },
        setTerritory: (state, action) => {
            state.territory = action.payload;
        },
        setTown: (state, action) => {
            state.town = action.payload;
        },
        resetDataManagementFilter: (state, action) => {
            state.circle = [];
            state.region = [];
            state.area = [];
            state.territory = [];
            state.town = [];
        },
    },
});

export default dataManagementFilterSlice.reducer;
export const { setCircle, setRegion, setArea, setTerritory, setTown, resetDataManagementFilter } =
    dataManagementFilterSlice.actions;
