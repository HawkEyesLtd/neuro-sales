import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function SovCountStackedChart({ data }) {
    const [stackData, setStackData] = useState([]);
    const [stackLabel, setStackLabel] = useState([]);

    const stackedOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        xaxis: {
            categories: stackLabel,
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `Quantity ${val}`;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        colors: ['#F26422', '#EB1927', '#D71871', '#85278B', '#F7CF03'],
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            offsetX: 40,
        },
    };

    useEffect(() => {
        setStackData(data?.length ? data[0] : []);
        setStackLabel(data?.length ? data[1] : []);
    }, [data]);

    return (
        <div className="box-container" style={{ minHeight: '250px' }}>
            <div className="box-heading">Material Usages By Competition</div>
            <div style={{ width: '100%' }}>
                {/* data render */}
                <ReactApexChart
                    options={stackedOptions}
                    series={stackData}
                    type="bar"
                    width="100%"
                    height={250}
                />
            </div>
        </div>
    );
}

export default SovCountStackedChart;
