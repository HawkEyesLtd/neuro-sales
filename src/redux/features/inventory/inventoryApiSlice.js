import { apiSlice } from '../api/apiSlice';

export const inventoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Existing endpoints
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
        // New inventory management endpoints
        getInventoryStatus: builder.mutation({
            query: (data) => ({
                url: '/v1/inventory/status',
                method: 'POST',
                body: data,
            }),
        }),
        getDHProductReceipts: builder.mutation({
            query: (data) => ({
                url: '/v1/inventory/dh-product-receipts',
                method: 'POST',
                body: data,
            }),
        }),
        getDHCreditLifting: builder.mutation({
            query: (data) => ({
                url: '/v1/inventory/dh-credit-lifting',
                method: 'POST',
                body: data,
            }),
        }),
        addProductReceipt: builder.mutation({
            query: (data) => ({
                url: '/v1/inventory/add-receipt',
                method: 'POST',
                body: data,
            }),
        }),
        addSKU: builder.mutation({
            query: (data) => ({
                url: '/v1/inventory/add-sku',
                method: 'POST',
                body: data,
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
    useGetInventoryStatusMutation,
    useGetDHProductReceiptsMutation,
    useGetDHCreditLiftingMutation,
    useAddProductReceiptMutation,
    useAddSKUMutation,
} = inventoryApiSlice;
