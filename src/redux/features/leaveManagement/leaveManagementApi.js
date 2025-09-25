import { apiSlice } from '../api/apiSlice';

export const leaveManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPendingLeave: builder.mutation({
            query: (data) => ({
                url: '/v2/leave/leave-requests',
                method: 'POST',
                body: data,
            }),
            providesTags: ['leaveData'],
        }),

        updateLeaveRequest: builder.mutation({
            query: (data) => ({
                url: '/v1/leave/approve-reject',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['leaveData'],
        }),
    }),
});

export const { useGetPendingLeaveMutation, useUpdateLeaveRequestMutation } = leaveManagementApi;
