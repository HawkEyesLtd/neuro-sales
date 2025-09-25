import CountUp from 'react-countup';

function OutletStatus({ outletStatus }) {
    function singleLegend(name, color) {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '2px',
                        background: color,
                        marginRight: '3px',
                    }}
                />
                <p className="legend-text" style={{ fontSize: '12px' }}>
                    {name}
                </p>
            </div>
        );
    }

    function circleBox(params) {
        return (
            <div key={params.id} className="chart-round-box" style={{ ...params }}>
                <CountUp end={params.txt} />
            </div>
        );
    }

    const styleData = {
        Passed: {
            background: 'linear-gradient(to right, #493F98 , #606BDC)',
            width: '180px',
            height: '180px',
            top: 0,
        },
        Failed: {
            background: 'linear-gradient(to right, #F89837 , #EE366F)',
            width: '95px',
            height: '95px',
            top: 100,
            right: 0,
            zIndex: 100000,
        },
    };

    const graphData = outletStatus?.map((x) => ({
        id: crypto.randomUUID(),
        txt: x.quantity,
        ...styleData[x.name],
    }));

    return (
        <div className="box-container" style={{ height: '260px' }}>
            <div className="box-heading box-heading-dash">Outlet Status</div>
            <div className="compliance-chart-container">
                <div style={{ position: 'relative' }}>
                    {graphData.map((doc) => circleBox(doc))}
                    {/* {circleBox({
                        txt: '19,159',
                        background: '#9333ea',
                        width: '180px',
                        height: '180px',
                        top: 0,
                    })}
                    {circleBox({
                        txt: '4293',
                        background: '#FD524F',
                        width: '20px',
                        height: '20px',
                        top: 100,
                        right: '10px',
                    })} */}
                </div>
            </div>
            {/* legend */}
            <div className="single-legend-container">
                {singleLegend('Passed', '#4A449E')}
                {singleLegend('Failed', '#EF465F')}
            </div>
        </div>
    );
}

export default OutletStatus;
