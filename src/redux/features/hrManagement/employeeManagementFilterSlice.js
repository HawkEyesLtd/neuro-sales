import { createSlice } from '@reduxjs/toolkit';

const authData = sessionStorage.getItem('auth');

const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    type: undefined,
    employeeName: '',
    employeeUsername: '',
    employeeCode: '',
    idLock: '',
    status: undefined,
    nidNo: '',
    employeeEmail: '',
    actionType: undefined,
};

const employeeManagementFilterSlice = createSlice({
    name: 'employeeManagementFilter',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
        setEmployeeName: (state, action) => {
            state.employeeName = action.payload;
        },
        setEmployeeUsername: (state, action) => {
            state.employeeUsername = action.payload;
        },
        setEmployeeCode: (state, action) => {
            state.employeeCode = action.payload;
        },
        setIdLock: (state, action) => {
            state.idLock = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setNidNo: (state, action) => {
            state.nidNo = action.payload;
        },
        setEmployeeEmail: (state, action) => {
            state.employeeEmail = action.payload;
        },
        setActionType: (state, action) => {
            state.actionType = action.payload;
        },
        resetEmployeeManagementFilter: (state) => {
            state.type = user?.projectAccess?.[0] ? user.projectAccess[0] : 'CM';
            state.employeeName = '';
            state.employeeUsername = '';
            state.employeeCode = '';
            state.idLock = '';
            state.status = undefined;
            state.nidNo = '';
            state.employeeEmail = '';
            state.actionType = undefined;
        },
    },
});

export default employeeManagementFilterSlice.reducer;
export const {
    setType,
    setEmployeeName,
    setEmployeeUsername,
    setEmployeeCode,
    setIdLock,
    setStatus,
    setNidNo,
    setEmployeeEmail,
    setActionType,
    resetEmployeeManagementFilter,
} = employeeManagementFilterSlice.actions;
