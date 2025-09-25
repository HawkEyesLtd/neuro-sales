import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.mutation({
            query: (data) => ({
                url: '/v1/dashboard',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetDashboardDataMutation } = dashboardApi;
