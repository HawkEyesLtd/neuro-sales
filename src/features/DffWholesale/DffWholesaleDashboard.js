import { Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetDffDashboardDataMutation } from '../../redux/features/dffWholesale/dffWholesaleApi';
import { setGlobalLoading } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

const { Column, ColumnGroup } = Table;

export default function DffWholesaleDashboard() {
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { category, company, month } = useSelector((state) => state.dffDashboardFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    // pagination
    const [totalShowPage, _setTotalPageShow] = useState(10);
    const [currentPage, _setCurrentPageShow] = useState(1);

    const [getDffDashboardData, { data: dashboardData, isLoading: dashboardLoading }] =
        useGetDffDashboardDataMutation();

    useEffect(() => {
        getDffDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setGlobalLoading(dashboardLoading));
    }, [dispatch, dashboardLoading]);

    // body data
    function getBodyData(ctg, comp, m) {
        const bodyData = {};

        if (ctg) {
            bodyData.category = ctg;
        }
        if (comp) {
            bodyData.company = comp;
        }
        if (m) {
            bodyData.month = dayjs(m).format('YYYY-MM-DD');
        }
        return bodyData;
    }

    const searchFunc = () => {
        getDffDashboardData({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getBodyData(category, company, month),
        });
    };

    const tableColumns = [
        {
            title: 'Cluster',
            dataIndex: 'region',
            key: 'region',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Area',
            dataIndex: 'area',
            key: 'area',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Territory',
            dataIndex: 'territory',
            key: 'territory',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Town',
            dataIndex: 'town',
            key: 'town',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'DFF Submission % Stock & Offtake',
            dataIndex: 'stockOfftakePercent',
            key: 'stockOfftakePercent',
            render: (v) => <span style={{ fontSize: '12px' }}>{v.toFixed(2)}%</span>,
            align: 'center',
        },
        {
            title: 'S/TM Approval % Stock & Offtake',
            dataIndex: 'approvedPercent',
            key: 'approvedPercent',
            render: (v) => <span style={{ fontSize: '12px' }}>{v.toFixed(2)}%</span>,
            align: 'center',
        },
        {
            title: 'DFF Submission % Market Rate',
            dataIndex: 'marketRatePercent',
            key: 'marketRatePercent',
            render: (v) => <span style={{ fontSize: '12px' }}>{v.toFixed(2)}%</span>,
            align: 'center',
        },
    ];

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="DFF Wholesale || Dashboard" />

            {/* <div style={{ margin: '16px 0' }}>
                <Filter
                    loading={dashboardLoading || globalLoading}
                    queryFunc={searchFunc}
                    pathname="/dffDashboardFilter"
                />
            </div> */}

            {/* <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Summary</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Row style={{ marginTop: '20px' }} gutter={[5, 15]}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div>
                                <p
                                    style={{
                                        margin: '0 0 -15px 0',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#0050a4',
                                    }}
                                >
                                    Stock & Offtake
                                </p>
                                <ReactApexChart
                                    width={350}
                                    style={{ marginTop: '10px' }}
                                    options={
                                        {
                                            ...pieOptions,
                                            dataLabels,
                                            labels: ['Submitted', 'Pending'],
                                        } || {}
                                    }
                                    series={stockData || []}
                                    type="pie"
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <div>
                                <p
                                    style={{
                                        margin: '0 0 -15px 0',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#0050a4',
                                    }}
                                >
                                    TM Approval
                                </p>
                                <ReactApexChart
                                    width={350}
                                    style={{ marginTop: '10px' }}
                                    options={
                                        {
                                            ...pieOptions,
                                            dataLabels: dataLabels2,
                                            labels: ['Verified', 'Reassign', 'Pending'],
                                        } || {}
                                    }
                                    series={tmApprovalData || []}
                                    type="pie"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div> */}

            <div style={{ borderRadius: '10px' }}>
                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        pagination={false}
                        rowKey="username"
                        size="small"
                        columns={tableColumns}
                        scroll={{
                            x: 800,
                        }}
                        loading={dashboardLoading}
                        dataSource={dashboardData?.data?.map((x) => ({
                            ...x._id,
                            ...x,
                        }))}
                    />
                </div>
            </div>
        </>
    );
}
