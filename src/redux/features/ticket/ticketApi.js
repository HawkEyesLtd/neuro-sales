import { apiSlice } from '../api/apiSlice';

export const ticketApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => ({
                url: `/v1/ticket?limit=500`,
                method: 'GET',
            }),
            providesTags: ['tickets'],
        }),
        addTicket: builder.mutation({
            query: (data) => ({
                url: `/v1/ticket`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['tickets'],
        }),
        updateTicket: builder.mutation({
            query: (data) => ({
                url: `/v1/ticket/${data.id}`,
                method: 'PATCH',
                body: data.status,
            }),
            invalidatesTags: ['tickets'],
        }),
    }),
});

export const { useGetTicketsQuery, useAddTicketMutation, useUpdateTicketMutation } = ticketApi;
