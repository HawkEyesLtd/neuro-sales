import { apiSlice } from '../api/apiSlice';

export const materialManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMaterial: builder.query({
            query: ({ page, limit, name, category, channel, code, brand }) => {
                let str = `?page=${page}&limit=${limit}`;
                if (name) {
                    str += `&materialName=${name}`;
                }
                if (category) {
                    str += `&category=${category}`;
                }
                if (channel) {
                    str += `&channel=${channel}`;
                }
                if (code) {
                    str += `&materialCode=${code}`;
                }
                if (brand) {
                    str += `&company=${brand}`;
                }
                return {
                    url: `/v1/material${str}`,
                };
            },
            providesTags: ['materials'],
        }),
        getCompetitorMaterial: builder.query({
            query: ({ page = 1, limit = 10000, name, category, channel, code, brand }) => ({
                url: `/v1/material/competition-materials?page=${page}&limit=${limit}`,
            }),
            providesTags: ['competitorMaterials'],
        }),
        addMaterial: builder.mutation({
            query: (data) => ({
                url: '/v1/material',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['materials'],
        }),
        deleteMaterial: builder.mutation({
            query: (id) => ({
                url: `/v1/material/${id}`,
            }),
            invalidatesTags: ['materials'],
        }),
        allocateMaterialViaExcel: builder.mutation({
            query: (data) => ({
                url: '/v1/material/town-material-allocation',
                method: 'POST',
                body: data,
            }),
        }),
        getPendingMaterial: builder.mutation({
            query: (data) => ({
                url: '/v1/material/dh',
                method: 'POST',
                body: data,
            }),
        }),
        receiveMaterial: builder.mutation({
            query: ({ id, data }) => ({
                url: `/v1/material/received/${id}`,
                method: 'POST',
                body: { items: data },
            }),
        }),
        getDhList: builder.query({
            query: () => ({
                url: '/v1/datamanagement/dh',
            }),
        }),
        getPendingMaterialList: builder.query({
            query: ({ id }) => ({
                url: `/v1/material/dh-dh-transfer/${id}`,
            }),
            providesTags: ['transferList'],
        }),
    }),
});

export const {
    useGetMaterialQuery,
    useAddMaterialMutation,
    useDeleteMaterialMutation,
    useAllocateMaterialViaExcelMutation,
    useGetPendingMaterialMutation,
    useReceiveMaterialMutation,
    useGetDhListQuery,
    useCreateMaterialTransferRequestMutation,
    useGetPendingMaterialListQuery,
    useGetCompetitorMaterialQuery,
} = materialManagementApi;
