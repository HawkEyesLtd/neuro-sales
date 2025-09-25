import { Button, Input, Pagination, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HelmetHeader from '../../components/HelmetHeader';
import {
    useAddInsightMutation,
    useGetTerritoryAverageDataMutation,
    useGetTerritoryLevelDataQuery,
} from '../../redux/features/dffWholesale/dffWholesaleApi';
import { setGlobalLoading } from '../../redux/features/loaderSlice';

import OutletSummaryItem from './OutletSummaryItem';

const { Column, ColumnGroup } = Table;
export default function TerritoryLevel() {
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { category, company, outletCode } = useSelector((state) => state.dffNationalLevelFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // get territory level data
    const [getTerritoryAverageData, { data: territoryAverageData, isLoading: territoryLoading }] =
        useGetTerritoryAverageDataMutation();

    useEffect(() => {
        getTerritoryAverageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        data: territoryLevelData,
        isLoading,
        refetch,
    } = useGetTerritoryLevelDataQuery({
        limit: totalShowPage,
        page: currentPage,
    });

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // pagination change event
    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        refetch({ page: pageNumber, limit: totalPageChange });
    };

    const tableColumns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ['ascend'],
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
                    title: territoryAverageData?.data?.date?.previous,
                    dataIndex: 'previousStockQty',
                    key: 'previousStockQty',
                    render: (v) => (
                        <span style={{ fontSize: '12px' }}>{v ? v.toFixed(2) : ''}</span>
                    ),
                },
                {
                    title: territoryAverageData?.data?.date?.current,
                    dataIndex: 'currentStockQty',
                    key: 'currentStockQty',
                    render: (v) => (
                        <span style={{ fontSize: '12px' }}>{v ? v.toFixed(2) : ''}</span>
                    ),
                },
            ],
        },
        {
            title: 'Offtake',
            children: [
                {
                    title: territoryAverageData?.data?.date?.previous,
                    dataIndex: 'previousOfftakeQty',
                    key: 'previousOfftakeQty',
                    render: (v) => (
                        <span style={{ fontSize: '12px' }}>{v ? v.toFixed(2) : ''}</span>
                    ),
                },
                {
                    title: territoryAverageData?.data?.date?.current,
                    dataIndex: 'currentOfftakeQty',
                    key: 'currentOfftakeQty',
                    render: (v) => (
                        <span style={{ fontSize: '12px' }}>{v ? v.toFixed(2) : ''}</span>
                    ),
                },
            ],
        },
    ];

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);

    function monthCompareWithYear(month, year, length) {}

    const [addInsight, { isLoading: insightsLoading }] = useAddInsightMutation();

    const [inputValue, setInputValue] = useState('');

    const onFinish = async (values) => {
        if (inputValue) {
            try {
                const res = await addInsight({
                    text: inputValue,
                }).unwrap();
                message.success(res.message);
                setInputValue('');
            } catch (error) {
                message.error(error.data.message);
            }
        } else {
            message.error('Please enter a valid insight');
        }
    };

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="DFF Wholesale || Territory Level Data" />

            {/* <div style={{ margin: '16px 0' }}>
                <Filter loading={isLoading} queryFunc={searchFunc} pathname="/territory-level" />
            </div> */}

            <div
                style={{
                    borderRadius: '10px',
                    margin: '16px 0 0 0',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    gap: '20px',
                    alignItems: 'center',
                }}
            >
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    size="large"
                    style={{ height: '130px' }}
                    placeholder="Input your insight here. TM can submit three insights in a month."
                />
                <Button onClick={onFinish} size="large" type="primary" htmlType="submit">
                    Submit
                </Button>
            </div>

            <div style={{ borderRadius: '10px', margin: '16px 0' }}>
                <div className="box-heading">Outlet Summary</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    {territoryLevelData?.data?.map((x) => (
                        <OutletSummaryItem data={x} />
                    ))}
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
                        total={territoryLevelData?.meta?.total}
                        onChange={onChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Territory Average</div>

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
                        dataSource={territoryAverageData?.data?.data?.map((x) => ({
                            ...x,
                        }))}
                    />
                </div>
            </div>
        </>
    );
}
