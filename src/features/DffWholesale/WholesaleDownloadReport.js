/* eslint-disable react-hooks/exhaustive-deps */
import { message, notification, Spin, theme } from 'antd';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { useDownloadReportDataMutation } from '../../redux/features/downloadReport/downloadReportApi';
import { resetDownloadFilter } from '../../redux/features/downloadReport/downloadReportFilterSlice';
import { resetDataManagementFilter } from '../../redux/features/filter/dataManagementFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';

dayjs.extend(isToday);

function WholesaleDownloadReport() {
    const dispatch = useDispatch();

    const { globalLoading } = useSelector((state) => state.globalLoading);

    const { user } = useSelector((state) => state.auth);
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);
    const { reportType, month } = useSelector((state) => state.dffDownloadReportFilter);
    const { accessToken } = useSelector((state) => state.auth);

    const { reFetchFilter } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetDownloadFilter());
    }, [dispatch]);

    const [loading, _setLoading] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // error notificaiton
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.warning({
            message: `Warning`,
            description: 'Please select a report type.',
            placement: 'topRight',
        });
    };

    function getBodyData() {
        const bodyData = {};
        bodyData.circleId = circle?.map((r) => r.value) || [];
        bodyData.regionId = region?.map((r) => r.value) || [];
        bodyData.areaId = area?.map((r) => r.value) || [];
        bodyData.territoryId = territory?.map((r) => r.value) || [];
        if (month) {
            bodyData.month = dayjs(month).format('YYYY-MM-DD');
        }
        return bodyData;
    }

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

                        body: JSON.stringify({ ...getBodyData(), index: ++index }),
                        mode: 'cors',
                    }),
                    fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({ ...getBodyData(), index: ++index }),
                        mode: 'cors',
                    }),
                    fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${accessToken}`,
                        },

                        body: JSON.stringify({ ...getBodyData(), index: ++index }),
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

    const [downloadReportData] = useDownloadReportDataMutation();

    const fetchSurveyQueryData = async () => {
        if (month) {
            try {
                if (reportType === 'Attendance Report') {
                    download({
                        url: '/v1/report/attendance',
                        fileName: 'Attendance Report.xlsx',
                    });
                } else if (reportType === 'FF Visit Call') {
                    download({
                        url: '/v1/report/ff-visit-call',
                        fileName: 'FF Visit Call.xlsx',
                    });
                } else if (reportType === 'Display Audit AI Result') {
                    download({
                        url: '/v1/report/display-audit-ai-result',
                        fileName: 'Display Audit AI Result.xlsx',
                    });
                } else if (reportType === 'MS Joint And Control Call') {
                    download({
                        url: '/v1/report/ms-joint-and-control-call',
                        fileName: 'MS Joint And Control Call.xlsx',
                    });
                } else if (reportType === 'Outlet wise FAT') {
                    download({
                        url: '/v1/report/outlet-wise-fat',
                        fileName: 'Outlet wise FAT.xlsx',
                    });
                } else if (reportType === 'SOS AI Result') {
                    download({
                        url: '/v1/report/sos-ai-result',
                        fileName: 'SOS AI Result.xlsx',
                    });
                } else if (reportType === 'POSM Used Report') {
                    download({
                        url: '/v1/report/posm-used',
                        fileName: 'POSM Used Report.xlsx',
                    });
                } else if (reportType === 'FF POSM History') {
                    download({
                        url: '/v1/report/ff-posm-history',
                        fileName: 'FF POSM History.xlsx',
                    });
                } else if (reportType === 'Town POSM History') {
                    download({
                        url: '/v1/report/town-posm-history',
                        fileName: 'Town POSM History.xlsx',
                    });
                } else if (reportType === 'Interim Compliance') {
                    download({
                        url: '/v1/report/interim-compliance',
                        fileName: 'Interim Compliance.xlsx',
                    });
                } else if (reportType === 'Leave Report') {
                    download({
                        url: '/v1/report/leave',
                        fileName: 'Leave Report.xlsx',
                    });
                } else if (reportType === 'January Consume Report') {
                    download({
                        url: '/v1/report/january-consume-leave',
                        fileName: 'January Consume Report.xlsx',
                    });
                } else if (reportType === 'Strike Rate Report') {
                    download({
                        url: '/v1/report/strike-rate',
                        fileName: 'Strike Rate Report.xlsx',
                    });
                } else if (reportType === 'Masterdata') {
                    download({
                        url: '/v1/report/outlet-data',
                        fileName: 'masterdata.xlsx',
                    });
                } else if (reportType === 'Market Rate Report') {
                    download({
                        url: '/v1/report/marketRate',
                        fileName: 'Market Rate Report.xlsx',
                    });
                } else if (reportType === 'Insight Report') {
                    download({
                        url: '/v1/report/wholesale-insights',
                        fileName: 'Insight Report.xlsx',
                    });
                } else if (reportType === 'Wholesale Report') {
                    download({
                        url: '/v1/report/wholesale-report',
                        fileName: 'Wholesale Report.xlsx',
                    });
                } else if (reportType === 'Stock & Offtake Report') {
                    download({
                        url: '/v1/report/average-stock-and-offtake',
                        fileName: 'stock and offtake.xlsx',
                    });
                } else {
                    openNotification();
                }
            } catch (error) {
                message.error('Something went wrong');
            } finally {
                setGlobalLoading(false);
            }
        } else {
            message.error('Date are required');
        }
    };

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Wholesale Download Report" />

            {contextHolder}
            <div style={{ margin: '16px 0' }}>
                <Filter
                    loading={globalLoading}
                    queryFunc={fetchSurveyQueryData}
                    pathname="/wholesale-download-report"
                />
            </div>
            <div
                style={{
                    padding: 15,
                    minHeight: 400,
                    background: colorBgContainer,
                }}
            >
                <div
                    style={{ width: '100%', height: '50vh', display: 'grid', placeItems: 'center' }}
                >
                    {globalLoading ? <Spin size="large" /> : null}
                </div>
            </div>
        </>
    );
}

export default WholesaleDownloadReport;
