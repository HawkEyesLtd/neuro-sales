import { apiSlice } from '../api/apiSlice';

export const dailyActivityApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDailyActivityReport: builder.mutation({
            query: (data) => ({
                url: `/v1/user/daily-activity-report`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetDailyActivityReportMutation } = dailyActivityApi;
