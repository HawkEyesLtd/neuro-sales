import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function OutletCoveredByDate({ data }) {
    const [barData, setBarData] = useState([]);
    const barOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            },
        },
        fill: {
            colors: ['#FAAD14'],
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#000000'],
                fontWeight: 'normal',
            },
        },
        xaxis: {
            categories: data?.map(({ material }) => material?.name) || [],
            colors: '#fff',
        },
    };

    useEffect(() => {
        setBarData([
            {
                name: 'Quantity',
                data: data?.map(({ total }) => total) || [],
            },
        ]);
    }, [data]);

    return (
        <div className="box-container" style={{ minHeight: '250px' }}>
            <div className="box-heading">Material Usages</div>
            <div style={{ width: '100%' }}>
                {/* data render */}
                <ReactApexChart
                    options={barOptions}
                    series={barData}
                    type="bar"
                    width="100%"
                    height={250}
                />
            </div>
        </div>
    );
}

export default OutletCoveredByDate;
