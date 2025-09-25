import { apiSlice } from '../api/apiSlice';

import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/v1/auth/signin',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    sessionStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: result?.data?.data.access_token,
                            user: result?.data?.data.payload,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result?.data?.data.access_token,
                            user: result?.data?.data.payload,
                        })
                    );
                    // Reset RTK Query cache to ensure user-scoped data refetches post-login
                    dispatch(apiSlice.util.resetApiState());
                } catch {
                    // do nothing
                }
            },
            invalidatesTags: ['whoAmI'],
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: '/v1/auth/signout',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                } catch {
                    // ignore API errors for signout; proceed with local cleanup
                } finally {
                    // Clear persisted session and auth state
                    sessionStorage.removeItem('auth');
                    dispatch(userLoggedOut());
                    // Reset all RTK Query caches
                    dispatch(apiSlice.util.resetApiState());
                }
            },
            invalidatesTags: ['whoAmI'],
        }),

        whoAmI: builder.query({
            query: () => ({
                url: '/v1/user/whoami',
            }),
            providesTags: ['whoAmI'],
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: '/v1/user/update-password',
                method: 'POST',
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/v1/user/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        changeProfile: builder.mutation({
            query: (data) => ({
                url: '/v1/user/update-profile',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['whoAmI'],
        }),

        requestNewAccount: builder.mutation({
            query: (data) => ({
                url: '/v1/user/account-opening-request',
                method: 'POST',
                body: data,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/v1/user/forget-password',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useWhoAmIQuery,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useChangeProfileMutation,
    useRequestNewAccountMutation,
    useForgotPasswordMutation,
} = authApi;
