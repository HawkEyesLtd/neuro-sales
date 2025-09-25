import { apiSlice } from '../api/apiSlice';

export const superUserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPermissionTableData: builder.query({
            query: () => ({
                url: '/v1/auth/permission/list',
            }),
        }),
        createNewGroup: builder.mutation({
            query: (data) => ({
                url: '/v1/auth/role-has-permission',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['groupList'],
        }),
        viewGroupList: builder.query({
            query: () => ({
                url: `/v1/auth/role-has-permission?page=1&limit=100`,
            }),
            providesTags: ['groupList'],
        }),
        viewGroupListValues: builder.query({
            query: () => ({
                url: '/v1/auth/role-has-permission/list',
            }),
        }),
        viewGroupIds: builder.query({
            query: () => ({
                url: '/v1/acl/role-has-permission/list',
            }),
        }),
        landingPageList: builder.query({
            query: () => ({
                url: '/v1/auth/permission/list',
            }),
        }),
        createAdminUser: builder.mutation({
            query: (data) => ({
                url: '/v1/user/admin/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['adminUserList'],
        }),
        getAdminUserList: builder.mutation({
            query: (data) => ({
                url: '/v1/user/admin',
                method: 'POST',
                body: data,
            }),
            providesTags: ['adminUserList'],
        }),
        updatePortalUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/v1/user/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['adminUserList'],
        }),
        permissionList: builder.query({
            query: () => ({
                url: '/v1/auth/permission/list',
            }),
        }),
        groupUpdate: builder.mutation({
            query: ({ data, id }) => ({
                url: `/v1/auth/role-has-permission/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['groupList'],
        }),
        getAllAdminUser: builder.mutation({
            query: (data) => ({
                url: '/v1/user/admin-users',
                method: 'POST',
                body: data,
            }),
            providesTags: ['adminUserList'],
        }),

        sendPasswordGeneration: builder.mutation({
            query: (data) => ({
                url: '/v1/user/generate-passwords',
                method: 'POST',
                body: data,
            }),
        }),

        getUserByKind: builder.query({
            query: (kind) => ({
                url: `/v1/user/users-list?kind=${kind}`,
                method: 'GET',
            }),
        }),

        getUserTowns: builder.query({
            query: ({ userId, userType }) => ({
                url: `/v1/user/user-towns-with-label-nd-value?userId=${userId}&userType=${userType}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetPermissionTableDataQuery,
    useCreateNewGroupMutation,
    useViewGroupListQuery,
    useViewGroupIdsQuery,
    useLandingPageListQuery,
    useCreateAdminUserMutation,
    useGetAdminUserListMutation,
    useViewGroupListValuesQuery,
    useUpdatePortalUserMutation,
    usePermissionListQuery,
    useGroupUpdateMutation,
    useGetAllAdminUserMutation,
    useSendPasswordGenerationMutation,
    useGetUserByKindQuery,
    useGetUserTownsQuery,
} = superUserApi;
