// generated request body data
const getInventoryQueryData = ({
    circle,
    region,
    area,
    territory,
    town,
    dateRange,
    uddoktaCode,
    tmsCode,
    tmrId,
    errorReason,
    callType,
    isQrCodeScanned,
    isAiReady,
    tmrCode,
}) => {
    const bodyData = {};
    if (circle.length) {
        bodyData.circleId = circle.map((item) => item.value);
    }
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
    if (uddoktaCode) {
        bodyData.uddoktaCode = uddoktaCode;
    }
    if (tmsCode) {
        bodyData.tmsCode = tmsCode;
    }
    if (tmrId) {
        bodyData.userId = tmrId;
    }
    if (errorReason) {
        if (errorReason === 'qrError') {
            bodyData.isQrCodeMatched = 'no';
        }
        if (errorReason === 'location') {
            bodyData.isLocationMatched = 'no';
        }
    }
    if (callType.length) {
        bodyData.callType = callType;
    }
    if (isQrCodeScanned) {
        bodyData.isQrCodeScanned = isQrCodeScanned;
    }
    if (isAiReady) {
        bodyData.isAiReady = isAiReady;
    }
    if (tmrCode) {
        bodyData.tmrCode = tmrCode;
    }
    return bodyData;
};

export default getInventoryQueryData;
