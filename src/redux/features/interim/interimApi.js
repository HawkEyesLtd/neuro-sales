import { apiSlice } from '../api/apiSlice';

export const interimApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInterimData: builder.mutation({
            query: (data) => ({
                url: `/v1/interim-report/interim`,
                method: 'POST',
                body: data,
            }),
        }),
        getInterimQpdsData: builder.mutation({
            query: (data) => ({
                url: `/v1/interim-report/qpds`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetInterimDataMutation, useGetInterimQpdsDataMutation } = interimApi;
