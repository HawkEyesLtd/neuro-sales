import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateRange: [],
    name: '',
    email: '',
};

const loginDetailsFilterSlice = createSlice({
    name: 'loginDetailsFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        resetLoginDetailsFilter: (state, action) => {
            state.dateRange = [];
            state.name = '';
            state.email = '';
        },
    },
});

export default loginDetailsFilterSlice.reducer;
export const { setDateRange, setName, setEmail } = loginDetailsFilterSlice.actions;
