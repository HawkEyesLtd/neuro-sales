import HelmetHeader from '@components/HelmetHeader';
import useDownloadReport from '@hooks/useDownloadReport';
import { useGetAttendanceDataMutation } from '@redux/features/attendance/attendanceApi';
import { resetAttendanceFilter } from '@redux/features/attendance/attendanceFilterSlice';
import { resetDataManagementFilter } from '@redux/features/filter/dataManagementFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '@redux/features/loaderSlice';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '@/components/Filter';

import AttendanceLocator from './AttendanceLocator';
import AttendanceOverview from './AttendanceOverview';
import AttendanceTracker from './AttendanceTracker';

function getAttendanceBodyData(filterState, dataManagementState) {
    const bodyData = {};

    // Add data management filter data
    if (dataManagementState.region?.length) {
        bodyData.regionId = dataManagementState.region.map((r) => r._id || r);
    }
    if (dataManagementState.area?.length) {
        bodyData.areaId = dataManagementState.area.map((a) => a._id || a);
    }
    if (dataManagementState.territory?.length) {
        bodyData.territoryId = dataManagementState.territory.map((t) => t._id || t);
    }
    if (dataManagementState.town?.length) {
        bodyData.townId = dataManagementState.town.map((t) => t._id || t);
    }

    // Add date - ensure proper format
    if (filterState.date) {
        bodyData.date = dayjs(filterState.date).format('DD-MM-YYYY');
    } else {
        bodyData.date = dayjs().format('DD-MM-YYYY');
    }

    // Add employee level as array
    if (filterState.level) {
        bodyData.employeeLevel = Array.isArray(filterState.level)
            ? filterState.level
            : [filterState.level];
    }

    // Add optional filters
    if (filterState.employeeCode) {
        bodyData.employeeCode = filterState.employeeCode;
    }
    if (filterState.employeeId) {
        bodyData.employeeId = filterState.employeeId;
    }
    if (filterState.townCode) {
        bodyData.townCode = filterState.townCode;
    }
    if (filterState.locationMatch) {
        bodyData.isLocationMatched = filterState.locationMatch;
    }
    if (filterState.lateAttendance) {
        bodyData.lateAttendance = filterState.lateAttendance;
    }
    if (filterState.facialError) {
        bodyData.facialError = filterState.facialError;
    }

    return bodyData;
}

export default function AttendancePage() {
    const [infoWindowState, setInfoWindowState] = useState({
        visible: false,
        lat: null,
        lng: null,
        name: '',
        imageURL: '',
        time: '',
        kind: '',
        usercode: '',
    });
    const dispatch = useDispatch();

    // Get filter states
    const dataManagementState = useSelector((state) => state.dataManagement ?? {});
    const attendanceFilterState = useSelector((state) => state.attendanceFilter ?? {});
    const { reFetchFilter } = useSelector((state) => state.globalLoading ?? {});

    const [getAttendanceData, { data, isLoading }] = useGetAttendanceDataMutation();
    const { download, isDownloading } = useDownloadReport();

    const filterData = () => {
        const bodyData = getAttendanceBodyData(attendanceFilterState, dataManagementState);
        getAttendanceData(bodyData);
    };

    useEffect(() => {
        // Initial load with proper body data
        const bodyData = getAttendanceBodyData(attendanceFilterState, dataManagementState);
        getAttendanceData(bodyData);
    }, [getAttendanceData, attendanceFilterState, dataManagementState]);

    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetAttendanceFilter());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    function getDownloadBodyData({ dArr }) {
        const bodyData = {
            index: 0,
        };
        if (dArr) {
            bodyData.startDate = dayjs(dArr).startOf('day');
            bodyData.endDate = dayjs(dArr).endOf('day');
        }
        return bodyData;
    }

    const handleDownload = async () => {
        const downloadBodyData = getAttendanceBodyData(attendanceFilterState, dataManagementState);
        const dateBodyData = getDownloadBodyData({ dArr: attendanceFilterState.date });

        download({
            url: '/v1/report/attendance',
            fileName: 'Attendance Report.xlsx',
            body: {
                ...downloadBodyData,
                ...dateBodyData,
            },
        });
    };

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Attendance" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={handleDownload}
                    isDownloading={isDownloading}
                    loading={isLoading}
                    queryFunc={filterData}
                    pathname="/attendance"
                />
            </div>
            <div className="attendance-overview-container">
                <AttendanceOverview data={data?.data?.meta || []} />
            </div>
            <Row gutter={[5, 10]} style={{ paddingBottom: '10px' }}>
                <Col lg={12}>
                    <AttendanceTracker
                        data={data?.data}
                        isLoading={isLoading}
                        setInfoWindowState={setInfoWindowState}
                    />
                </Col>
                <Col lg={12}>
                    <AttendanceLocator
                        data={data?.data?.presentList}
                        infoWindowState={infoWindowState}
                        setInfoWindowState={setInfoWindowState}
                    />
                </Col>
            </Row>
        </>
    );
}
