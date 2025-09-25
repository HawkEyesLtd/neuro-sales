import { Pagination, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { displayItemsArr } from '../../constents/interim';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { useGetInterimDataMutation } from '../../redux/features/interim/interimApi';
import { resetInterimFilter } from '../../redux/features/interim/interimFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

import DynamicReportTable from './DynamicReportTable';

function Interim() {
    const { accessToken } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);
    const [showDisplayItems, setShowDisplayItems] = useState([]);

    const [getInterimData, { data, isLoading, isSuccess }] = useGetInterimDataMutation();
    // filter hook
    const {
        scheduledVisit,
        completedVisit,
        outletcode,
        channel,
        outletType,
        month,
        passedFailed,
        displayItems,
    } = useSelector((state) => state.interimFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    useEffect(() => {
        getInterimData({
            page: currentPage,
            limit: totalShowPage,
            month: dayjs(month).format('MMMM'),
            year: dayjs(month).format('YYYY'),
            planogramItems: displayItemsArr,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // body data
    function getBodyData(sVisit, cVisit, oCode, chnl, oType, sts, dpName) {
        const bodyData = {};

        if (sVisit) {
            bodyData.scheduledVisit = sVisit;
        }
        if (cVisit) {
            bodyData.completedVisit = cVisit;
        }
        if (oCode) {
            bodyData.outletcode = oCode;
        }
        if (chnl) {
            bodyData.channel = chnl;
        }
        if (oType.length) {
            bodyData.outletType = oType;
        }
        if (sts) {
            bodyData.status = sts;
        }
        if (sts) {
            bodyData.status = sts;
        }
        if (dpName.length) {
            bodyData.planogramItems = dpName;
        } else {
            bodyData.planogramItems = displayItemsArr;
        }

        return bodyData;
    }

    const searchData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }
        getInterimData({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getBodyData(
                scheduledVisit,
                completedVisit,
                outletcode,
                channel,
                outletType,
                passedFailed,
                displayItems
            ),
            page,
            limit: totalShow,
            month: dayjs(month).format('MMMM'),
            year: dayjs(month).format('YYYY'),
        });
        setShowDisplayItems(displayItems);
    };

    // pagination change event
    const onChange = (pageNumber, totalPageChange) => {
        setTotalPageShow(() => totalPageChange);
        setCurrentPageShow(pageNumber);
        searchData(pageNumber, totalPageChange);
    };

    const { reFetchFilter, globalLoading } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetInterimFilter());
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
            const { planogramItems } = getBodyData(null, null, null, null, [], null, displayItems);

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
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
                            planogramItems,
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
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
                            planogramItems,
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
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
                            planogramItems,
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
            <HelmetHeader title="Interim Report" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={searchData}
                    pathname="/interimReport"
                />
            </div>

            <DynamicReportTable
                loading={isLoading}
                data={data?.data}
                selectedDisplayItems={showDisplayItems}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '16px 0',
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

export default Interim;
