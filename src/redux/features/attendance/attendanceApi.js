import { apiSlice } from '../api/apiSlice';

export const attendanceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get attendance data with filters
        getAttendanceData: builder.mutation({
            query: (filterData = {}) => ({
                url: '/v1/attendance/attendanceTracker',
                method: 'POST',
                body: {
                    // Data management filters
                    ...filterData,
                    // Ensure proper structure for API
                    // ...(filterData.circle && { circle: filterData.circle }),
                    ...(filterData?.region && { region: filterData.region }),
                    ...(filterData?.area && { area: filterData.area }),
                    ...(filterData?.territory && { territory: filterData.territory }),
                    ...(filterData?.town && { town: filterData.town }),
                    // Attendance specific filters
                    ...(filterData?.date && { date: filterData.date }),
                    ...(filterData?.employeeCode && { employeeCode: filterData.employeeCode }),
                    ...(filterData?.employeeLevel && { employeeLevel: filterData.employeeLevel }),
                    ...(filterData?.employeeId && { employeeId: filterData.employeeId }),
                    ...(filterData?.isLocationMatched && {
                        isLocationMatched: filterData.isLocationMatched,
                    }),
                    ...(filterData?.lateAttendance && {
                        lateAttendance: filterData.lateAttendance,
                    }),
                    ...(filterData?.facialError && { facialError: filterData.facialError }),
                },
            }),
            transformResponse: (response) => response,
            transformErrorResponse: (response) => response,
        }),
    }),
});

export const { useGetAttendanceDataMutation } = attendanceApi;
