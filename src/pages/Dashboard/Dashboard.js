/* eslint-disable react-hooks/exhaustive-deps */

// import Filter from '@/components/Filter';
import { Row, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '@/components/Filter';
import HelmetHeader from '@/components/HelmetHeader';
import { useGetDashboardDataMutation } from '@/redux/features/dashboard/dashboardApi';
import { setReFetchFilter } from '@/redux/features/loaderSlice';

function Dashboard() {
    // dispatch
    const dispatch = useDispatch();

    // const { reFetchFilter } = useSelector((state) => state.globalLoading);
    // reset existing filter

    const { reFetchFilter } = useSelector((state) => state.loader || {});
    // const reFetchFilter = false;
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        // dispatch(resetDataManagementFilter());
    }, []);

    // data management filter data
    // const { region, area, territory, town } = useSelector((state) => state.dataManagement);

    // dashboard filter data
    const { dateRange, projectType } = useSelector((state) => state.dashboardFilter);

    // api hook
    const [getDashboardData, { data, isLoading, isError, error }] = useGetDashboardDataMutation();

    // initial state load data
    useEffect(() => {
        async function fetchData() {
            try {
                getDashboardData();
            } catch (err) {
                message.error(err.message);
            } finally {
                // do something
            }
        }
        fetchData();
    }, []);

    //  query data
    function getBodyData({ d, pType }) {
        const bodyData = {};

        if (d.length) {
            const [s, e] = d;
            bodyData.from = s;
            bodyData.to = e;
        }
        if (pType) {
            bodyData.employeeLevel = pType;
        }
        return bodyData;
    }

    const fetchDashboardData = async () => {
        try {
            getDashboardData({
                // ...getBodyData({ d: dateRange, pType: projectType }),
                // ...getDataManagementFilterData({ circle, region, area, territory, town }),
            });
        } catch (err) {
            message.error(err.message);
        } finally {
            // do something
        }
    };

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Dashboard" />

            <div
                style={{
                    margin: '16px 0',
                    padding: '2px 0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 9999999999,
                    background: '#F5F5F5',
                }}
            >
                <Filter loading={isLoading} queryFunc={fetchDashboardData} pathname="/" />
            </div>

            <Row gutter={[5, 15]}>
                {/* <Col xs={24} sm={12} md={8} lg={8}>
                    <PjpOutletCoverage
                        loading={isLoading}
                        pjpOutletCoverage={data?.data?.pjpOutletCoverage || []}
                    />
                </Col>

                <Col xs={24} sm={12} md={10} lg={10}>
                    <AttendanceBar loading={isLoading} attendance={data?.data?.attendance || {}} />
                </Col>

                <Col xs={24} sm={12} md={6} lg={6}>
                    <StrikeRate loading={isLoading} strikeRate={data?.data?.strike_rate || 0} />
                </Col> */}

                {/* <Col xs={24} sm={12}  md={6} lg={6}>
              <Eco loading={isLoading} eco={data?.data?.eco} />
            </Col> */}
            </Row>

            {/* {data?.data?.attendance_line_chart?.labels?.length > 1 ? (
                <Row style={{ marginTop: '20px' }} gutter={[5, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <AttendanceByDate
                            loading={isLoading}
                            attendanceData={data?.data?.attendance_line_chart || {}}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <StrikeRateByDate
                            strikeRateData={data?.data?.strike_rate_line_chart || {}}
                        />
                    </Col>
                </Row>
            ) : null} */}

            {/* Program Wise Compliance */}
            <Row style={{ marginTop: '20px' }} gutter={[5, 15]}>
                {/* <Col  xs={24} sm={24}  md={12} lg={12}>
            <DisplayWiseOutletResult displayData={data?.data?.displayWiseResult || []} />
            </Col> */}

                {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <OutletWiseCompliance
                        nationalOutletWiseCompliance={
                            data?.data?.national_outlet_wise_compliance || []
                        }
                        outletWiseCompliance={data?.data?.outlet_wise_compliance || []}
                    />
                </Col> */}
            </Row>

            <Row style={{ marginTop: '20px', marginBottom: '20px' }} gutter={[5, 15]}>
                {/* Visibility Tracker */}
                {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <VisitCall
                        totalVisitCall={data?.data?.total_visit_call || 0}
                        visitCallData={data?.data?.visitCall || []}
                    />
                </Col> */}
                {/* Share of shelf */}
                {/* <Col xs={24} sm={24} md={24} lg={24}>
                    <Sos
                        totalSosVisit={data?.data?.total_sos_visit_call || 0}
                        sosData={data?.data?.sos || []}
                    />
                </Col> */}
            </Row>

            {/* {data?.data?.mtsos.totalCount ? (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <MtSos
                            mtSosData={data?.data?.mtsos?.categoryWise || []}
                            overAll={data?.data?.mtsos?.overAll}
                            totalCount={data?.data?.mtsos?.totalCount}
                        />
                    </Col>
                </Row>
            ) : null} */}
            {/*
            <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <ShareOfSachetChart data={data?.data?.sachetResult} />
                </Col>
            </Row>

            <Row style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <ShareOfVisibility data={data?.data?.sovmResult} />
                </Col>
            </Row>

            <Row style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <PosmUsages posmUsage={data?.data?.posmUsage || []} />
                </Col>
            </Row> */}
        </>
    );
}

export default Dashboard;
