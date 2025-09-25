import { configureStore } from '@reduxjs/toolkit';

import aiPosmListFilterSlice from '../features/AiPosmList/aiPosmListFilterSlice';
import { apiSlice } from '../features/api/apiSlice';
import attendanceFilterSlice from '../features/attendance/attendanceFilterSlice';
import authSlice from '../features/auth/authSlice';
import backlitFilterSlice from '../features/backlit/backlitFilterSlice';
import dailyActivityReportFilter from '../features/dailyActivityReport/dailyActivityReportFilter';
import dashboardFilterSlice from '../features/dashboard/dashboardFilterSlice';
import dffDownloadReportFilter from '../features/dffWholesale/dffDownloadReportFilter';
import dffDashboardFilter from '../features/dffWholesale/dffWholesaleDashboardFilter';
import dffWholesaleNationalLevelFilterSlice from '../features/dffWholesale/dffWholesaleNationalLevelFilter';
import dffWholesaleTerritoryLevelFilterSlice from '../features/dffWholesale/dffWholesaleTerritoryLevelFilter';
import downloadReportFilterSlice from '../features/downloadReport/downloadReportFilterSlice';
import complianceSlice from '../features/execution/complianceSlice';
import dataManagementFilterSlice from '../features/filter/dataManagementFilterSlice';
import employeeManagementFilterSlice from '../features/hrManagement/employeeManagementFilterSlice';
import interimReportFilter from '../features/interim/interimFilterSlice';
import interimReportQpdsFilter from '../features/interim/interimQpdsFilterSlice';
import damageAndLostFilterSlice from '../features/inventory/damageAndLostFilterSlice';
import ffHistoryFilterSlice from '../features/inventory/ffHistoryFilterSlice';
import townSummaryFilterSlice from '../features/inventory/townSummaryFilterSlice';
import userSummaryFilterSlice from '../features/inventory/userSummaryFilterSlice';
import viewPosmTownHistoryFilterSlice from '../features/inventory/viewPosmTownHistoryFilterSlice';
import LeaveManagementFilterSlice from '../features/leaveManagement/leaveManagementFilterSlice';
import loaderSlice from '../features/loaderSlice';
import loginDetailsFilterSlice from '../features/loginDetails/loginDetailsFilterSlice';
import receiveMaterialFilterSlice from '../features/materialManagement/receiveMaterialFilterSlice';
import noticeFilterSlice from '../features/notice/noticeFilterSlice';
import pjpMappingFilterSlice from '../features/pjpManagement/pjpMappingFilter';
import pjpStatusFilterSlice from '../features/pjpManagement/pjpStatusFilterSlice';
import posmViewFilterSlice from '../features/posmManagement/posmViewFilterSlice';
import msCallFilterSlice from '../features/report/msCallFilterSlice';
import mtcmCallFilter from '../features/report/mtcmCallFilter';
import tmsExecutionFilterSlice from '../features/report/tms/tmsExecutionFilterSlice';
import visitCallFilterSlice from '../features/report/visitCallFilterSlice';
import routePlanTrackerFilterSlice from '../features/routePlanTracker/routePlanTrackerFilterSlice';
import salaryAdjustmentSlice from '../features/salaryAdjustment/salaryAdjustmentSlice';
import evaluationDataSlice from '../features/SharedSalaryModule/evaluationDataSlice';
import salaryEvaluationFilterSlice from '../features/SharedSalaryModule/salaryEvaluationFilterSlice';
import permissionIdsSlice from '../features/superuser/permissionIdsSlice';
import viewUserFilterSlice from '../features/superuser/viewUser/viewUserFilterSlice';
import teamManagementFilterSlice from '../features/teamManagement/teamManagementFilterSlice';
import trainingFilterSlice from '../features/trainingModule/trainingFilterSlice';

// Middleware: reset RTK Query cache and clear session on logout
const resetOnLogoutMiddleware = (storeAPI) => (next) => (action) => {
    if (action?.type === 'authSlice/userLoggedOut') {
        try {
            sessionStorage.removeItem('auth');
        } catch {
            // ignore storage errors
        }
        storeAPI.dispatch(apiSlice.util.resetApiState());
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        dataManagement: dataManagementFilterSlice,
        dashboardFilter: dashboardFilterSlice,
        attendanceFilter: attendanceFilterSlice,
        leaveManagementFilter: LeaveManagementFilterSlice,
        noticeFilter: noticeFilterSlice,
        trainingFilter: trainingFilterSlice,
        loginDetailsFilter: loginDetailsFilterSlice,
        routePlanTrackerFilter: routePlanTrackerFilterSlice,
        teamManagementFilter: teamManagementFilterSlice,
        superuserViewUserFilter: viewUserFilterSlice,
        permissionsIds: permissionIdsSlice,
        visitCallFilter: visitCallFilterSlice,
        mtccmCallFilter: mtcmCallFilter,
        msCallFilter: msCallFilterSlice,
        tmsExecutionFilter: tmsExecutionFilterSlice,
        posmTownHistoryFilter: viewPosmTownHistoryFilterSlice,
        damageAndLostFilter: damageAndLostFilterSlice,
        townSummaryFilter: townSummaryFilterSlice,
        ffHistoryFilter: ffHistoryFilterSlice,
        userSummaryFilter: userSummaryFilterSlice,
        receiveMaterialFilter: receiveMaterialFilterSlice,
        aiPosmListFilter: aiPosmListFilterSlice,
        pjpStatusFilter: pjpStatusFilterSlice,
        pjpMappingFilter: pjpMappingFilterSlice,
        posmViewFilter: posmViewFilterSlice,
        dailyActivityReportFilter,
        interimFilter: interimReportFilter,
        interimQpdsFilter: interimReportQpdsFilter,
        backlitFilter: backlitFilterSlice,
        dffDashboardFilter,
        dffNationalLevelFilter: dffWholesaleNationalLevelFilterSlice,
        dffTerritoryLevelFilter: dffWholesaleTerritoryLevelFilterSlice,
        dffDownloadReportFilter,
        downloadFilter: downloadReportFilterSlice,
        globalLoading: loaderSlice,
        employeeManagementFilter: employeeManagementFilterSlice,
        currentEvaluation: evaluationDataSlice,
        salaryEvaluationFilter: salaryEvaluationFilterSlice,
        compliance: complianceSlice,
        // teamAddForm: teamAddFormSlice,
        salaryAdjustment: salaryAdjustmentSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({ serializableCheck: false }).concat(
            apiSlice.middleware,
            resetOnLogoutMiddleware
        ),
});

export default store;
