import { Pagination } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { useGetDailyActivityReportMutation } from '../../redux/features/dailyActivityReport/dailyActivityApi';
import { resetDailyActivityFilter } from '../../redux/features/dailyActivityReport/dailyActivityReportFilter';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

import ReportTable from './ReportTable';

function DailyActivityReport() {
    const dispatch = useDispatch();
    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    const [getDailyActivityReport, { data, isLoading }] = useGetDailyActivityReportMutation();

    // filter hook
    const { date, attendance, assignedRoutes, dayend, level, dhCode, employeeCode } = useSelector(
        (state) => state.dailyActivityReportFilter
    );

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    useEffect(() => {
        getDailyActivityReport({
            date: dayjs(new Date()).toJSON(),
            page: currentPage,
            limit: totalShowPage,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // body data
    function getBodyData(d, attendanceM, aRoutes, dEnd, lev, dhcode, employeecode) {
        const bodyData = {};

        if (d) {
            bodyData.date = dayjs(d).toJSON();
        }
        if (!d) {
            bodyData.date = dayjs(new Date()).toJSON();
        }
        if (attendanceM) {
            bodyData.attendance = attendanceM;
        }
        if (aRoutes) {
            bodyData.assignedRoutes = aRoutes;
        }
        if (dEnd) {
            bodyData.dayend = dEnd;
        }
        if (lev) {
            bodyData.employeeLevel = lev;
        }
        if (dhcode) {
            bodyData.dhCode = dhcode;
        }
        if (employeecode) {
            bodyData.employeeCode = employeecode;
        }
        return bodyData;
    }

    const searchData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }
        getDailyActivityReport({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getBodyData(date, attendance, assignedRoutes, dayend, level, dhCode, employeeCode),
            page,
            limit: totalShow,
        });
    };

    // pagination change event
    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        searchData(pageNumber, totalPageChange);
    };

    const { reFetchFilter } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetDailyActivityFilter());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Daily Activity Report" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    loading={isLoading}
                    queryFunc={searchData}
                    pathname="/dailyActivityReport"
                />
            </div>

            <ReportTable loading={isLoading} data={data?.data} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 0',
                }}
            >
                <Pagination
                    size="large"
                    pageSize={totalShowPage}
                    showSizeChanger
                    showQuickJumper
                    current={currentPage}
                    defaultCurrent={1}
                    total={data?.meta.count}
                    onChange={onChange}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                />
            </div>
        </>
    );
}

export default DailyActivityReport;
