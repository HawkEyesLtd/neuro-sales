import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    publishDate: '',
    target: [],
    expireDate: '',
    description: '',
};

const noticeFilterSlice = createSlice({
    name: 'noticeFilterSlice',
    initialState,
    reducers: {
        setPublishDate: (state, action) => {
            state.publishDate = action.payload;
        },
        setExpireDate: (state, action) => {
            state.expireDate = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setTarget: (state, action) => {
            state.target = action.payload;
        },
        resetNoticeFilter: (state, action) => {
            state.target = [];
            state.publishDate = '';
            state.expireDate = '';
            state.description = '';
        },
    },
});

export default noticeFilterSlice.reducer;
export const { setPublishDate, setDescription, setExpireDate, setTarget, resetNoticeFilter } =
    noticeFilterSlice.actions;
