import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function ShareOfSachetChart({ data }) {
    const [shareByOwnerLabels, setShareByOwnerLabels] = useState([]);
    const [shareByOwnerValues, setShareByOwnerValues] = useState([]);
    const [totalOwnerValue, setTotalOwnerValue] = useState(0);

    const [hangerPresenceLabels, setHangerPresenceLabels] = useState([]);
    const [hangerPresenceValues, setHangerPresenceValues] = useState([]);
    const [totalHangerValue, setTotalHangerValue] = useState(0);

    useEffect(() => {
        if (data) {
            const ownerValues = data?.shareByOwner?.map((doc) => doc.total) || [];
            const hangerValues = data?.hangerPresence?.map((doc) => doc.total) || [];

            setShareByOwnerLabels(data?.shareByOwner?.map((doc) => doc._id) || []);
            setShareByOwnerValues(ownerValues);
            setTotalOwnerValue(ownerValues.reduce((acc, val) => acc + val, 0));

            setHangerPresenceLabels(data?.hangerPresence?.map((doc) => doc._id) || []);
            setHangerPresenceValues(hangerValues);
            setTotalHangerValue(hangerValues.reduce((acc, val) => acc + val, 0));
        }
    }, [data]);

    const sharedPlotOptions = {
            pie: {
                donut: { size: '65%' },
                expandOnClick: false,
                customScale: 1,
            },
        }

    const sharedResponsiveConfig = [
            {
                breakpoint: 1280,
                options: {
                    legend: { position: 'bottom' },
                    plotOptions: { pie: { donut: { size: '60%' } } },
                },
            },
            {
                breakpoint: 1024,
                options: {
                    legend: { position: 'bottom' },
                    chart: { height: '100%', width: '100%' },
                    plotOptions: { pie: { donut: { size: '56%' } } },
                },
            },
            {
                breakpoint: 768,
                options: {
                    legend: { position: 'bottom' },
                    chart: { height: 220 },
                    plotOptions: { pie: { donut: { size: '52%' } } },
                },
            },
        ]

    const chartOptions1 = {
        chart: {
            type: 'donut',
            height: '100%',
            width: '100%',
            parentHeightOffset: 0,
            toolbar: { show: false },
        },
        colors: [
            '#4F81BD',
            '#82CA9D',
            '#5C6BC0',
            '#29B6F6',
            '#FFA726',
            '#FF7043',
            '#FF8A65',
            '#FFAB91',
            '#FFCCBC',
            '#F8BBD0',
            '#E1BEE7',
            '#D1C4E9',
            '#B3E5FC',
            '#B2EBF2',
            '#B2DFDB',
            '#C8E6C9',
            '#DCEDC8',
            '#F0F4C3',
            '#FFF9C4',
            '#FFECB3',
            '#FFE0B2',
            '#FFCCBC',
            '#FFAB91',
            '#FF8A65',
            '#FF7043',
            '#FFA726',
            '#29B6F6',
            '#5C6BC0',
            '#82CA9D',
            '#4F81BD',
        ],
        dataLabels: { enabled: false },
        plotOptions: sharedPlotOptions,
        tooltip: {
            y: {
                formatter: (val) =>
                    totalOwnerValue > 0
                        ? `${((val / totalOwnerValue) * 100).toFixed(1)}% (${val})`
                        : `0% (${val})`,
            },
        },
        legend: {
            position: 'right',
            horizontalAlign: 'center',
            markers: { width: 10, height: 10 },
            itemMargin: { horizontal: 8, vertical: 4 },
        },
        responsive: sharedResponsiveConfig,
    };

    const chartOptions2 = {
        chart: {
            type: 'donut',
            height: '100%',
            width: '100%',
            parentHeightOffset: 0,
            toolbar: { show: false },
        },
        colors: [
            '#4F81BD',
            '#82CA9D',
            '#5C6BC0',
            '#29B6F6',
            '#FFA726',
            '#FF7043',
            '#FF8A65',
            '#FFAB91',
            '#FFCCBC',
            '#F8BBD0',
            '#E1BEE7',
            '#D1C4E9',
            '#B3E5FC',
            '#B2EBF2',
            '#B2DFDB',
            '#C8E6C9',
            '#DCEDC8',
            '#F0F4C3',
            '#FFF9C4',
            '#FFECB3',
            '#FFE0B2',
            '#FFCCBC',
            '#FFAB91',
            '#FF8A65',
            '#FF7043',
            '#FFA726',
            '#29B6F6',
            '#5C6BC0',
            '#82CA9D',
            '#4F81BD',
        ],
        dataLabels: { enabled: false },
        plotOptions: sharedPlotOptions,
        tooltip: {
            y: {
                formatter: (val) =>
                    totalHangerValue > 0
                        ? `${((val / totalHangerValue) * 100).toFixed(1)}% (${val})`
                        : `0% (${val})`,
            },
        },
        legend: {
            position: 'right',
            horizontalAlign: 'center',
            markers: { width: 10, height: 10 },
            itemMargin: { horizontal: 8, vertical: 4 },
        },
        responsive: sharedResponsiveConfig,
    };

    return (
        <div className="box-container h-[280px]! relative overflow-hidden">
            <div className="box-heading box-heading-dash">Share Of Sachet</div>
            <div
                className="grid grid-flow-col grid-cols-2 gap-10 items-center"
                style={{ height: 'calc(100% - 50px)' }}
            >
                <div className="min-w-0 overflow-hidden h-full flex flex-col pr-3">
                    {shareByOwnerValues.length > 0 && (
                        <>
                            <p className="pl-10 font-bold text-md text-[#0050a4]">
                                Share of Sachet by Owner
                            </p>

                            <div className="w-full h-full min-w-0 overflow-hidden">
                                <Chart
                                    options={{ ...chartOptions1, labels: shareByOwnerLabels }}
                                    series={shareByOwnerValues}
                                    type="donut"
                                    height="100%"
                                    width="100%"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="min-w-0 overflow-hidden h-full flex flex-col pl-3 border-l border-gray-200">
                    {hangerPresenceValues.length > 0 && (
                        <>
                            <p className="font-bold  text-md text-[#0050a4]">Hanger Presence</p>

                            <div className="w-full h-full min-w-0 overflow-hidden">
                                <Chart
                                    options={{ ...chartOptions2, labels: hangerPresenceLabels }}
                                    series={hangerPresenceValues}
                                    type="donut"
                                    height="100%"
                                    width="100%"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShareOfSachetChart;
