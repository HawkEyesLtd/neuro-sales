import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function DisplayWiseOutletResult({ displayData }) {
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
                    return `${val}`;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        colors: ['#5250B2', '#F87447'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 40,
        },
    };

    useEffect(() => {
        setStackData([
            { name: 'Passed', data: displayData?.map((x) => x.passed) || [] },
            { name: 'Failed', data: displayData?.map((x) => x.failed) || [] },
        ]);

        setStackLabel(displayData?.map((x) => x._id) || []);
    }, [displayData]);

    return (
        <div className="box-container" style={{ minHeight: '215px' }}>
            <div className="box-heading box-heading-dash">Display Wise Outlet Result</div>
            <div style={{ width: '100%' }}>
                {/* data render */}
                <ReactApexChart
                    options={stackedOptions}
                    series={stackData}
                    type="bar"
                    width="100%"
                    height={215}
                />
            </div>
        </div>
    );
}

export default DisplayWiseOutletResult;
// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { InfoOutlined } from '@ant-design/icons';
// import { Button, Tooltip } from 'antd';

// function PosmUsages({ posmUsage }) {
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
//         colors: ['#5453B6', '#3B3D4C'],
//         legend: {
//             show: false,
//             position: 'top',
//             horizontalAlign: 'center',
//             offsetX: 40,
//         },
//     };

//     useEffect(() => {
//         setStackData([
//             { name: 'Used Qty', data: posmUsage?.map((x) => x.usedQty) || [] },
//             { name: 'Remaining Qty', data: posmUsage?.map((x) => x.remaining) || [] },
//         ]);
//         setStackLabel(posmUsage?.map((x) => x.name) || []);
//     }, [posmUsage]);

//     const info = (
//         <div style={{ fontSize: '10px' }}>
//             <span>
//                 Used = Used in field + damage during day end and return + lost during dey end and
//                 return.
//             </span>
//             <br />
//             <span>Remaining = Town in hand + ff in hand.</span>
//         </div>
//     );

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
//                     height={250}
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

// export default PosmUsages;
