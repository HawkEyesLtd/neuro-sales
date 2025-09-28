import ReactApexChart from 'react-apexcharts';

import PieLoadingComponent from '../../components/ui/PieLoadingComponent';

function OutletCovered({ data, total, isLoading }) {
    if (!data) return <PieLoadingComponent title="Outlet Wise Presence" />;
    const { nagadOnOutlet, bkashOnOutlet, rocketOnOutlet, upayOnOutlet } = data;
    // pie chart data
    const pieData = [nagadOnOutlet, bkashOnOutlet, rocketOnOutlet, upayOnOutlet];
    const pieOptions = {
        chart: {
            type: 'donut',
        },
        labels: [
            `Nagad ${nagadOnOutlet?.toLocaleString()}`,
            `Bkash ${bkashOnOutlet?.toLocaleString()}`,
            `Rocket ${rocketOnOutlet?.toLocaleString()}`,
            `Upay ${upayOnOutlet?.toLocaleString()}`,
        ],
        responsive: [
            {
                breakpoint: 3000,
                options: {
                    chart: {
                        width: 500,
                        is3d: true,
                    },
                    legend: {
                        show: true,
                        position: 'right',
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
                        width: 400,
                    },
                    legend: {
                        position: 'right',
                    },
                },
            },
            {
                breakpoint: 1000,
                options: {
                    chart: {
                        width: 350,
                    },
                    legend: {
                        position: 'top',
                    },
                },
            },
            {
                breakpoint: 600,
                options: {
                    chart: {
                        width: 400,
                    },
                    legend: {
                        position: 'top',
                    },
                },
            },
            {
                breakpoint: 500,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'top',
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
            width: 0.5,
        },
        colors: ['#EB1927', '#85278B', '#D71871', '#F7CF03'],
    };
    return (
        <div className="box-container" style={{ minHeight: '460px' }}>
            <div className="box-heading">Outlet Wise Presence</div>
            <div className="box-body">
                {/* data render */}
                <ReactApexChart colors options={pieOptions} series={pieData} type="donut" />
            </div>
            <div className="box-footer-container">
                <p className="box-footer-content">
                    Total {total?.toLocaleString() || 0} Execution Done
                </p>
            </div>
        </div>
    );
}

export default OutletCovered;
