import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const authData = sessionStorage.getItem('auth');
const { user = {} } = authData ? JSON.parse(authData) : {};

const initialState = {
    dateRange: [dayjs(), dayjs()],
    task: [],
    ffLevel: [user?.projectAccess?.[0] || 'CM'],
    ffCode: '',
    ffName: '',
    errorReason: '',
    callType: [],
    channel: '',
    posmId: '',
    outletType: [],
    outletCode: '',
    outletStatusByAi: '',
    outletStatusByMs: '',
    executionDone: '',
    aiRun: '',
    fatType: '',
    shelfTalkerType: '',
    posmName: '',
    posmCode: '',
    displayChallengeStatus: '',
    shelfTalkerChallengeStatus: '',
    displayStatus: '',
    qpdsStatus: '',
    auditStatus: '',
    hangerPresence: '',
    ublSachetPresenceHigh: '',
    ublSOSHigh: '',
    shelvingNormMaintained: '',
    ublSOVMHigh: '',
    shelfTalkerQuality: '',
    variantComplianceMet: '',
    overallComplianceMet: '',
    displayRemarks: '',
    planogramAdherence: '',
    exclusivity: '',
    hotspot: '',
    challengedBySupervisor: '',
    requestForChallenge: '',
    shelfTalkerExist: '',
    displayType: [],
};

const visitCallFilterSlice = createSlice({
    name: 'visitCallFilterSlice',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        },
        setFFLevel: (state, action) => {
            state.ffLevel = action.payload;
        },
        setFFCode: (state, action) => {
            state.ffCode = action.payload;
        },
        setFFName: (state, action) => {
            state.ffName = action.payload;
        },
        setErrorReason: (state, action) => {
            state.errorReason = action.payload;
        },
        setCallType: (state, action) => {
            state.callType = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        },
        setPosmId: (state, action) => {
            state.posmId = action.payload;
        },
        setOutletType: (state, action) => {
            state.outletType = action.payload;
        },
        setOutletCode: (state, action) => {
            state.outletCode = action.payload;
        },
        setOutletStatusByAi: (state, action) => {
            state.outletStatusByAi = action.payload;
        },
        setOutletStatusByMs: (state, action) => {
            state.outletStatusByMs = action.payload;
        },
        setExecutionDone: (state, action) => {
            state.executionDone = action.payload;
        },
        setAiRun: (state, action) => {
            state.aiRun = action.payload;
        },
        setFatType: (state, action) => {
            state.fatType = action.payload;
        },
        setShelfTalkerType: (state, action) => {
            state.shelfTalkerType = action.payload;
        },
        setPosmName: (state, action) => {
            state.posmName = action.payload;
        },
        setPosmCode: (state, action) => {
            state.posmCode = action.payload;
        },
        setDisplayStatus: (state, action) => {
            state.displayStatus = action.payload;
        },
        setQpdsStatus: (state, action) => {
            state.qpdsStatus = action.payload;
        },
        setDisplayChallengeStatus: (state, action) => {
            state.displayChallengeStatus = action.payload;
        },
        setShelfTalkerChallengeStatus: (state, action) => {
            state.shelfTalkerChallengeStatus = action.payload;
        },
        setAuditStatus: (state, action) => {
            state.auditStatus = action.payload;
        },
        setHangerPresence: (state, action) => {
            state.hangerPresence = action.payload;
        },
        setUblSachetPresenceHigh: (state, action) => {
            state.ublSachetPresenceHigh = action.payload;
        },
        setUblSOSHigh: (state, action) => {
            state.ublSOSHigh = action.payload;
        },
        setShelvingNormMaintained: (state, action) => {
            state.shelvingNormMaintained = action.payload;
        },
        setUblSOVMHigh: (state, action) => {
            state.ublSOVMHigh = action.payload;
        },
        setShelfTalkerQuality: (state, action) => {
            state.shelfTalkerQuality = action.payload;
        },
        setVariantComplianceMet: (state, action) => {
            state.variantComplianceMet = action.payload;
        },
        setOverallComplianceMet: (state, action) => {
            state.overallComplianceMet = action.payload;
        },
        setDisplayRemarks: (state, action) => {
            state.displayRemarks = action.payload;
        },
        setPlanogramAdherence: (state, action) => {
            state.planogramAdherence = action.payload;
        },
        setExclusivity: (state, action) => {
            state.exclusivity = action.payload;
        },
        setHotspot: (state, action) => {
            state.hotspot = action.payload;
        },
        setChallengedBySupervisor: (state, action) => {
            state.challengedBySupervisor = action.payload;
        },
        setRequestForChallenge: (state, action) => {
            state.requestForChallenge = action.payload;
        },
        setShelfTalkerExist: (state, action) => {
            state.shelfTalkerExist = action.payload;
        },
        setDisplayType: (state, action) => {
            state.displayType = action.payload;
        },
        resetVisitCallFilter: (state, action) => {
            state.dateRange = [dayjs(), dayjs()];
            state.task = [];
            state.ffLevel = [user?.projectAccess?.[0] || 'CM'];
            state.ffCode = '';
            state.ffName = '';
            state.errorReason = '';
            state.callType = [];
            state.channel = '';
            state.posmId = '';
            state.outletType = [];
            state.outletCode = '';
            state.outletStatusByAi = '';
            state.outletStatusByMs = '';
            state.executionDone = '';
            state.aiRun = '';
            state.fatType = '';
            state.shelfTalkerType = '';
            state.posmCode = '';
            state.posmName = '';
            state.displayStatus = '';
            state.qpdsStatus = '';
            state.displayChallengeStatus = '';
            state.shelfTalkerChallengeStatus = '';
            state.auditStatus = '';
            state.hangerPresence = '';
            state.ublSachetPresenceHigh = '';
            state.ublSOSHigh = '';
            state.shelvingNormMaintained = '';
            state.ublSOVMHigh = '';
            state.shelfTalkerQuality = '';
            state.variantComplianceMet = '';
            state.overallComplianceMet = '';
            state.displayRemarks = '';
            state.planogramAdherence = '';
            state.exclusivity = '';
            state.hotspot = '';
            state.challengedBySupervisor = '';
            state.requestForChallenge = '';
            state.shelfTalkerExist = '';
            state.displayType = [];
        },
    },
});

export default visitCallFilterSlice.reducer;
export const {
    setPosmId,
    setTask,
    setCallType,
    setExecutionDone,
    setDateRange,
    setChannel,
    setErrorReason,
    setFFCode,
    setFFLevel,
    setFFName,
    setOutletCode,
    setOutletStatusByAi,
    setOutletStatusByMs,
    setOutletType,
    setAiRun,
    setFatType,
    setShelfTalkerType,
    setPosmCode,
    setPosmName,
    setDisplayStatus,
    setQpdsStatus,
    setDisplayChallengeStatus,
    setShelfTalkerChallengeStatus,
    setAuditStatus,
    resetVisitCallFilter,
    setHangerPresence,
    setUblSachetPresenceHigh,
    setUblSOSHigh,
    setShelvingNormMaintained,
    setUblSOVMHigh,
    setShelfTalkerQuality,
    setVariantComplianceMet,
    setOverallComplianceMet,
    setDisplayRemarks,
    setPlanogramAdherence,
    setExclusivity,
    setHotspot,
    setChallengedBySupervisor,
    setRequestForChallenge,
    setShelfTalkerExist,
    setDisplayType,
} = visitCallFilterSlice.actions;
