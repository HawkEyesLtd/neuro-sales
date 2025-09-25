import { Pagination, Table, message } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { resetFFHistoryFilter } from '../../redux/features/inventory/ffHistoryFilterSlice';
import { useGetUserHistoryMutation } from '../../redux/features/inventory/inventoryApiSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

const { Column, ColumnGroup } = Table;

dayjs.extend(isToday);

function UserHistory() {
    const { accessToken } = useSelector((state) => state.auth);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // dh history filter hook
    const { dateRange, ffId, entryType, ffLevel, materialType, posmId, ffCode, posmCode } =
        useSelector((state) => state.ffHistoryFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);
    const getTmrHistoryFilterData = (
        dateArr,
        ids,
        eType,
        ffLev,
        materialtype,
        pId,
        fCode,
        pCode
    ) => {
        const bodyData = {};

        if (dateArr[0] && dateArr[1]) {
            const [s, e] = dateArr;
            bodyData.from = s;
            bodyData.to = e;
        }
        if (dateRange.length) {
            let [s, e] = dateRange;

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
        if (ids.length) {
            bodyData.userId = ids;
        }
        if (eType) {
            bodyData.type = eType;
        }
        if (ffLev.length) {
            bodyData.ffLevel = ffLev;
        }
        if (pId) {
            bodyData.materialId = pId;
        }
        if (materialtype) {
            bodyData.materialType = materialtype;
        }
        if (fCode) {
            bodyData.userCode = fCode;
        }
        if (pCode) {
            bodyData.materialCode = pCode;
        }
        return bodyData;
    };

    const [getUserHistory, { data, isLoading }] = useGetUserHistoryMutation();

    const fetchTmrHistoryData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }

        getUserHistory({
            page,
            limit: totalShow,
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getTmrHistoryFilterData(
                dateRange,
                ffId,
                entryType,
                ffLevel,
                materialType,
                posmId,
                ffCode,
                posmCode
            ),
        });
    };

    useEffect(() => {
        getUserHistory({ page: currentPage, limit: totalShowPage });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        fetchTmrHistoryData(pageNumber, totalPageChange);
    };

    const dispatch = useDispatch();
    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetFFHistoryFilter());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // format text
    const textChange = {
        'User Material Confirm': 'Confirm POSM',
        'User Execution': 'POSM Used In field',
        'User Material Assign': 'Assign by MS',
        'User Material Return': 'Return by FF',
    };

    const dataNormalize = data?.data?.map(
        ({ town: townInfo, user: userInfo, material, kind, createdAt, outlet, assign }) => ({
            id: crypto.randomUUID(),
            region: townInfo.region,
            area: townInfo.area,
            territory: townInfo.territory,
            town: townInfo.name,
            ffName: assign?.name || userInfo.name,
            ffCode: assign?.usercode || userInfo?.usercode,
            posmName: material.name,
            brand: material.company,
            posmQuantity: material.quantity,
            entryType: kind,
            createdAt,
            outletCode: outlet?.outletcode || '',
        })
    );

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
                            ...getTmrHistoryFilterData(
                                dateRange,
                                ffId,
                                entryType,
                                ffLevel,
                                materialType,
                                posmId,
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
                            ...getTmrHistoryFilterData(
                                dateRange,
                                ffId,
                                entryType,
                                ffLevel,
                                materialType,
                                posmId,
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
                            ...getTmrHistoryFilterData(
                                dateRange,
                                ffId,
                                entryType,
                                ffLevel,
                                materialType,
                                posmId,
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

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="FF POSM History" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={fetchTmrHistoryData}
                    pathname="/inventory-userHistory"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">FF POSM History</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        rowKey="id"
                        pagination={false}
                        scroll={{
                            x: 750,
                        }}
                        size="small"
                        loading={isLoading}
                        dataSource={dataNormalize}
                    >
                        <Column title="Cluster" dataIndex="region" key="region" />
                        <Column title="Area" dataIndex="area" key="area" />
                        <Column title="Territory" dataIndex="territory" key="territory" />
                        <Column title="Town" dataIndex="town" key="town" />
                        <Column title="Outlet Code" dataIndex="outletCode" key="outletCode" />
                        <Column title="FF Code" dataIndex="ffCode" key="ffCode" />
                        <Column title="FF Name" dataIndex="ffName" key="ffName" />
                        <Column title="POSM" dataIndex="posmName" key="posmName" />
                        <Column title="Brand" dataIndex="brand" key="brand" />
                        <Column title="POSM Qty" dataIndex="posmQuantity" key="posmQuantity" />
                        <Column
                            title="Entry Type"
                            dataIndex="entryType"
                            key="entryType"
                            render={(_, record) => textChange[record.entryType]}
                        />
                        <Column
                            title="Timestamp"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={(_, record) =>
                                dayjs(record.createdAt).format('DD/MM/YYYY hh:mm:ss A')
                            }
                        />
                    </Table>
                </div>
            </div>

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
        </>
    );
}

export default UserHistory;
