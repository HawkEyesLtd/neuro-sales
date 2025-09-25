// generated request body data
const generateDataManagementSalaryFilter = ({ region, area, territory, town }) => {
    const bodyData = {};
    if (region.length) {
        bodyData.selectedRegions = region.map((item) => item.value);
    }
    if (area.length) {
        bodyData.selectedAreas = area.map((item) => item.value);
    }
    if (territory.length) {
        bodyData.selectedTerritories = territory.map((item) => item.value);
    }
    if (town.length) {
        bodyData.selectedTowns = town.map((item) => item.value);
    }
    return bodyData;
};

export default generateDataManagementSalaryFilter;
