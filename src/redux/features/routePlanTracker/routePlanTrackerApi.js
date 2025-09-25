import { apiSlice } from '../api/apiSlice';

export const routePlanTrackerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get route plan tracker data
        getRoutePlanData: builder.mutation({
            query: (data) => ({
                url: '/v1/routes/route-tracker',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetRoutePlanDataMutation } = routePlanTrackerApi;
