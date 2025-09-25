import { Image, Pagination, Table, message } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import thumbIcon from '../../assets/thumb.png';
import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { resetDamageAndLostFilter } from '../../redux/features/inventory/damageAndLostFilterSlice';
import { useGetUserDamageAndLostMutation } from '../../redux/features/inventory/inventoryApiSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';
import labelChange from '../../util/labelChange';

dayjs.extend(isToday);

const { Column, ColumnGroup } = Table;

function DamageAndLost() {
    const { accessToken } = useSelector((state) => state.auth);

    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    // filter hook
    const { dateRange, ffLevel, ffName, posmName, ffCode, posmCode } = useSelector(
        (state) => state.damageAndLostFilter
    );

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const getDhHistoryFilterData = (dateArr, ffLev, ffNa, pName, fCode, pCode) => {
        const bodyData = {};

        if (dateArr[0] && dateArr[1]) {
            const [form, to] = dateArr;
            bodyData.from = form;
            bodyData.to = to;
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
        if (ffNa.length) {
            bodyData.userId = ffNa;
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

    const [getUserDamageAndLost, { data, isLoading }] = useGetUserDamageAndLostMutation();
    // query function
    const fetchDamageAndLostData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }
        getUserDamageAndLost({
            page,
            limit: totalShow,
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getDhHistoryFilterData(dateRange, ffLevel, ffName, posmName, ffCode, posmCode),
        });
    };

    // pagination change event
    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        fetchDamageAndLostData(pageNumber, totalPageChange);
    };

    useEffect(() => {
        getUserDamageAndLost({
            page: currentPage,
            limit: totalShowPage,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = useDispatch();
    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetDamageAndLostFilter());
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
                            ...getDhHistoryFilterData(
                                dateRange,
                                '',
                                ffName,
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
                            ...getDhHistoryFilterData(
                                dateRange,
                                '',
                                ffName,
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
                            ...getDhHistoryFilterData(
                                dateRange,
                                '',
                                ffName,
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

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Damage & Lost History" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={fetchDamageAndLostData}
                    pathname="/inventory-damageAndLost"
                />
            </div>

            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">POSM Damage & Lost</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        rowKey="id"
                        pagination={false}
                        scroll={{
                            x: 750,
                        }}
                        size="small"
                        loading={isLoading}
                        dataSource={data?.data?.map(
                            ({
                                town: townInfo,
                                user: userInfo,
                                material,
                                image,
                                createdAt,
                                kind,
                            }) => ({
                                id: crypto.randomUUID(),
                                ...townInfo,
                                ffName: userInfo?.name || '',
                                ffLevel: userInfo?.userType || '',
                                ffCode: userInfo?.usercode || '',
                                materialName: material.name,
                                brand: material.company,
                                damageQuantity: material.quantity,
                                lostQuantity: material.quantity,
                                image,
                                createdAt,
                                kind: labelChange(kind),
                            })
                        )}
                    >
                        <Column title="Cluster" dataIndex="region" key="region" />
                        <Column title="Area" dataIndex="area" key="area" />
                        <Column title="Territory" dataIndex="territory" key="territory" />
                        <Column title="Town" dataIndex="name" key="name" />
                        <Column
                            title="FF Level"
                            dataIndex="ffLevel"
                            key="ffLevel"
                            render={(level) => (level === 'CM' ? 'Merchandiser' : level)}
                        />
                        <Column title="FF Code" dataIndex="ffCode" key="ffCode" />
                        <Column title="FF Name" dataIndex="ffName" key="ffName" />
                        <Column title="POSM" dataIndex="materialName" key="materialName" />
                        <Column title="Brand" dataIndex="brand" key="brand" />
                        <Column
                            title="Damage Qty"
                            dataIndex="damageQuantity"
                            key="damageQuantity"
                            render={(v, record) => record.kind === 'User Material Damage' && v}
                        />
                        <Column
                            title="Lost Qty"
                            dataIndex="lostQuantity"
                            key="lostQuantity"
                            render={(v, record) => record.kind === 'User Material Lost' && v}
                        />
                        <Column
                            title="Timestamp"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={(_, record) =>
                                dayjs(record.createdAt).format('DD/MM/YYYY h:mm:ss A')
                            }
                        />
                        <Column
                            title="Image"
                            key="image"
                            render={(_, record) => (
                                <Image
                                    width={30}
                                    preview={{ src: record?.image?.original || '' }}
                                    src={record?.image?.original ? thumbIcon : ''}
                                />
                            )}
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

export default DamageAndLost;
