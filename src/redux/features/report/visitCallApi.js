import { apiSlice } from '../api/apiSlice';

export const visitCallReportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVisitCallExecutionData: builder.mutation({
            query: (data) => ({
                url: '/v2/execution/visit-call-report',
                method: 'POST',
                body: data,
            }),
        }),

        getMsCallExecutionData: builder.mutation({
            query: (data) => ({
                url: '/v1/ms-call/ms-call-report',
                method: 'POST',
                body: data,
            }),
        }),

        getAiResult: builder.query({
            query: ({ id }) => ({
                url: `/v1/execution/${id}`,
            }),
        }),

        challengeDataSubmit: builder.mutation({
            query: (data) => ({
                url: '/v1/challenge/audit',
                method: 'POST',
                body: data,
            }),
        }),

        /// using
        auditChallenge: builder.mutation({
            query: (data) => ({
                url: '/v1/challenge/audit',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetVisitCallExecutionDataMutation,
    useGetMsCallExecutionDataMutation,
    useGetAiResultQuery,
    useChallengeDataSubmitMutation,
    useAuditChallengeMutation,
} = visitCallReportApi;
