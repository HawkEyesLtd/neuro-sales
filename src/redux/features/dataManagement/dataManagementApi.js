import { apiSlice } from '../api/apiSlice';

export const dataManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get data management filters
        getDataManagement: builder.mutation({
            query: (data) => ({
                url: '/v1/data-management/all',
                method: 'POST',
                body: data,
            }),
        }),
        // add circle
        addCircle: builder.mutation({
            query: (data) => ({
                url: '/v1/datamanagement/circle',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['circleList'],
        }),
        // get region list
        getCircleList: builder.query({
            query: (data) => ({
                url: '/v1/datamanagement/circles',
            }),
            providesTags: ['circleList'],
        }),
        // add region
        addRegion: builder.mutation({
            query: (data) => ({
                url: '/v1/region',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['regionList'],
        }),
        // get region list
        getRegionList: builder.query({
            query: (data) => ({
                url: '/v1/region?page=1&limit=10000',
            }),
            providesTags: ['regionList'],
        }),
        // add area
        addArea: builder.mutation({
            query: (data) => ({
                url: '/v1/area',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['areaList'],
        }),
        // get area list
        getAreaList: builder.query({
            query: (data) => ({
                url: '/v1/area',
            }),
            providesTags: ['areaList'],
        }),
        // add territory
        addTerritory: builder.mutation({
            query: (data) => ({
                url: '/v1/territory',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['territoryList'],
        }),
        // get territory list
        getTerritoryList: builder.query({
            query: (data) => ({
                url: '/v1/territory',
            }),
            providesTags: ['territoryList'],
        }),
        // get dh list
        getDhList: builder.query({
            query: (data) => ({
                url: '/v1/datamanagement/dh',
            }),
        }),
        // add town
        addTown: builder.mutation({
            query: (data) => ({
                url: '/v1/town',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['townList'],
        }),
        // get dh list and his up layer
        getTownData: builder.query({
            query: () => ({
                url: '/v1/town',
            }),
            providesTags: ['townList'],
        }),
        // get single dh information
        getSingleDh: builder.query({
            query: ({ id }) => ({
                url: `/v1/datamanagement/dh/${id}`,
            }),
        }),
    }),
});

export const {
    useGetDataManagementMutation,
    useAddCircleMutation,
    useGetCircleListQuery,
    useAddAreaMutation,
    useAddRegionMutation,
    useAddTerritoryMutation,
    useGetAreaListQuery,
    useGetDhListQuery,
    useGetRegionListQuery,
    useGetTerritoryListQuery,
    useAddTownMutation,
    useGetTownDataQuery,
    useGetSingleDhQuery,
} = dataManagementApi;
