import ReactApexChart from 'react-apexcharts';

function PjpOutletCoverage({ pjpOutletCoverage, total, isLoading }) {
    // if (!data) return <PieLoadingComponent title="Outlet Wise Presence" />;
    // const { nagadOnOutlet, bkashOnOutlet, rocketOnOutlet, upayOnOutlet } = data;
    // pie chart data

    const legendSortForm = {
        'Scheduled Covered': 'Scheduled CV.',
        'Pending Covered': 'Pending CV.',
    };
    const pieData = pjpOutletCoverage?.map((x) => x.quantity) || [0, 0];
    const pieOptions = {
        chart: {
            type: 'donut',
            background: 'transparent',
            width: '100%',
        },
        labels: pjpOutletCoverage?.map((x) => legendSortForm[x.name]) || [],
        responsive: [
            {
                breakpoint: 3000,
                options: {
                    chart: {
                        width: 260,
                        is3d: true,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    legend: {
                        show: true,
                        position: 'bottom',
                        labels: {
                            colors: undefined,
                            useSeriesColors: true,
                        },
                    },
                },
            },
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        width: 260,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 1000,
                options: {
                    chart: {
                        width: 260,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            // {
            //     breakpoint: 996,
            //     options: {
            //         chart: {
            //             width: 250,
            //         },
            //         legend: {
            //             position: 'bottom',
            //         },
            //     },
            // },
            {
                breakpoint: 600,
                options: {
                    chart: {
                        width: 230,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 500,
                options: {
                    chart: {
                        width: 220,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        legend: {
            position: 'right',
            labels: {
                useSeriesColors: false,
            },
        },
        stroke: {
            width: 0.1,
        },
        colors: ['#3F7EEE', '#5251B7'],
        // title: {
        //     text: 'PJP Outlet Coverage',
        //     align: 'left',
        //     style: {
        //         fontSize: '18px',
        //         fontWeight: 'bold',
        //         color: '#0050a4',
        //     },
        // },
    };
    return (
        <div className="box-container" style={{ height: '290px' }}>
            <div className="box-heading box-heading-dash">PJP Outlet Coverage</div>
            <div className="box-body">
                {/* data render */}
                <ReactApexChart
                    // className="w-full h-full"
                    colors="true"
                    options={pieOptions}
                    series={pieData}
                    type="donut"
                />
            </div>
            <div className="box-footer-container -mt-5">
                <p className="box-footer-content -mt-2">
                    Total {pieData?.reduce((a, c) => a + c, 0).toLocaleString() || 0} PJP Outlet
                    Covered
                </p>
            </div>
        </div>
    );
}

export default PjpOutletCoverage;
