import { apiSlice } from '../api/apiSlice';

export const salaryEvaluationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMerchandiserEvaluation: builder.mutation({
            query: (data) => ({
                url: '/v1/salary-evaluation/merchandiser',
                method: 'POST',
                body: {
                    ...data,
                },
            }),
        }),

        getAllMSEvaluation: builder.mutation({
            query: (data) => ({
                url: '/v1/salary-evaluation/merchandiser-supervisor',
                method: 'POST',
                body: {
                    ...data,
                },
            }),
        }),

        getAllSalaryStatus: builder.mutation({
            query: (data) => ({
                url: '/v1/salary-evaluation/salary-status',
                method: 'POST',
                body: { ...data },
            }),
        }),

        /// api/v1/salary-evaluation/re-evaluate/{evaluateId}
        postMerchandiserSalary: builder.mutation({
            query: ({ _id, rest, evaluationType }) => ({
                url: `/v1/salary-evaluation/${evaluationType}/${_id}`,
                method: 'POST',
                body: rest,
            }),
        }),

        approveSalaryEvaluation: builder.mutation({
            query: (data) => ({
                url: `/v1/salary-evaluation/approve`,
                method: 'POST',
                body: data,
            }),
        }),

        // salary evaluation approve all
        approveAllSalary: builder.mutation({
            query: (data) => ({
                url: `/v1/salary-evaluation/approve/all`,
                method: 'POST',
                body: data,
            }),
        }),

        disbursedSalary: builder.mutation({
            query: (data) => ({
                url: `/v1/salary-evaluation/disburse`,
                method: 'POST',
                body: data,
            }),
        }),

        // salary disbursement api
        disburseAllSalary: builder.mutation({
            query: (data) => ({
                url: `/v1/salary-evaluation/disburse/all`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllMerchandiserEvaluationMutation,
    useGetAllMSEvaluationMutation,
    useGetAllSalaryStatusMutation,
    usePostMerchandiserSalaryMutation,
    useApproveSalaryEvaluationMutation,
    useDisbursedSalaryMutation,
    useApproveAllSalaryMutation,
    useDisburseAllSalaryMutation,
} = salaryEvaluationApi;
