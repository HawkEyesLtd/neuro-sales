import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    publishDate: '',
    expireDate: '',
    fileType: '',
    fileUrl: '',
    name: '',
    targetOf: [],
};

const trainingFilterSlice = createSlice({
    name: 'noticeFilterSlices',
    initialState,
    reducers: {
        setPublishDate: (state, action) => {
            state.publishDate = action.payload;
        },
        setExpireDate: (state, action) => {
            state.expireDate = action.payload;
        },
        setFileType: (state, action) => {
            state.fileType = action.payload;
        },
        setFileUrl: (state, action) => {
            state.fileUrl = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setTargetOf: (state, action) => {
            state.targetOf = action.payload;
        },
        resetTrainingFilter: (state, action) => {
            state.publishDate = '';
            state.expireDate = '';
            state.fileType = '';
            state.fileUrl = '';
            state.name = '';
            state.targetOf = [];
        },
    },
});

export default trainingFilterSlice.reducer;
export const {
    setPublishDate,
    setExpireDate,
    setFileType,
    setFileUrl,
    setName,
    setTargetOf,
    resetTrainingFilter,
} = trainingFilterSlice.actions;
