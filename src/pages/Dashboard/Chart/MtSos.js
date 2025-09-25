import { useEffect, useState } from 'react';

function MtSos({ mtSosData, overAll, totalCount }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const determineFontSize = () => {
        if (windowWidth <= 750) {
            return '10px';
        }
        return '13px';
    };

    const determineLinearTextFontSize = () => {
        if (windowWidth <= 750) {
            return '20px';
        }
        return '50px';
    };

    // Styles object containing colors
    const styles = {
        0: {
            color1: '#5DBD9B',
            color2: '#5DBD9B',
        },
        1: {
            color1: '#FB992E',
            color2: '#F33170',
        },
        2: {
            color1: '#134D82',
            color2: '#134D82',
        },
        3: {
            color1: '#493F97',
            color2: '#616ADA',
        },
        4: {
            color1: '#7D9EF3',
            color2: '#1D6DEF',
        },
        5: {
            color1: '#F67D5F',
            color2: '#F67D5F',
        },
        6: {
            color1: '#42A4FF',
            color2: '#42A4FF',
        },
        7: {
            color1: '#FF7E47',
            color2: '#FF7E47',
        },
        8: {
            color1: '#6EDB8E',
            color2: '#6EDB8E',
        },
        9: {
            color1: '#D54747',
            color2: '#D54747',
        },
        10: {
            color1: '#FFD94A',
            color2: '#FFD94A',
        },
        11: {
            color1: '#75C3B6',
            color2: '#75C3B6',
        },
        12: {
            color1: '#A77DD1',
            color2: '#A77DD1',
        },
        13: {
            color1: '#FFA07A',
            color2: '#FFA07A',
        },
        14: {
            color1: '#C5A4F5',
            color2: '#C5A4F5',
        },
        15: {
            color1: '#4AC6B7',
            color2: '#4AC6B7',
        },
        16: {
            color1: '#FF75B5',
            color2: '#FF75B5',
        },
        17: {
            color1: '#6A95EB',
            color2: '#6A95EB',
        },
        18: {
            color1: '#F98C5D',
            color2: '#F98C5D',
        },
        19: {
            color1: '#5FCBF6',
            color2: '#5FCBF6',
        },
        20: {
            color1: '#89E56A',
            color2: '#89E56A',
        },
        21: {
            color1: '#FF6961',
            color2: '#FF6961',
        },
        22: {
            color1: '#A5C5FF',
            color2: '#A5C5FF',
        },
        23: {
            color1: '#FFAC4B',
            color2: '#FFAC4B',
        },
        24: {
            color1: '#60D68A',
            color2: '#60D68A',
        },
    };

    // Determine how many items to display in a row based on window width
    const itemsPerRow = windowWidth <= 750 ? 3 : 5;

    // Divide data into rows based on itemsPerRow
    const rows = [];
    for (let i = 0; i < mtSosData.length; i += itemsPerRow) {
        rows.push(mtSosData.slice(i, i + itemsPerRow));
    }

    return (
        <div className="box-container" style={{ height: 'auto', marginBottom: '20px' }}>
            <div className="box-heading box-heading-dash">MTM Visibility</div>
            <div className="box-body" style={{ display: 'flex', flexDirection: 'column' }}>
                {rows.map((row, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            padding: '10px 30px',
                            marginBottom: '10px',
                            width: '100%',
                        }}
                    >
                        {row.map((x, i) => (
                            <>
                                <div
                                    key={x.id}
                                    style={{
                                        // width: `${100 / itemsPerRow}%`,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: '10px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <div>
                                        <h1
                                            className="linearText"
                                            style={{
                                                fontSize: determineLinearTextFontSize(),
                                                fontWeight: 900,
                                                background: `linear-gradient(to right, ${styles[i].color1}, ${styles[i].color2})`,
                                                backgroundClip: 'text',
                                                margin: '0 0 10px 0',
                                            }}
                                        >
                                            {x.avgPercentage.toFixed(1)}%
                                        </h1>
                                        <p style={{ fontSize: determineFontSize() }}>
                                            {x.category}
                                        </p>
                                    </div>
                                </div>
                                {i !== (row.length - 1 || 0) && window.innerWidth > 750 && (
                                    <div
                                        style={{
                                            height: '120px',
                                            width: '1px',
                                            background: '#cdcdcd',
                                            // marginTop: '20px',
                                        }}
                                    />
                                )}
                            </>
                        ))}
                    </div>
                ))}
            </div>
            <div className="chart-button-container2">
                <div style={{ textAlign: 'right', padding: '0px 10px 10px 10px' }}>
                    <p style={{ margin: 0, fontSize: '12px' }}>Total MT SOS Call:</p>
                    <p style={{ fontSize: '15px', fontWeight: 700 }}>
                        {totalCount.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="chart-button-container">
                <div style={{ textAlign: 'right', padding: '0px 10px 10px 10px' }}>
                    <p style={{ margin: 0, fontSize: '12px' }}>Overall MT SOS:</p>
                    <p style={{ fontSize: '15px', fontWeight: 700 }}>{overAll.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

export default MtSos;
