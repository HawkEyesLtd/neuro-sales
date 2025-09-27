// generated request body data
const getDataManagementFilterData = ({ region, area, territory, town }) => {
    const bodyData = {};
    if (region?.length) {
        bodyData.regionId = region.map((item) => item.value);
    }
    if (area?.length) {
        bodyData.areaId = area.map((item) => item.value);
    }
    if (territory?.length) {
        bodyData.territoryId = territory.map((item) => item.value);
    }
    if (town?.length) {
        bodyData.townId = town.map((item) => item.value);
    }
    return bodyData;
};

export default getDataManagementFilterData;
