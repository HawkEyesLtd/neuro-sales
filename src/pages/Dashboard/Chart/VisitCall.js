import React from 'react';
import CountUp from 'react-countup';

function VisitCall({ visitCallData, totalVisitCall }) {
    const styles = {
        FAT: {
            name: 'Fixed Asset Tracking',
            color1: '#5DBD9B',
            color2: '#5DBD9B',
        },
        POSM: {
            name: 'POSM Execution',
            color1: '#FB992E',
            color2: '#F33170',
        },
        SOS: {
            name: 'Share Of Shelf',
            color1: '#134D82',
            color2: '#134D82',
        },
        DA: {
            name: 'PS & NS Display Audit',
            color1: '#493F97',
            color2: '#616ADA',
        },
        QPDS: {
            name: 'QPDS',
            color1: '#7D9EF3',
            color2: '#1D6DEF',
        },
        SACHET: {
            name: 'Share of Sachet',
            color1: '#F33180',
            color2: '#FB792E',
        },
    };

    // graph data
    const data = visitCallData?.map((x) => ({
        id: crypto.randomUUID(),
        data: x.quantity,
        mapped: x.mapped,
        ...styles[x.name],
    }));

    const stylesClasses = {
        visitCallItem: {
            fontSize: window.innerWidth <= 750 ? '10px' : '16px',
            margin: 0,
        },
        linearText: {
            fontSize: window.innerWidth <= 750 ? '20px' : '50px',
        },
    };

    return (
        <div className="box-container min-h-[250px] h-fit">
            <div className="box-heading box-heading-dash">Visibility Tracker</div>
            <div
                className="box-body"
                style={{
                    alignItems: 'center',
                    height: '85%',
                    justifyContent: 'space-around',
                    width: '100%',
                    padding: '0 30px',
                    flexWrap: 'wrap',
                    gap: '20px',
                    paddingBottom: '30px',
                }}
            >
                {data?.map((x, i) => (
                    <React.Fragment key={x.id}>
                        <div>
                            <h1
                                className="linearText"
                                style={{
                                    ...stylesClasses.linearText,
                                    fontWeight: 900,
                                    background: `linear-gradient(to right, ${x.color1}, ${x.color2})`,
                                    backgroundClip: 'text',
                                    margin: '0 0 10px 0',
                                }}
                            >
                                <CountUp end={x.data} />
                            </h1>
                            <p style={stylesClasses.visitCallItem}>{x.name}</p>
                            <p style={stylesClasses.visitCallItem}>
                                (<CountUp end={x.mapped} />)
                            </p>
                        </div>

                        {i !== (data.length - 1 || 0) && window.innerWidth > 750 && (
                            <div
                                style={{
                                    height: '120px',
                                    width: '1px',
                                    background: '#cdcdcd',
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="absolute top-2 right-3 text-md">
                <p>
                    Total Visit Call:{' '}
                    <span className="font-bold text-[16px]">
                        <CountUp end={totalVisitCall} />{' '}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default VisitCall;
