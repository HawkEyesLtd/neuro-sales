import { InfoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function SummaryChart({ data, info }) {
    const [stackData, setStackData] = useState([]);
    const [stackLabel, setStackLabel] = useState([]);

    const stackedOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
            stacked: true,
            stackType: '100%',
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        stroke: {
            width: 0,
            colors: ['#fff'],
        },
        xaxis: {
            categories: stackLabel,
        },
        yaxis: {
            labels: {
                formatter(val) {
                    return `${val}`;
                },
            },
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
        colors: ['#005eee', '#5087f1'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 40,
        },
    };

    useEffect(() => {
        setStackData([
            { name: 'Remaining', data: data[0] || [] },
            { name: 'Used', data: data[1] || [] },
        ]);
        setStackLabel(data[2] || []);
    }, [data]);

    return (
        <div className="box-container" style={{ minHeight: '250px' }}>
            <div className="box-heading box-heading-dash">POSM Usage</div>
            <div style={{ width: '100%' }}>
                {/* data render */}
                <ReactApexChart
                    options={stackedOptions}
                    series={stackData}
                    type="bar"
                    width="100%"
                    height={232}
                />
            </div>
            <div className="chart-button-container" style={{ top: '-5px' }}>
                <Tooltip placement="bottomRight" title={info}>
                    <Button size="small" type="primary" shape="circle" icon={<InfoOutlined />} />
                </Tooltip>
            </div>
        </div>
    );
}

export default SummaryChart;
// import { InfoOutlined } from '@ant-design/icons';
// import { Button, Tooltip } from 'antd';
// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// function SummaryChart({ data, info }) {
//     const [stackData, setStackData] = useState([]);
//     const [stackLabel, setStackLabel] = useState([]);

//     const stackedOptions = {
//         chart: {
//             type: 'bar',
//             toolbar: {
//                 show: false,
//             },
//             stacked: true,
//             stackType: '100%',
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//             },
//         },
//         stroke: {
//             width: 0,
//             colors: ['#fff'],
//         },
//         xaxis: {
//             categories: stackLabel,
//         },
//         yaxis: {
//             labels: {
//                 formatter(val) {
//                     return `${val}`;
//                 },
//             },
//         },
//         tooltip: {
//             y: {
//                 formatter(val) {
//                     return `Quantity ${val}`;
//                 },
//             },
//         },
//         fill: {
//             opacity: 1,
//         },
//         colors: ['#005eee', '#5087f1'],
//         legend: {
//             show: true,
//             position: 'bottom',
//             horizontalAlign: 'center',
//             offsetX: 40,
//         },
//     };

//     useEffect(() => {
//         setStackData([
//             { name: 'Remaining', data: data[0] || [] },
//             { name: 'Used', data: data[1] || [] },
//         ]);
//         setStackLabel(data[2] || []);
//     }, [data]);

//     return (
//         <div className="box-container" style={{ minHeight: '250px' }}>
//             <div className="box-heading box-heading-dash">POSM Usage</div>
//             <div style={{ width: '100%' }}>
//                 {/* data render */}
//                 <ReactApexChart
//                     options={stackedOptions}
//                     series={stackData}
//                     type="bar"
//                     width="100%"
//                     height={232}
//                 />
//             </div>
//             <div className="chart-button-container" style={{ top: '-5px' }}>
//                 <Tooltip placement="bottomRight" title={info}>
//                     <Button size="small" type="primary" shape="circle" icon={<InfoOutlined />} />
//                 </Tooltip>
//             </div>
//         </div>
//     );
// }

// export default SummaryChart;
