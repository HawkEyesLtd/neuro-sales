import { apiSlice } from '../../api/apiSlice';

export const tmsExecutionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTmsExecutionData: builder.mutation({
            query: (data) => ({
                url: '/v1/employee/tms/calls',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetTmsExecutionDataMutation } = tmsExecutionApi;
