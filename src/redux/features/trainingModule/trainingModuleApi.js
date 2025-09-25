import { apiSlice } from '../api/apiSlice';

export const trainingModuleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTrainingModule: builder.mutation({
            query: (data) => ({
                url: '/v1/training-material',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['training-materials'],
        }),
        getTrainingModuleData: builder.mutation({
            query: () => ({
                url: '/v1/training-material/all',
                method: 'POST',
                body: { page: 1, limit: 100 },
            }),
            providesTags: ['training-materials'],
        }),
        deleteTrainingModule: builder.mutation({
            query: (id) => ({
                url: `/v1/training-material/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['training-materials'],
        }),
    }),
});

export const {
    useGetTrainingModuleDataMutation,
    useDeleteTrainingModuleMutation,
    useAddTrainingModuleMutation,
} = trainingModuleApi;
