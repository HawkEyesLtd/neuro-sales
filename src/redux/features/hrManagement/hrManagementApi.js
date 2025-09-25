import { apiSlice } from '../api/apiSlice';

export const hrManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data) => ({
                url: `/v1/user/send-sms`,
                method: 'POST',
                body: data,
            }),
        }),

        checkNid: builder.query({
            query: (nid) => ({
                url: `/v1/user/check-nid/${nid}`,
                method: 'GET',
            }),
        }),

        activeInactiveUser: builder.mutation({
            query: ({ id, status }) => ({
                url: `/v1/user/active/${id}/${status}`,
                method: 'PATCH',
            }),
        }),
    }),
});

export const { useSendOtpMutation, useCheckNidQuery, useActiveInactiveUserMutation } =
    hrManagementApi;
