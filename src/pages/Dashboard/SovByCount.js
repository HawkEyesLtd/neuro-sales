import ReactApexChart from 'react-apexcharts';

import PieLoadingComponent from '../../components/ui/PieLoadingComponent';

function SovByCount({ data, total }) {
    if (!data) return <PieLoadingComponent title="SOV By Count" />;
    // pie chart data
    const pieData = data?.map(({ quantity }) => quantity) || [0];
    const pieOptions = {
        chart: {
            type: 'donut',
            // width: '100%',
        },

        labels: data?.map(({ name, quantity }) => `${name} ${quantity.toLocaleString()}`) || [
            'Nagad 0',
            'Bkash 0',
            'Rocket 0',
            'Upay 0',
        ],
        responsive: [
            {
                breakpoint: 3000,
                options: {
                    chart: {
                        width: 500,
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
        colors: ['#EB1927', '#D71871', '#85278B', '#F7CF03'],
    };
    return (
        <div className="box-container" style={{ minHeight: '460px' }}>
            <div className="box-heading">SOV By Count</div>
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

export default SovByCount;
