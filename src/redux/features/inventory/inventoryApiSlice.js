import { apiSlice } from '../api/apiSlice';

export const inventoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTownPosmHistory: builder.mutation({
            query: (data) => ({
                url: '/v1/material-activity/town-material',
                method: 'POST',
                body: data,
            }),
        }),
        getTownSummary: builder.mutation({
            query: (data) => ({
                url: '/v1/summary/town-material',
                method: 'POST',
                body: data,
            }),
        }),
        getUserDamageAndLost: builder.mutation({
            query: (data) => ({
                url: '/v1/material-activity/user-damage-lost',
                method: 'POST',
                body: data,
            }),
        }),
        getUserHistory: builder.mutation({
            query: (data) => ({
                url: '/v1/material-activity/user-material',
                method: 'POST',
                body: data,
            }),
        }),
        getUserSummary: builder.mutation({
            query: (data) => ({
                url: '/v1/summary/user-material',
                method: 'POST',
                body: data,
            }),
        }),
        getPosmList: builder.query({
            query: () => ({
                url: '/v1/material',
            }),
        }),
    }),
});

export const {
    useGetTownPosmHistoryMutation,
    useGetTownSummaryMutation,
    useGetUserDamageAndLostMutation,
    useGetUserHistoryMutation,
    useGetUserSummaryMutation,
    useGetPosmListQuery,
} = inventoryApiSlice;
