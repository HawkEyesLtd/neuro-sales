import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function PosmUsages({ posmUsage }) {
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
        colors: ['#5453B6', '#3B3D4C'],
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'center',
            offsetX: 40,
        },
    };

    useEffect(() => {
        setStackData([
            { name: 'Used Qty', data: posmUsage?.map((x) => x.usedQty) || [] },
            { name: 'Assign Qty', data: posmUsage?.map((x) => x.assignedQty) || [] },
        ]);
        setStackLabel(posmUsage?.map((x) => x.name) || []);
    }, [posmUsage]);

    return (
        <div className="box-container" style={{ minHeight: '250px' }}>
            <div className="box-heading box-heading-dash">POSM Usages</div>
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

export default PosmUsages;
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
