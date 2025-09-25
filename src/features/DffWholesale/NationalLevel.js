import { Pagination, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { useGetNationalLevelDataMutation } from '../../redux/features/dffWholesale/dffWholesaleApi';
import { setGlobalLoading } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

const { Column, ColumnGroup } = Table;

export default function NationalLevel() {
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { category, company, outletCode } = useSelector((state) => state.dffNationalLevelFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // get and search data hook
    const [getNationalLevelData, { data: nationalLevelData, isLoading }] =
        useGetNationalLevelDataMutation();

    useEffect(() => {
        getNationalLevelData({ page: currentPage, limit: totalShowPage });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getNationalLevelData]);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // body data
    function getBodyData(ctg, comp, oCode) {
        const bodyData = {};

        if (ctg) {
            bodyData.category = ctg;
        }
        if (comp) {
            bodyData.company = comp;
        }
        if (oCode) {
            bodyData.outletcode = oCode;
        }
        return bodyData;
    }

    const searchFunc = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }
        getNationalLevelData({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getBodyData(category, company, outletCode),
            page,
            limit: totalShow,
        });
    };

    // pagination change event
    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        searchFunc(pageNumber, totalPageChange);
    };

    function getCurrentAndPreviousMonthNamesWithYear() {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

        const currentMonthName = `${months[currentMonthIndex]}'${currentDate.getFullYear().toString().slice(-2)}`;
        const previousMonthName = `${months[previousMonthIndex]}'${(currentDate.getMonth() === 0
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear()
        )
            .toString()
            .slice(-2)}`;

        return { currentMonth: currentMonthName, previousMonth: previousMonthName };
    }

    // Example usage
    const { currentMonth, previousMonth } = getCurrentAndPreviousMonthNamesWithYear();

    const tableColumns = [
        {
            title: 'Outlet Code',
            dataIndex: 'outletCode',
            key: 'outletCode',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Outlet Name',
            dataIndex: 'outletName',
            key: 'outletName',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'SKU Name',
            dataIndex: 'name',
            key: 'name',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Stock',
            children: [
                {
                    title: nationalLevelData?.data?.date?.previous,
                    dataIndex: 'previousStockQty',
                    key: 'previousStockQty',
                    render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
                },
                {
                    title: nationalLevelData?.data?.date?.current,
                    dataIndex: 'currentStockQty',
                    key: 'currentStockQty',
                    render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
                },
            ],
        },
        {
            title: 'Offtake',
            children: [
                {
                    title: nationalLevelData?.data?.date?.previous,
                    dataIndex: 'previousOfftakeQty',
                    key: 'previousOfftakeQty',
                    render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
                },
                {
                    title: nationalLevelData?.data?.date?.current,
                    dataIndex: 'currentOfftakeQty',
                    key: 'currentOfftakeQty',
                    render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
                },
            ],
        },
    ];

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);

    // download report function start
    // check json
    function checkJSON(doc) {
        return doc?.headers.get('Content-Type').includes('json');
    }

    async function downLoadingFile(doc) {
        const excName = doc?.headers.get('Content-Disposition').split('"')[1] || 'report.xlsx';
        const fResult = await doc.arrayBuffer();
        const blob = new Blob([fResult]);

        const urla = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urla;
        link.setAttribute('download', `${excName}`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
    }

    // download link function
    const download = async ({ url, fileName }) => {
        try {
            dispatch(setGlobalLoading(true));
            for (let index = -1; ; ) {
                const [result1, result2, result3] = await Promise.all([
                    fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({
                            ...getDataManagementFilterData({
                                circle,
                                region,
                                area,
                                territory,
                                town,
                            }),
                            // ...getDhHistoryFilterData(dateRange, '', ffName, posmName),
                            index: ++index,
                        }),
                        mode: 'cors',
                    }),
                    fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({
                            ...getDataManagementFilterData({
                                circle,
                                region,
                                area,
                                territory,
                                town,
                            }),
                            // ...getDhHistoryFilterData(dateRange, '', ffName, posmName),
                            index: ++index,
                        }),
                        mode: 'cors',
                    }),
                    fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({
                            ...getDataManagementFilterData({
                                circle,
                                region,
                                area,
                                territory,
                                town,
                            }),
                            // ...getDhHistoryFilterData(dateRange, '', ffName, posmName),
                            index: ++index,
                        }),
                        mode: 'cors',
                    }),
                ]);
                const typeJSON1 = checkJSON(result1);
                const typeJSON2 = checkJSON(result2);
                const typeJSON3 = checkJSON(result3);

                const arr = [];

                if (!typeJSON1) arr.push(downLoadingFile(result1));
                if (!typeJSON2) arr.push(downLoadingFile(result2));
                if (!typeJSON3) arr.push(downLoadingFile(result3));

                await Promise.all(arr);

                if (typeJSON1 || typeJSON2 || typeJSON3) break;
            }
        } catch (error) {
            message.error('Something went wrong');
        } finally {
            dispatch(setGlobalLoading(false));
        }
    };
    // download report function end

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="DFF Wholesale || National Level Data" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={searchFunc}
                    pathname="/national-level"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Wholesale Report</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        pagination={false}
                        rowKey="username"
                        size="small"
                        columns={tableColumns}
                        scroll={{
                            x: 800,
                        }}
                        loading={isLoading}
                        dataSource={nationalLevelData?.data?.data?.map((x) => ({
                            ...x.stockKeepingUnit,
                            outletName: x.outlet.name,
                            outletCode: x.outlet.outletcode,
                        }))}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '10px',
                    }}
                >
                    <Pagination
                        size="large"
                        pageSize={totalShowPage}
                        showSizeChanger
                        showQuickJumper
                        current={currentPage}
                        defaultCurrent={1}
                        total={nationalLevelData?.meta?.total}
                        onChange={onChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            </div>
        </>
    );
}
