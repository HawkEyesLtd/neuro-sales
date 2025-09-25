import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    empId: '',
    empCode: '',
    empName: '',
    empUsername: '',
    empLevel: '',
    supervisor: '',
    idLock: '',
    status: '',
};

const teamManagementFilterSlice = createSlice({
    name: 'teamManagementFilterSlice',
    initialState,
    reducers: {
        setEmpId: (state, action) => {
            state.empId = action.payload;
        },
        setEmpCode: (state, action) => {
            state.empCode = action.payload;
        },
        setEmpName: (state, action) => {
            state.empName = action.payload;
        },
        setEmpUsername: (state, action) => {
            state.empUsername = action.payload;
        },
        setEmpLevel: (state, action) => {
            state.empLevel = action.payload;
        },
        setSupervisor: (state, action) => {
            state.supervisor = action.payload;
        },
        setIdLock: (state, action) => {
            state.idLock = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        resetTeamManagementFilter: (state, action) => {
            state.empId = '';
            state.empCode = '';
            state.empName = '';
            state.empUsername = '';
            state.empLevel = '';
            state.supervisor = '';
            state.idLock = '';
            state.status = '';
        },
    },
});

export default teamManagementFilterSlice.reducer;
export const {
    setEmpCode,
    setEmpId,
    setEmpLevel,
    setEmpName,
    setEmpUsername,
    setSupervisor,
    setIdLock,
    setStatus,
    resetTeamManagementFilter,
} = teamManagementFilterSlice.actions;
