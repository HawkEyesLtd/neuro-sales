import ReactApexChart from 'react-apexcharts';

function AttendanceBar({ attendance }) {
    const legendUppercase = {
        present: 'Present',
        leave: 'Leave',
        absent: 'Absent',
    };
    const pieData = Object.keys(attendance || {})
        ?.filter((x) => x !== 'name' && x !== 'total')
        ?.map((x) => attendance[x]) || [0, 0];
    // const pieData = [];
    const pieOptions = {
        chart: {
            type: 'donut',
            background: 'transparent',
        },
        labels:
            Object.keys(attendance || {})
                ?.filter((x) => x !== 'name' && x !== 'total')
                ?.map((x) => legendUppercase[x]) || [],
        // [],
        responsive: [
            {
                breakpoint: 3000,
                options: {
                    chart: {
                        width: 290,
                        is3d: true,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    legend: {
                        show: true,
                        position: 'bottom',
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
                        width: 290,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 1000,
                options: {
                    chart: {
                        width: 280,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 600,
                options: {
                    chart: {
                        width: 260,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 500,
                options: {
                    chart: {
                        width: 220,
                    },
                    legend: {
                        position: 'bottom',
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
            width: 0.1,
        },
        colors: ['#3F7EEE', '#00BCD8', '#5251B7'],
        // title: {
        //     text: 'PJP Outlet Coverage',
        //     align: 'left',
        //     style: {
        //         fontSize: '18px',
        //         fontWeight: 'bold',
        //         color: '#0050a4',
        //     },
        // },
    };

    return (
        <div className="box-container" style={{ height: '290px' }}>
            <div className="box-heading box-heading-dash">{attendance.name || ''} Attendance</div>
            <div className="box-body">
                {/* data render */}
                <ReactApexChart colors="true" options={pieOptions} series={pieData} type="donut" />
            </div>

            {/* customize legend */}
            {/* {legendData?.map((doc) => (
                <Legend data={doc} key={doc.id} />
            ))} */}
        </div>
    );
}

export default AttendanceBar;
