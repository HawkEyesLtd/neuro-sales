import { createSelector } from '@reduxjs/toolkit';

// Base selectors
const selectAttendanceFilter = (state) => state.attendanceFilter || {};
const selectDataManagement = (state) => state.dataManagement || {};
const selectGlobalLoading = (state) => state.globalLoading || {};
const selectAuth = (state) => state.auth || {};

// Memoized selectors
export const selectAttendanceFilterData = createSelector(
    [selectAttendanceFilter],
    (attendanceFilter) => ({
        date: attendanceFilter.date,
        employeeCode: attendanceFilter.employeeCode,
        level: attendanceFilter.level,
        townCode: attendanceFilter.townCode,
        locationMatch: attendanceFilter.locationMatch,
        lateAttendance: attendanceFilter.lateAttendance,
        employeeId: attendanceFilter.employeeId,
        facialError: attendanceFilter.facialError,
    })
);

export const selectDataManagementFilters = createSelector(
    [selectDataManagement],
    (dataManagement) => ({
        circle: dataManagement.circle || [],
        region: dataManagement.region || [],
        area: dataManagement.area || [],
        territory: dataManagement.territory || [],
        town: dataManagement.town || [],
    })
);

export const selectUserProjectAccess = createSelector([selectAuth], (auth) => {
    if (!auth?.user?.projectAccess || !Array.isArray(auth.user.projectAccess)) {
        return [{ label: 'Merchandiser', value: 'CM' }]; // Default fallback
    }
    return auth.user.projectAccess
        .map((x) => ({ label: x.replace(/([A-Z])/g, ' $1').trim(), value: x }))
        .filter((x) => x.value !== 'DFF');
});

export const selectAttendanceTracker = createSelector(
    [(state) => state.attendanceTracker || {}],
    (attendanceTracker) => attendanceTracker.data || {}
);

export const selectReFetchFilter = createSelector(
    [selectGlobalLoading],
    (globalLoading) => globalLoading.reFetchFilter || false
);
