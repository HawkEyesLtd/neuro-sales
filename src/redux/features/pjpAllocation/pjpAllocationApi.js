import { apiSlice } from '../api/apiSlice';

export const pjpAllocation = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        pjpAllocation: builder.mutation({
            query: (data) => ({
                url: `/v1/routes/assign-routes`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { usePjpAllocationMutation } = pjpAllocation;
