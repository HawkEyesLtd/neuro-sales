import { apiSlice } from '../api/apiSlice';

export const loginDetailsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get login details data
        getLoginDetailsData: builder.mutation({
            query: (data) => ({
                url: '/v1/auth-activity/log-report',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetLoginDetailsDataMutation } = loginDetailsApi;
