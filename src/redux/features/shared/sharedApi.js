import { apiSlice } from '../api/apiSlice';

export const sharedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDisplayTypes: builder.query({
            query: (data) => ({
                url: '/v1/planned-qty/display-types',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetDisplayTypesQuery } = sharedApi;
