import { Pagination, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { useGetInterimQpdsDataMutation } from '../../redux/features/interim/interimApi';
import { resetInterimFilter } from '../../redux/features/interim/interimFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';

import ReportTableQpds from './ReportTableQpds';

function InterimQpds() {
    const { accessToken } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    // pagination
    const [totalShowPage, setTotalPageShow] = useState(10);
    const [currentPage, setCurrentPageShow] = useState(1);

    const [getInterimQpdsData, { data, isLoading }] = useGetInterimQpdsDataMutation();
    // filter hook
    const { visited, completedVisit, outletcode, channel, outletType, month, qpdsName, ffName } =
        useSelector((state) => state.interimQpdsFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    useEffect(() => {
        getInterimQpdsData({
            page: currentPage,
            limit: totalShowPage,
            month: dayjs(month).format('MMMM'),
            year: dayjs(month).format('YYYY'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [dispatch, isLoading]);

    // body data
    function getBodyData(visit, cVisit, oCode, chnl, qpdsN, ffN) {
        const bodyData = {};

        if (visit) {
            bodyData.visited = visit;
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
        if (qpdsN) {
            bodyData.planogram = qpdsN;
        }
        if (ffN) {
            bodyData.userId = ffN;
        }
        return bodyData;
    }

    const searchData = (page, totalShow, clean) => {
        if (clean === 'cleanShowResultOnPage') {
            setCurrentPageShow(1);
            setTotalPageShow(10);
        }
        getInterimQpdsData({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getBodyData(visited, completedVisit, outletcode, channel, qpdsName, ffName),
            page,
            limit: totalShow,
            month: dayjs(month).format('MMMM'),
            year: dayjs(month).format('YYYY'),
        });
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
                            ...getBodyData(
                                visited,
                                completedVisit,
                                outletcode,
                                channel,
                                qpdsName,
                                ffName
                            ),
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
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
                            ...getBodyData(
                                visited,
                                completedVisit,
                                outletcode,
                                channel,
                                qpdsName,
                                ffName
                            ),
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
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
                            ...getBodyData(
                                visited,
                                completedVisit,
                                outletcode,
                                channel,
                                qpdsName,
                                ffName
                            ),
                            startDate: dayjs(month).startOf('month').toJSON(),
                            endDate: dayjs(month).endOf('month').toJSON(),
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
            <HelmetHeader title="Interim QPDS Report" />

            <div style={{ margin: '16px 0' }}>
                <Filter
                    downloadButton={download}
                    loading={isLoading || globalLoading}
                    queryFunc={searchData}
                    pathname="/interimQpdsReport"
                />
            </div>

            <ReportTableQpds loading={isLoading} data={data?.data} />
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

export default InterimQpds;
