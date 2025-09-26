import { Col, Pagination, Row } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '@/components/Filter';
import HelmetHeader from '@/components/HelmetHeader';
import { useGetTownSummaryMutation } from '@/redux/features/inventory/inventoryApiSlice';
import { setGlobalLoading } from '@/redux/features/loaderSlice';
import getDataManagementFilterData from '@/utils/generateDataManagementFilterData';

dayjs.extend(isToday);

export default function DHCCreditLifting() {
    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // dh history filter hook
    const { dateRange, posmId, posmName } = useSelector((state) => state.townSummaryFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const getDhHistoryFilterData = (dateArr, pId) => {
        const bodyData = {};

        if (dateArr[0] && dateArr[1]) {
            const [s, e] = dateArr;
            bodyData.from = s;
            bodyData.to = e;
        }
        if (dateArr.length) {
            let [s, e] = dateArr;

            const isSameDay = dayjs(e).isToday();

            if (isSameDay) {
                e = dayjs().toJSON();
            } else {
                e = dayjs(e).endOf('day');
            }
            s = dayjs(s).startOf('day');

            bodyData.startDate = s;
            bodyData.endDate = e;
            bodyData.fromDate = s;
            bodyData.toDate = e;
        }
        if (pId) {
            bodyData.materialId = pId;
        }
        return bodyData;
    };

    const [getTownSummary, { data, isLoading }] = useGetTownSummaryMutation();

    const transformData = data?.data?.summary?.map((item) => ({
        circle: item.circle,
        region: item.region,
        area: item.area,
        territory: item.territory,
        town: item.town,
        materials: item.materials,
    }));

    const fetchDhSummaryData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }

        getTownSummary({
            page,
            limit: totalShow,
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getDhHistoryFilterData(dateRange, posmId),
        });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // const onChange = (pageNumber, totalPageChange) => {
    //     setTotalPageShow(() => totalPageChange);
    //     setCurrentPageShow(pageNumber);
    //     fetchDhSummaryData(pageNumber, totalPageChange);
    // };

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    // useEffect(() => {
    //     dispatch(setReFetchFilter(!reFetchFilter));
    //     dispatch(resetDataManagementFilter());
    //     dispatch(resetTownSummaryFilter());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch]);

    // by default data load
    useEffect(() => {
        getTownSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Inventory Status" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    loading={isLoading || globalLoading}
                    queryFunc={fetchDhSummaryData}
                    pathname="/inventory-status"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Inventory Status</div>

                {data?.data?.summary?.length ? (
                    <>
                        {transformData?.length ? (
                            <>
                                {transformData?.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            boxShadow: '0 0 5px 0 #dad5d5',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            margin: '10px 0',
                                        }}
                                    >
                                        <Row gutter={[10, 10]} justify="space-evenly">
                                            <Col>
                                                <p style={{ margin: 0 }}>
                                                    <span style={{ fontWeight: 500 }}>
                                                        Cluster:{' '}
                                                    </span>
                                                    {item.region}
                                                </p>
                                            </Col>
                                            <Col>
                                                {' '}
                                                <p style={{ margin: 0 }}>
                                                    <span style={{ fontWeight: 500 }}>Area: </span>
                                                    {item.area}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p style={{ margin: 0 }}>
                                                    <span style={{ fontWeight: 500 }}>
                                                        Territory:{' '}
                                                    </span>
                                                    {item.territory}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p style={{ margin: 0 }}>
                                                    <span style={{ fontWeight: 500 }}>Town: </span>
                                                    {item.town}
                                                </p>
                                            </Col>
                                        </Row>
                                        <div style={{ marginTop: '10px' }}>
                                            <TownSummaryTable
                                                data={item?.materials}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <NoResult />
                        )}
                    </>
                ) : null}
            </div>

            {data?.data?.summary?.length ? (
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
                        total={data?.meta.total}
                        // onChange={onChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            ) : null}
        </>
    );
}
