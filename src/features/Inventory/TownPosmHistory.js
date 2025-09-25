import { Pagination, Table, message } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { useGetTownPosmHistoryMutation } from '../../redux/features/inventory/inventoryApiSlice';
import { resetTownHistoryFilterSlice } from '../../redux/features/inventory/viewPosmTownHistoryFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';
import labelChange from '../../util/labelChange';

const { Column, ColumnGroup } = Table;

dayjs.extend(isToday);

function TownPosmHistory() {
    const { accessToken } = useSelector((state) => state.auth);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // dh history filter hook
    const { dateRange, entryType, posmName, posmCode } = useSelector(
        (state) => state.posmTownHistoryFilter
    );

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const getTownPosmHistoryData = (dateArr, type, pName, pCode) => {
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
        if (type) {
            bodyData.type = type;
        }
        if (pName) {
            bodyData.materialId = pName;
        }
        if (pCode) {
            bodyData.materialCode = pCode;
        }
        return bodyData;
    };

    const [getTownPosmHistory, { data, isLoading }] = useGetTownPosmHistoryMutation();
    const fetchDhHistoryData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }

        getTownPosmHistory({
            page,
            limit: totalShow,
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getTownPosmHistoryData(dateRange, entryType, posmName, posmCode),
        });
    };

    useEffect(() => {
        getTownPosmHistory({ page: currentPage, limit: totalShowPage });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        fetchDhHistoryData(pageNumber, totalPageChange);
    };

    const dispatch = useDispatch();
    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetTownHistoryFilterSlice());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // format text
    const textChange = {
        'Town Material Accept': 'Receive in town',
        'Town Material Allocate': 'Allocate via Excel',
        'Town Material Transfer': 'Transfer',
        'Town Material Transfer Receive': 'Transfer Receive',
        'Town Material Damage': 'Town Material Damage',
        'Town Material Lost': 'Town Material Lost',
    };

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
                            ...getTownPosmHistoryData(dateRange, entryType, posmName, posmCode),
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
                            ...getTownPosmHistoryData(dateRange, entryType, posmName, posmCode),
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
                            ...getTownPosmHistoryData(dateRange, entryType, posmName, posmCode),
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
            <HelmetHeader title="Town POSM History" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={fetchDhHistoryData}
                    pathname="/town-posm-history"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Town POSM History</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: 800 }}
                        size="small"
                        loading={isLoading}
                        dataSource={data?.data?.map(
                            ({
                                kind,
                                town: townInfo,
                                material: { name: pName, quantity, company, materialCode } = {},
                                user: userInfo,
                                createdAt,
                            }) => ({
                                id: crypto.randomUUID(),
                                region: townInfo.region,
                                area: townInfo.area,
                                territory: townInfo.territory,
                                town: townInfo.name,
                                posmName: pName,
                                brand: company,
                                quantity,
                                ffLevel: userInfo?.userType || '',
                                ffName: userInfo?.name || '',
                                kind: labelChange(kind),
                                createdAt,
                                materialCode,
                            })
                        )}
                    >
                        <Column title="Cluster" dataIndex="region" key="region" />
                        <Column title="Area" dataIndex="area" key="area" />
                        <Column title="Territory" dataIndex="territory" key="territory" />
                        <Column title="Town" dataIndex="town" key="town" />
                        <Column title="POSM" dataIndex="posmName" key="posmName" />
                        <Column title="Brand Name" dataIndex="brand" key="brand" />
                        <Column title="POSM Code" dataIndex="materialCode" key="materialCode" />
                        <Column title="POSM Qty" dataIndex="quantity" key="quantity" />
                        <Column
                            title="Entry Type"
                            dataIndex="kind"
                            key="kind"
                            render={(type) => textChange[type]}
                        />
                        <Column
                            title="FF Level"
                            dataIndex="ffLevel"
                            key="ffLevel"
                            render={(level) => (level === 'CM' ? 'Merchandiser' : level)}
                        />
                        <Column title="FF Name" dataIndex="ffName" key="ffName" />

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

export default TownPosmHistory;
