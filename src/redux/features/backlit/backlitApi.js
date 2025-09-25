import { apiSlice } from '../api/apiSlice';

export const backlitApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBacklitData: builder.mutation({
            query: (data) => ({
                url: `/v1/backlit-audit`,
                method: 'POST',
                body: data,
            }),
        }),
        updateBacklitData: builder.mutation({
            query: (data) => ({
                url: `/v1/backlit-audit`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetBacklitDataMutation, useUpdateBacklitDataMutation } = backlitApi;
