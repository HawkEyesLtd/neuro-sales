import { apiSlice } from '../api/apiSlice';

export const dffWholesaleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDffDashboardData: builder.mutation({
            query: (data) => ({
                url: `/v1/wholesale/dashboard-analytics`,
                method: 'POST',
                body: data,
            }),
        }),
        getNationalLevelData: builder.mutation({
            query: (data) => ({
                url: `/v1/wholesale/wholesale-report`,
                method: 'POST',
                body: data,
            }),
        }),
        getTerritoryAverageData: builder.mutation({
            query: (data) => ({
                url: `/v1/wholesale/territory-average`,
                method: 'POST',
                body: data,
            }),
        }),
        updateStatus: builder.mutation({
            query: (data) => ({
                url: `/v1/wholesale/change-status`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['territoryLevelData'],
        }),
        getTerritoryLevelData: builder.query({
            query: ({ limit, page }) => ({
                url: `/v1/wholesale/outlet-summary?page=${page}&limit=${limit}`,
            }),
            providesTags: ['territoryLevelData'],
        }),
        addInsight: builder.mutation({
            query: (data) => ({
                url: `/v1/wholesale/wholesale-insight`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetDffDashboardDataMutation,
    useGetNationalLevelDataMutation,
    useGetTerritoryAverageDataMutation,
    useUpdateStatusMutation,
    useGetTerritoryLevelDataQuery,
    useAddInsightMutation,
} = dffWholesaleApi;
