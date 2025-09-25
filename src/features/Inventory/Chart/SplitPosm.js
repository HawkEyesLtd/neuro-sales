import ReactApexChart from 'react-apexcharts';

export default function SplitPosm({ title, data, label, posmName }) {
    const lablesData = {
        CM: 'CM',
        MS: 'MS',
        DFF: 'DFF',
        WMA: 'WMA',
        CC: 'CC',
        MTCM: 'MT',
    };

    // pie chart data
    const pieOptions = {
        chart: {
            width: 380,
            type: 'donut',
            background: 'transparent',
        },
        stroke: {
            width: 0,
            colors: ['#005eee', '#6a95f2', '#29abe2', '#9C27B0', '#9C27FE'],
        },
        legend: {
            show: false,
            position: 'bottom',
        },
        dataLabels: {
            enabled: true,
            formatter(val, r) {
                return `${lablesData[r.w.config.labels[r.seriesIndex]]} ${Math.round(val)}%`;
            },
        },
        colors: ['#005eee', '#6a95f2', '#29abe2', '#9C27B0', '#9C27FE'],
        labels: label,
    };

    return (
        <div className="box-container" style={{ minHeight: '250px' }}>
            <div className="box-heading box-heading-dash">{title}</div>
            <div className="box-body">
                <ReactApexChart colors options={pieOptions} series={data} type="pie" />
            </div>
            <div className="box-footer-container">
                <p className="box-footer-content">
                    Total {title} {data?.reduce((a, c) => a + c, 0).toLocaleString() || 0}
                </p>
                <p className="box-footer-content">{posmName}</p>
            </div>
        </div>
    );
}
