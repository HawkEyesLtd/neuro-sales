import { apiSlice } from '../api/apiSlice';

export const aiPosmListApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get ai posm data
        getAiPosmList: builder.mutation({
            query: (data) => ({
                url: '/v1/ai-report/posm-search',
                method: 'POST',
                body: { ...data, page: 1, limit: 1000 },
            }),
        }),
    }),
});

export const { useGetAiPosmListMutation } = aiPosmListApi;
