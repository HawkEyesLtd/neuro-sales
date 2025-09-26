import { apiSlice } from '../api/apiSlice';

export const salesReportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSalesReports: builder.mutation({
            query: (data) => ({
                url: '/v1/execution/sales-report',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetSalesReportsMutation } = salesReportApi;
