import { apiSlice } from '../api/apiSlice';

export const tmrExecutionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTmrExecutionData: builder.mutation({
            query: (data) => ({
                url: '/v1/execution/tmrExecutionReport',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetTmrExecutionDataMutation } = tmrExecutionApi;
