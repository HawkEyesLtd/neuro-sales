import { apiSlice } from '../api/apiSlice';

export const teamManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchEmployee: builder.mutation({
            query: (data) => ({
                url: '/v1/user/search',
                method: 'POST',
                body: { ...data },
            }),
        }),
        viewEmployee: builder.mutation({
            query: (data) => ({
                url: '/v1/user/search',
                method: 'POST',
                body: data,
            }),
        }),
        addEmployee: builder.mutation({
            query: (data) => ({
                url: '/v1/user',
                method: 'POST',
                body: data,
            }),
        }),
        updateEmployeeInfo: builder.mutation({
            query: ({ data, id }) => ({
                url: `/v1/user/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        unLockUser: builder.mutation({
            query: (id) => ({
                url: `/v1/user/unlock/${id}`,
                method: 'PATCH',
            }),
        }),
        unregisterUserDevice: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/auth/unregister-user-device/${id}`,
                method: 'PATCH',
            }),
        }),
        suspendUserApi: builder.mutation({
            query: (data) => ({
                url: '/v1/user/suspend-user',
                method: 'PATCH',
                body: data,
            }),
        }),
        userPasswordUpdate: builder.mutation({
            query: (data) => ({
                url: '/v1/user/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useSearchEmployeeMutation,
    useViewEmployeeMutation,
    useAddEmployeeMutation,
    useUpdateEmployeeInfoMutation,
    useUnregisterUserDeviceMutation,
    useUnLockUserMutation,
    useSuspendUserApiMutation,
    useUserPasswordUpdateMutation,
} = teamManagementApi;
