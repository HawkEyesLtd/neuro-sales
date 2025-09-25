import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function StrikeRateByDate({ strikeRateData }) {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('Strike Rate');

    const options = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        title: {
            text: activeButton,
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#0050a4',
            },
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `${val}%`;
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: strikeRateData?.labels || [],
        },
    };

    useEffect(() => {
        setData(strikeRateData?.legend?.filter((x) => x.kind === activeButton) || []);
    }, [strikeRateData, activeButton]);

    function commonButton({ background, txt }) {
        return (
            <button
                key={txt}
                onClick={() => setActiveButton(txt)}
                style={{ background }}
                type="button"
                className="common-chart-button"
            >
                {txt}{' '}
                {activeButton === txt ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: '10px' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: '10px' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                )}
            </button>
        );
    }

    const buttonData = [
        {
            txt: 'Strike Rate',
            background: 'linear-gradient(to right, #33C1DA , #198CDA)',
        },
        // {
        //     txt: 'ECO',
        //     background: 'linear-gradient(to right, #345987 , #00447F)',
        // },
    ];

    return (
        <div className="box-container" style={{ height: '260px' }}>
            <div style={{ width: '100%', position: 'relative' }}>
                {/* data render */}
                <ReactApexChart options={options} series={data} type="area" height={250} />
                {/* <div className="chart-button-container">
                    <Space>{buttonData.map((item, i) => commonButton(item))}</Space>
                </div> */}
            </div>
        </div>
    );
}

export default StrikeRateByDate;
