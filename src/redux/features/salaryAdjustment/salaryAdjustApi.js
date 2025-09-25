import { apiSlice } from '../api/apiSlice';

export const salaryAdjustmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postSalaryAdjustment: builder.mutation({
            query: (data) => ({
                url: '/v1/salary-evaluation/recalculate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { usePostSalaryAdjustmentMutation } = salaryAdjustmentApi;
