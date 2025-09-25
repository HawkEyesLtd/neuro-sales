import { Space } from 'antd';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import CountUp from 'react-countup';

function Sos({ sosData, totalSosVisit }) {
    const lablesData = {
        'Reckitt Benckser': 'RKB',
        'Abul Khair': 'ABK',
        'ARLA FOODs': 'ARF',
        'Advanced Chemical Industries Limited': 'ACI',
        'Anfords BD LTD': 'ANFB',
        'Unilever Bangladesh Limited': 'UBL',
        'Keya Cosmetic Ltd': 'KEYA',
        'Kohinoor Chemical Ltd': 'KHNC',
        'Square Toiletries Ltd': 'SQRT',
        'Sun Basic Chemicals Ltd': 'SBCL',
        'Rohit Surfactants Pvt Ltd': 'RSPL',
        'Marico Bangladesh Ltd	': 'MBL',
        'Emami Ltd': 'EML',
        'Himalaya Global Ltd': 'HGL',
        'Transcom Distribution': 'TRD',
        Himalaya: 'HGL',
        Unilever: 'UBL',
        ACI: 'ACI',
    };

    // pie chart data
    const pieOptions = {
        chart: {
            width: 350,
            type: 'donut',
            background: 'transparent',
        },

        responsive: [
            {
                breakpoint: 1500,
                options: {
                    chart: {
                        width: 300,
                    },
                },
            },
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        width: 250,
                    },
                },
            },
            {
                breakpoint: 1100,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: 180,
                    },
                },
            },
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],

        stroke: {
            width: 0,
            colors: ['#F44336', '#1D49EA', '#E91E63', '#9C27B0', '#9C27FE'],
        },
        legend: {
            show: false,
            position: 'left',
        },
        dataLabels: {
            enabled: true,
            formatter(val, r) {
                return `${lablesData[r.w.config.labels[r.seriesIndex]]} ${Math.round(val)}%`;
            },
        },
    };

    // pie options
    const pieOptionsData = sosData?.map((x) => ({ labels: [...x.labels], ...pieOptions }));

    return (
        <div className="box-container h-fit">
            <div className="box-heading box-heading-dash">Share Of Shelf</div>
            <div className="box-body">
                {/* data render */}
                <Space wrap align="center" className="justify-center">
                    {sosData?.map((item, i) => (
                        <React.Fragment key={item.name}>
                            <div>
                                <p
                                    style={{
                                        margin: '0 0 -15px 0',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#0050a4',
                                    }}
                                >
                                    {item.name}
                                </p>
                                <ReactApexChart
                                    options={pieOptionsData[i] || {}}
                                    series={item.data}
                                    type="pie"
                                />
                            </div>

                            {/* Devider Between two charts */}
                            {i !== (sosData.length - 1 || 0) && window.innerWidth > 750 && (
                                <div
                                    style={{
                                        height: '170px',
                                        width: '1px',
                                        background: '#cdcdcd',
                                        marginTop: '20px',
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </Space>
            </div>

            <div className="absolute top-2 right-3 text-md">
                <p>
                    Total SOS Visit:{' '}
                    <span className="font-bold text-[16px]">
                        <CountUp end={totalSosVisit} />{' '}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Sos;
