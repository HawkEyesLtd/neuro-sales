import { apiSlice } from '../api/apiSlice';

export const posmManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get all town data
        getTownList: builder.query({
            query: () => ({
                url: '/v1/town/town-list',
            }),
        }),
        getTownAllInfo: builder.mutation({
            query: () => ({
                url: '/v1/town/all',
                method: 'POST',
                body: { page: 1, limit: 10000 },
            }),
        }),
        // get ai posm data
        addPosm: builder.mutation({
            query: (data) => ({
                url: '/v1/material',
                method: 'POST',
                body: { ...data },
            }),
        }),
        // get single town data
        getSingleTownPosm: builder.query({
            query: ({ id }) => ({
                url: `/v1/town-material/materials/${id}`,
            }),
        }),
        getSingleTownInfo: builder.query({
            query: ({ formTown, toTown }) => {
                let id = '';
                if (formTown) {
                    id = formTown;
                }
                if (toTown) {
                    id = toTown;
                }
                return {
                    url: `/v1/town/${id}`,
                };
            },
        }),
        createMaterialTransferRequest: builder.mutation({
            query: (data) => ({
                url: '/v1/material-movement/transfer',
                method: 'POST',
                body: data,
            }),
        }),
        getPendingTransferRequest: builder.query({
            query: ({ id }) => ({
                url: `/v1/material-movement/town-town-transfer/${id}`,
            }),
            providesTags: ['transferPendingMaterial'],
        }),
        transferApproveOrReject: builder.mutation({
            query: (data) => ({
                url: '/v1/material-movement/town-town-transfer-update',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['transferPendingMaterial'],
        }),
    }),
});

export const {
    useGetTownAllInfoMutation,
    useGetTownListQuery,
    useAddPosmMutation,
    useGetSingleTownPosmQuery,
    useGetSingleTownInfoQuery,
    useCreateMaterialTransferRequestMutation,
    useGetPendingTransferRequestQuery,
    useTransferApproveOrRejectMutation,
} = posmManagementApi;
