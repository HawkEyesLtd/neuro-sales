import { apiSlice } from '../api/apiSlice';

export const pjpManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get route plan tracker data
        getPjpData: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/active/all',
                method: 'POST',
                body: data,
            }),
        }),
        pjpDraftUpload: builder.mutation({
            query: (data) => ({
                url: `/v1/pjp-management/upload-draft-file`,
                method: 'POST',
                body: data,
            }),
        }),
        getPjpDraftData: builder.mutation({
            query: (data) => ({
                url: `/v1/pjp-management/draft/all`,
                method: 'POST',
                body: data,
            }),
        }),
        assignPjpData: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/assigned',
                method: 'PATCH',
                body: data.data,
            }),
        }),
        approveOrRejectPjp: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/approve-reject',
                method: 'PATCH',
                body: data,
            }),
        }),
        submitDraft: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/predraft',
                method: 'PATCH',
                body: data,
            }),
        }),
        approveAllByTo: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/approve',
                method: 'PATCH',
                body: data,
            }),
        }),
        rejectAllByTo: builder.mutation({
            query: (data) => ({
                url: '/v1/pjp-management/reject',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetPjpDataMutation,
    usePjpDraftUploadMutation,
    useGetPjpDraftDataMutation,
    useAssignPjpDataMutation,
    useApproveOrRejectPjpMutation,
    useSubmitDraftMutation,
    useApproveAllByToMutation,
    useRejectAllByToMutation,
} = pjpManagementApi;
