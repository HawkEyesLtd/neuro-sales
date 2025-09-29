/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (args.url !== '/v1/user/whoami') {
            if (result?.error?.status === 401) {
                api.dispatch(userLoggedOut());
            }
        }
        return result;
    },
    // ensure user-scoped data refreshes on focus/reconnect or arg change
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: [
        'tickets',
        'training-materials',
        'circleList',
        'regionList',
        'areaList',
        'territoryList',
        'townList',
        'materials',
        'tickets',
        'transferList',
        'leaveData',
        'whoAmI',
        'groupList',
        'transferPendingMaterial',
        'territoryLevelData',
        'adminUserList',
    ],
    endpoints: (_builder) => ({}),
});
