import { apiSlice } from '../api/apiSlice';

export const attendanceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get attendance data
        getAttendanceData: builder.mutation({
            query: (data) => ({
                url: '/v1/attendance/attendanceTracker',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetAttendanceDataMutation } = attendanceApi;
