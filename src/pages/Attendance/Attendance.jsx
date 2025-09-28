import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '@/components/Filter';
import HelmetHeader from '@/components/HelmetHeader';
import useDownloadReport from '@/hooks/useDownloadReport';
import { useGetAttendanceDataMutation } from '@/redux/features/attendance/attendanceApi';
import { resetAttendanceFilter } from '@/redux/features/attendance/attendanceFilterSlice';
import { resetDataManagementFilter } from '@/redux/features/filter/dataManagementFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '@/redux/features/loaderSlice';
import getDataManagementFilterData from '@/utils/generateDataManagementFilterData';

import AttendanceLocator from './components/AttendanceLocator';
import AttendanceSummaryCards from './components/AttendanceSummaryCards';
import AttendanceTracker from './components/AttendanceTracker';

function getBodyData(
    dateStr,
    empCode,
    lev,
    townCode,
    locationmatch,
    lAttendance,
    empId,
    facialError
) {
    const bodyData = {};
    bodyData.date = dayjs(dateStr || new Date()).format('DD-MM-YYYY');
    if (empCode) {
        bodyData.employeeCode = empCode;
    }
    if (lev) {
        bodyData.employeeLevel = lev;
    }
    if (townCode) {
        bodyData.townCode = townCode;
    }
    if (locationmatch) {
        bodyData.isLocationMatched = locationmatch;
    }
    if (lAttendance) {
        bodyData.lateAttendance = lAttendance;
    }
    if (empId) {
        bodyData.employeeId = empId;
    }
    if (facialError) {
        bodyData.facialError = facialError;
    }
    return bodyData;
}

function Attendance() {
    const [infoWindowState, setInfoWindowState] = useState({
        visible: false,
        lat: null,
        lng: null,
        name: '',
        // imageURL: '',
        time: '',
        kind: '',
        usercode: '',
    });
    const dispatch = useDispatch();
    const { region, area, territory, town } = useSelector((state) => state.dataManagement ?? {});
    const {
        date,
        employeeCode,
        level,
        townCode,
        locationMatch,
        lateAttendance,
        employeeId,
        facialError,
    } = useSelector((state) => state.attendanceFilter ?? {});
    const [getAttendanceData, { data, isLoading }] = useGetAttendanceDataMutation();

    const { download, isDownloading } = useDownloadReport();

    const { reFetchFilter } = useSelector((state) => state.globalLoading ?? {});

    const filterData = () => {
        getAttendanceData({
            ...getDataManagementFilterData({ region, area, territory, town }),
            ...getBodyData(
                date,
                employeeCode,
                level,
                townCode,
                locationMatch,
                lateAttendance,
                employeeId,
                facialError
            ),
        });
    };

    useEffect(() => {
        getAttendanceData();
    }, [getAttendanceData]);
    ``;

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
        download({
            url: '/v1/report/attendance',
            fileName: 'Attendance Report.xlsx',
            body: {
                ...getDataManagementFilterData({ region, area, territory, town }),
                ...getDownloadBodyData({ dArr: date }),
                ...getBodyData(date, employeeCode, level, townCode, locationMatch, lateAttendance),
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
            <AttendanceSummaryCards data={data?.data?.meta || []} />
            <Row gutter={[5, 10]} style={{ paddingBottom: '10px' }}>
                <Col lg={12}>
                    <AttendanceTracker
                        data={data?.data?.list}
                        isLoading={isLoading}
                        setInfoWindowState={setInfoWindowState}
                    />
                </Col>
                <Col lg={12}>
                    <AttendanceLocator
                        data={data?.data?.absentList || []}
                        infoWindowState={infoWindowState}
                        setInfoWindowState={setInfoWindowState}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Attendance;
