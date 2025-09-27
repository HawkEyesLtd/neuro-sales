// generated request body data
const getDataManagementFilterData = ({ region, area, territory, town } = {}) => {
    const bodyData = {};
    // Safe array check and mapping
    if (Array.isArray(region) && region?.length > 0) {
        bodyData.regionId = region.map((item) => item?.value).filter(Boolean);
    }
    if (Array.isArray(area) && area?.length > 0) {
        bodyData.areaId = area.map((item) => item?.value).filter(Boolean);
    }
    if (Array.isArray(territory) && territory?.length > 0) {
        bodyData.territoryId = territory.map((item) => item?.value).filter(Boolean);
    }
    if (Array.isArray(town) && town?.length > 0) {
        bodyData.townId = town.map((item) => item?.value).filter(Boolean);
    }

    return bodyData;
};

export default getDataManagementFilterData;
