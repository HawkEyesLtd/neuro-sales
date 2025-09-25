import { apiSlice } from '../api/apiSlice';

export const targetAllocation = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        tmrTargetAllocation: builder.mutation({
            query: (data) => ({
                url: `/v1/target/assign-tmr-target`,
                method: 'POST',
                body: data,
            }),
        }),
        tmsTargetAllocation: builder.mutation({
            query: (data) => ({
                url: `/v1/target/assign-tms-target`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useTmrTargetAllocationMutation, useTmsTargetAllocationMutation } = targetAllocation;
