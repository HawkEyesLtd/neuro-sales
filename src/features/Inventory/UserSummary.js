import { Col, Pagination, Row, message } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { useGetUserSummaryMutation } from '../../redux/features/inventory/inventoryApiSlice';
import { resetUserSummaryFilter } from '../../redux/features/inventory/userSummaryFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

import SplitPosm from './Chart/SplitPosm';
import SummaryChart from './Chart/SummaryChart';
import UserSummaryTable from './UserSummaryTable';

dayjs.extend(isToday);

function UserSummary() {
    const { accessToken } = useSelector((state) => state.auth);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // dh history filter hook
    const { dateRange, ffId, ffLevel, posmName, posmOriginalName, ffCode, posmCode } = useSelector(
        (state) => state.userSummaryFilter
    );

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const getTmrSummaryFilterData = (dateArr, ids, ffLev, pName, fCode, pCode) => {
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
        if (ffLev.length) {
            bodyData.ffLevel = ffLev;
        }
        if (ids.length) {
            bodyData.userId = ids;
        }
        if (pName) {
            bodyData.materialId = pName;
        }
        if (fCode) {
            bodyData.userCode = fCode;
        }
        if (pCode) {
            bodyData.materialCode = pCode;
        }

        return bodyData;
    };

    const [getUserSummary, { data, isLoading }] = useGetUserSummaryMutation();

    const transformData = data?.data?.summary?.map((item) => ({
        circle: item.circle,
        region: item.region,
        area: item.area,
        territory: item.territory,
        town: item.town,
        userLevel: item.userLevel,
        userName: item.userFullName,
        userCode: item.userCode,
        materials: item.materials,
    }));

    const fetchTmrSummaryData = () => {
        getUserSummary({
            ...getDataManagementFilterData({
                circle,
                region,
                area,
                territory,
                town,
            }),
            ...getTmrSummaryFilterData(dateRange, ffId, ffLevel, posmName, ffCode, posmCode),
        });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // initial load current date data
    useEffect(() => {
        getUserSummary({
            page: currentPage,
            limit: totalShowPage,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        fetchTmrSummaryData(pageNumber, totalPageChange);
    };

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetUserSummaryFilter());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

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
                            ...getTmrSummaryFilterData(
                                dateRange,
                                ffId,
                                '',
                                posmName,
                                ffCode,
                                posmCode
                            ),
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
                            ...getTmrSummaryFilterData(
                                dateRange,
                                ffId,
                                '',
                                posmName,
                                ffCode,
                                posmCode
                            ),
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
                            ...getTmrSummaryFilterData(
                                dateRange,
                                ffId,
                                '',
                                posmName,
                                ffCode,
                                posmCode
                            ),
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
    const info = (
        <div style={{ fontSize: '10px' }}>
            <span>Remaining = Remaining Assign Qty by MS.</span>
            <br />
            <br />
            <span>
                Used = Used in field + Damage during day-end and return + Lost during day-end and
                return.
            </span>
        </div>
    );

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="FF POSM Summary" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={fetchTmrSummaryData}
                    pathname="/inventory-userSummary"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">FF POSM Summary</div>

                <Row style={{ marginTop: '20px' }} gutter={[5, 15]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        {data?.data?.summary_bar_chart?.length ? (
                            <SummaryChart data={data?.data?.summary_bar_chart} info={info} />
                        ) : null}
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6}>
                        {data?.data?.split_and_used_posm_pie_chart?.length ? (
                            <SplitPosm
                                posmName={posmOriginalName}
                                title="Split POSM"
                                data={data?.data?.split_and_used_posm_pie_chart[0]}
                                label={data?.data?.split_and_used_posm_pie_chart[2]}
                            />
                        ) : null}
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6}>
                        {data?.data?.split_and_used_posm_pie_chart?.length ? (
                            <SplitPosm
                                posmName={posmOriginalName}
                                title="Used POSM"
                                data={data?.data?.split_and_used_posm_pie_chart[1]}
                                label={data?.data?.split_and_used_posm_pie_chart[2]}
                            />
                        ) : null}
                    </Col>
                </Row>

                {data?.data?.summary?.length ? (
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
                                            <span style={{ fontWeight: 500 }}>Cluster: </span>
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
                                            <span style={{ fontWeight: 500 }}>Territory: </span>
                                            {item.territory}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p style={{ margin: 0 }}>
                                            <span style={{ fontWeight: 500 }}>Town: </span>
                                            {item.town}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p style={{ margin: 0 }}>
                                            <span style={{ fontWeight: 500 }}>FF Level: </span>
                                            {item.userLevel === 'CM'
                                                ? 'Merchandiser'
                                                : item.userLevel}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p style={{ margin: 0 }}>
                                            <span style={{ fontWeight: 500 }}>FF Name: </span>
                                            {item.userName}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p style={{ margin: 0 }}>
                                            <span style={{ fontWeight: 500 }}>FF Code: </span>
                                            {item.userCode}
                                        </p>
                                    </Col>
                                </Row>
                                <div style={{ marginTop: '10px' }}>
                                    <UserSummaryTable
                                        isLoading={isLoading}
                                        data={item?.materials}
                                    />
                                </div>
                            </div>
                        ))}
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
                        onChange={onChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    />
                </div>
            ) : null}
        </>
    );
}

export default UserSummary;
