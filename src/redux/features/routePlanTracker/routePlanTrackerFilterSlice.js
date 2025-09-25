import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    date: '',
    empLevel: '',
    empId: '',
    isPjp: '',
    empCode: '',
};

const routePlanTrackerFilterSlice = createSlice({
    name: 'routePlanTrackerFilterSlice',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setEmpLevel: (state, action) => {
            state.empLevel = action.payload;
        },
        setEmpId: (state, action) => {
            state.empId = action.payload;
        },
        setIsPjp: (state, action) => {
            state.isPjp = action.payload;
        },
        setEmpCode: (state, action) => {
            state.empCode = action.payload;
        },
        resetRoutePlanTrackerFilter: (state, action) => {
            state.date = '';
            state.empLevel = '';
            state.empId = '';
            state.isPjp = '';
            state.empCode = '';
        },
    },
});

export default routePlanTrackerFilterSlice.reducer;
export const { setDate, setEmpId, setEmpLevel, setIsPjp, setEmpCode, resetRoutePlanTrackerFilter } =
    routePlanTrackerFilterSlice.actions;
