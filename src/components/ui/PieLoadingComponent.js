import ReactApexChart from 'react-apexcharts';

function PieLoadingComponent({ title }) {
    const pieData = [100];
    const pieOptions = {
        chart: {
            type: 'donut',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        labels: [``],
        responsive: [
            {
                breakpoint: 3000,
                options: {
                    chart: {
                        width: 430,
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
        colors: ['#EB1927'],
    };
    return (
        <div className="box-container" style={{ minHeight: '460px' }}>
            <div className="box-heading">{title}</div>
            <div className="box-body">
                {/* data render */}
                <ReactApexChart colors options={pieOptions} series={pieData} type="donut" />
            </div>
            <div className="box-footer-container">
                <div className="dot-loader">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        </div>
    );
}

export default PieLoadingComponent;
