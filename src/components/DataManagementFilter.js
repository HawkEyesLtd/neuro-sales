/* eslint-disable react-hooks/exhaustive-deps */

import FilterSkeleton from '@components/ui/FilterSkeleton';
import { useGetDataManagementMutation } from '@redux/features/dataManagement/dataManagementApi';
import {
    setArea,
    setCircle,
    setRegion,
    setTerritory,
    setTown,
} from '@redux/features/filter/dataManagementFilterSlice';
import { Col } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function DataManagementFilter({ selectAllDisable }) {
    const dispatch = useDispatch();
    const { circle, region, area, territory, town } = useSelector(
        (state) => state.dataManagement || {}
    );
    const { reFetchFilter } = useSelector((state) => state.globalLoading || {});

    const location = useLocation();

    // get data
    const [getDataManagement, { data: fData }] = useGetDataManagementMutation();

    // filter disable
    const [disableFilter, setDisableFilter] = useState(false);

    // filter main data
    const [filterData, setFilterData] = useState({});

    const [action, setAction] = useState(false);

    // change filter value
    const handleSelect = (selectedList, eventName) => {
        if (eventName === 'circleList') {
            setAction((prev) => !prev);
            dispatch(setCircle(selectedList));
            dispatch(setRegion([]));
            dispatch(setArea([]));
            dispatch(setTerritory([]));
            dispatch(setTown([]));
        }
        if (eventName === 'regionList') {
            setAction((prev) => !prev);
            dispatch(setRegion(selectedList));
            dispatch(setArea([]));
            dispatch(setTerritory([]));
            dispatch(setTown([]));
        }
        if (eventName === 'areaList') {
            setAction((prev) => !prev);
            dispatch(setArea(selectedList));
            dispatch(setTerritory([]));
            dispatch(setTown([]));
        }
        if (eventName === 'territoryList') {
            setAction((prev) => !prev);
            dispatch(setTerritory(selectedList));
            dispatch(setTown([]));
        }
        if (eventName === 'townList') dispatch(setTown(selectedList));
    };

    // filter data normalize and performance boost
    const data = useMemo(() => {
        const filterValues = [circle, region, area, territory, town];
        const filterKeys = ['circleId', 'regionId', 'areaId', 'territoryId', 'townId'];

        const object = filterValues.reduce((prev, current, index) => {
            // Ensure current is an array and has elements
            if (Array.isArray(current) && current.length > 0) {
                const values = current.map((o) => o?.value).filter(Boolean);
                if (values.length > 0) {
                    return { ...prev, [filterKeys[index]]: values };
                }
            }
            return prev;
        }, {});

        return object;
    }, [circle, region, area, territory, town]);

    // load filter data
    useEffect(() => {
        setDisableFilter(true);
        getDataManagement(data);
    }, [action, reFetchFilter]);

    useEffect(() => {
        if (fData?.data && typeof fData.data === 'object') {
            setFilterData((prevData) => ({ ...prevData, ...fData.data }));
            setDisableFilter(false);
        }
    }, [fData]);

    // Check if filterData has any list properties with data
    const hasFilterData =
        filterData &&
        Object.keys(filterData).some(
            (key) => Array.isArray(filterData[key]) && filterData[key].length > 0
        );

    if (!hasFilterData) {
        return <FilterSkeleton />;
    }

    // render multiselect component
    const renderMultiselectComponent = (label, filterName, value) => {
        const optionsKey = `${filterName}List`;
        const options = Array.isArray(filterData?.[optionsKey]) ? filterData[optionsKey] : [];
        const safeValue = Array.isArray(value) ? value : [];

        return (
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <MultiSelect
                    labelledBy={label}
                    hasSelectAll={!selectAllDisable || filterName !== 'town'}
                    options={options}
                    value={safeValue}
                    onChange={(selectedList) => handleSelect(selectedList, optionsKey)}
                    className="multiselect-input"
                    disabled={disableFilter}
                    overrideStrings={{
                        allItemsAreSelected: 'All',
                        selectSomeItems: label,
                    }}
                />
            </Col>
        );
    };

    return (
        <>
            {/* {renderMultiselectComponent('Market Operation', 'circle', circle)} */}
            {renderMultiselectComponent('Select Region', 'region', region)}
            {renderMultiselectComponent('Select Area', 'area', area)}
            {renderMultiselectComponent('Select Territory', 'territory', territory)}
            {location.pathname !== '/national-level' &&
            location.pathname !== '/wholesale-dashboard' &&
            location.pathname !== '/wholesale-download-report'
                ? renderMultiselectComponent('Select Town', 'town', town)
                : null}
        </>
    );
}

export default DataManagementFilter;
