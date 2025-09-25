/* global URLSearchParams */
import { apiSlice } from '../api/apiSlice';

export const locationValidationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get login details data
        getAllLocationValidationData: builder.mutation({
            query: (data) => ({
                url: '/v1/ms-call/ms-location-validation-reports',
                method: 'POST',
                body: {
                    ...data,
                },
            }),
        }),

        approveRejectValidation: builder.mutation({
            query: ({ id, status }) => ({
                url: `/v1/ms-call/location-validation-update-mc/${id}`,
                method: 'PATCH',
                body: { status },
            }),
        }),

        getAllUserByKind: builder.query({
            query: (params) => {
                let kind = params;
                if (typeof params === 'object' && params !== null) {
                    kind = params.kind;
                }
                const queryParams = new URLSearchParams();
                if (kind) {
                    queryParams.append('kind', kind);
                }
                return {
                    url: `/v1/user/users-list?${queryParams.toString()}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useGetAllLocationValidationDataMutation,
    useApproveRejectValidationMutation,
    useGetAllUserByKindQuery,
} = locationValidationApi;
