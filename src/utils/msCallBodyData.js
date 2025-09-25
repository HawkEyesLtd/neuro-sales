// generated request body data
const msCallBodyData = ({
    region,
    area,
    territory,
    town,
    dateRange,
    ffName,
    outletStatusByAi,
    outletStatusByMs,
    msId,
    aiSatisfactory,
    visitCallType,
    msCallType,
    outletCode,
    evaluationScore,
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
    if (ffName) {
        bodyData.userId = ffName;
    }
    if (msId) {
        bodyData.msId = msId;
    }
    if (aiSatisfactory) {
        bodyData.aiSatisfactory = aiSatisfactory;
    }
    if (outletStatusByAi) {
        bodyData.aiStatus = outletStatusByAi;
    }
    if (outletStatusByMs) {
        bodyData.msStatus = outletStatusByMs;
    }
    if (msCallType) {
        bodyData.callType = msCallType;
    }
    if (visitCallType) {
        bodyData.visitCallType = visitCallType;
    }
    if (outletCode) {
        bodyData.outletCode = outletCode;
    }
    if (evaluationScore) {
        const [scoreFrom, scoreTo] = evaluationScore.split('-');
        bodyData.scoreFrom = parseInt(scoreFrom, 10) || 0;
        bodyData.scoreTo = parseInt(scoreTo, 10) || 0;
    }
    return bodyData;
};

export default msCallBodyData;
