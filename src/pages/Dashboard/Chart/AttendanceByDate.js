import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function AttendanceByDate({ attendanceData }) {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('CM');

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
        tooltip: {
            y: {
                formatter(val) {
                    return `${val}%`;
                },
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
            text: `${activeButton} Attendance`,
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#0050a4',
            },
        },
        grid: {
            row: {
                colors: ['transparent'], // takes an array which will be repeated on columns
                opacity: 0.4,
            },
        },
        xaxis: {
            categories: attendanceData?.labels || [],
        },
    };

    useEffect(() => {
        setData(attendanceData?.legend?.filter((x) => x.userType === activeButton) || []);
        // setData([
        //     {
        //         name: 'Dhaka',
        //         data: [110, 141, 350, 51, 149, 162, 169, 191, 148],
        //     },
        //     {
        //         name: 'Barishal',
        //         data: [220, 30, 20, 32, 37, 20, 20, 25, 32],
        //     },
        //     {
        //         name: 'Khulna',
        //         data: [400, 100, 380, 130, 37, 27, 48, 32, 36],
        //     },
        //     {
        //         name: 'Rajshahi',
        //         data: [150, 135, 148, 156, 155, 140, 145, 150, 148],
        //     },
        // ]);
    }, [activeButton, attendanceData]);

    function commonButton({ background, txt }) {
        return (
            <button
                key={txt}
                onClick={() => setActiveButton(txt === 'MS' ? 'MS' : txt)}
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
            txt: 'CM',
            background: 'linear-gradient(to right, #00BCD8 , #0083D8)',
        },
        {
            txt: 'MS',
            background: 'linear-gradient(to right, #88A4F4 , #0164EF)',
        },
        {
            txt: 'WMA',
            background: 'linear-gradient(to right, #FCA925 , #F3005D)',
        },
        // {
        //     txt: 'CC',
        //     background: 'linear-gradient(to right, #61BD9C , #67BF9E)',
        // },
        // {
        //     txt: 'MT CM',
        //     background: 'linear-gradient(to right, #345987 , #00447F)',
        // },
    ];

    return (
        <div className="box-container" style={{ height: '260px' }}>
            <div style={{ width: '100%', position: 'relative' }}>
                {/* data render */}
                <ReactApexChart options={options} series={data} type="line" height={250} />
                {/* <div className="chart-button-container">
                    <Space>{buttonData.map((item, i) => commonButton(item))}</Space>
                </div> */}
            </div>
        </div>
    );
}

export default AttendanceByDate;
