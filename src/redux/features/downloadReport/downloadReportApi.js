import { apiSlice } from '../api/apiSlice';

export const downloadReportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        downloadReportData: builder.mutation({
            query: ({ data, url }) => ({
                url,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useDownloadReportDataMutation } = downloadReportApi;
