import { apiSlice } from '../api/apiSlice';

export const ticketApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNotice: builder.mutation({
            query: (data) => ({
                url: '/v1/notice',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['tickets'],
        }),
        getNotice: builder.mutation({
            query: ({ page, limit }) => ({
                url: `/v1/notice/all`,
                method: 'POST',
                body: { page, limit },
            }),
            // providesTags: ['tickets'],
        }),
        deleteNotice: builder.mutation({
            query: (id) => ({
                url: `/v1/notice/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['tickets'],
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     try {
            //         const result = await queryFulfilled;
            //         if (result?.data?.data._id) {
            //             console.log(result.data.data);
            //             dispatch(
            //                 apiSlice.util.updateQueryData(
            //                     'getNotices',
            //                     result.data.data._id.toString(),
            //                     (draft) => ({
            //                         data: {
            //                             ...draft,
            //                             data: draft.data.filter(
            //                                 ({ _id }) => _id !== result.data.data._id
            //                             ),
            //                         },
            //                     })
            //                 )
            //             );
            //         }
            //     } catch (error) {
            //         // do nothing
            //     }
            // },
        }),
    }),
});

export const { useGetNoticeMutation, useDeleteNoticeMutation, useAddNoticeMutation } = ticketApi;
