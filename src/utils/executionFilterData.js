// generated request body data
const getExecutionFilterData = ({
    region,
    area,
    territory,
    town,
    dateRange,
    task,
    ffLevel,
    ffCode,
    ffName,
    errorReason,
    callType,
    channel,
    posmId,
    outletType,
    outletCode,
    outletStatusByAi,
    outletStatusByMs,
    executionDone,
    aiRun,
    fatType,
    shelfTalkerType,
    posmName,
    posmCode,
    displayChallengeStatus,
    shelfTalkerChallengeStatus,
    displayStatus,
    qpdsStatus,
    auditStatus,
    hotspot,
    exclusivity,
    planogramAdherence,
    displayRemarks,
    overallComplianceMet,
    variantComplianceMet,
    shelfTalkerQuality,
    ublSOVMHigh,
    shelvingNormMaintained,
    ublSOSHigh,
    ublSachetPresenceHigh,
    hangerPresence,
    challengedBySupervisor,
    requestForChallenge,
    shelfTalkerExist,
    displayType,
}) => {
    const bodyData = {};
    if (region.length) {
        bodyData.regionId = region.map((item) => item.value);
    }
    if (area.length) {
        bodyData.areaId = area.map((item) => item.value);
    }
    if (territory.length) {
        bodyData.territoryId = territory.map((item) => item.value);
    }
    if (town.length) {
        bodyData.townId = town.map((item) => item.value);
    }
    if (dateRange.length) {
        const [fromDate, toDate] = dateRange;
        bodyData.fromDate = fromDate;
        bodyData.toDate = toDate;
    }
    if (task?.length) {
        bodyData.task = task;
    }
    if (ffLevel) {
        bodyData.ffLevel = ffLevel;
    }
    if (ffName) {
        bodyData.userId = ffName;
    }
    if (ffCode) {
        bodyData.userCode = ffCode;
    }
    if (outletStatusByAi) {
        bodyData.aiStatus = outletStatusByAi;
    }
    if (outletStatusByMs) {
        bodyData.msStatus = outletStatusByMs;
    }
    if (outletCode) {
        bodyData.outletCode = outletCode;
    }
    if (executionDone) {
        bodyData.executionDone = executionDone;
    }
    if (channel) {
        bodyData.channel = channel;
    }
    if (outletType?.length) {
        bodyData.outletType = outletType;
    }
    if (callType?.length) {
        bodyData.callType = callType;
    }
    if (aiRun) {
        bodyData.isAiReady = aiRun;
    }
    if (shelfTalkerType) {
        bodyData.shelfTalkerType = shelfTalkerType;
    }
    if (fatType) {
        bodyData.fatAssetType = fatType;
    }
    if (posmName) {
        bodyData.materialName = posmName;
    }
    if (posmCode) {
        bodyData.materialCode = posmCode;
    }
    if (displayStatus) {
        bodyData.displayStatus = displayStatus;
    }
    if (qpdsStatus) {
        bodyData.qpdsStatus = qpdsStatus;
    }
    if (displayChallengeStatus) {
        bodyData.displayChallengeStatus = displayChallengeStatus;
    }
    if (shelfTalkerChallengeStatus) {
        bodyData.shelfTalkerChallengeStatus = shelfTalkerChallengeStatus;
    }
    if (auditStatus) {
        bodyData.auditStatus = auditStatus;
    }
    if (hotspot) {
        bodyData.hotspot = hotspot;
    }
    if (exclusivity) {
        bodyData.exclusivity = exclusivity;
    }
    if (planogramAdherence) {
        bodyData.planogramAdherence = planogramAdherence;
    }
    if (displayRemarks) {
        bodyData.displayRemarks = displayRemarks;
    }
    if (overallComplianceMet) {
        bodyData.overallComplianceMet = overallComplianceMet;
    }
    if (variantComplianceMet) {
        bodyData.variantComplianceMet = variantComplianceMet;
    }
    if (shelfTalkerQuality) {
        bodyData.shelfTalkerQuality = shelfTalkerQuality;
    }
    if (ublSOVMHigh) {
        bodyData.ublSOVMHigh = ublSOVMHigh;
    }
    if (shelvingNormMaintained) {
        bodyData.shelvingNormMaintained = shelvingNormMaintained;
    }
    if (ublSOSHigh) {
        bodyData.ublSOSHigh = ublSOSHigh;
    }
    if (ublSachetPresenceHigh) {
        bodyData.ublSachetPresenceHigh = ublSachetPresenceHigh;
    }
    if (hangerPresence) {
        bodyData.hangerPresence = hangerPresence;
    }
    // TODO: add real database keyname
    if (requestForChallenge) {
        bodyData.requestForChallenge = requestForChallenge;
    }
    if (challengedBySupervisor) {
        bodyData.challengedBySupervisor = challengedBySupervisor;
    }
    if (shelfTalkerExist) {
        bodyData.shelfTalkerExist = shelfTalkerExist;
    }
    if (displayType?.length) {
        bodyData.displayType = displayType;
    }
    return bodyData;
};

export default getExecutionFilterData;
