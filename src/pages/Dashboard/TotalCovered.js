import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const colors2 = [
    // 'ea',
    '#2C73D2',
    '#0081CF',
    '#0089BA',
    '#008E9B',
    '#008F7A',
    '#00C9A7',
    '#00C9A7',
    '#C4FCEF',
    '#4D8076',
    '#00C2A8',
    '#008B74',
    '#00C0A3',
    '#2C73D2',
    '#0081CF',
    '#0089BA',
    '#008E9B',
    '#008F7A',
    '#00C9A7',
    '#00C9A7',
    '#C4FCEF',
    '#4D8076',
    '#00C2A8',
    '#008B74',
    '#00C0A3',
    '#2C73D2',
    '#0081CF',
    '#0089BA',
    '#008E9B',
    '#008F7A',
    '#00C9A7',
    '#00C9A7',
    '#C4FCEF',
    '#4D8076',
    '#00C2A8',
    '#008B74',
    '#00C0A3',
    '#2C73D2',
    '#0081CF',
    '#0089BA',
    '#008E9B',
    '#008F7A',
    '#00C9A7',
    '#00C9A7',
    '#C4FCEF',
    '#4D8076',
    '#00C2A8',
    '#008B74',
    '#00C0A3',
];

function CustomTooltip({ active, payload }) {
    if (payload) {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <h6 style={{ marginBottom: '5px' }}>{payload[0]?.payload?.name || ''}</h6>
                    <p>{payload[0]?.payload?.value || ''} Covered</p>
                </div>
            );
        }
    }
    return null;
}

const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
        <g>
            <text
                x={x + width / 2}
                y={y - radius}
                fill="#4a4949"
                offset={10}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {value}
            </text>
        </g>
    );
};

function TotalCovered({ data }) {
    if (!data) return null;
    return (
        <div style={{ height: '100%' }}>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid stroke="#dbdbdb" />
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[0, 100]}
                        tick={{ fill: '#5c5b5b', fontFamily: 'sans-serif' }}
                        tickFormatter={(number) => `${number}`}
                        tickCount={5}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: '#ffe8642e' }}
                        wrapperStyle={{ outline: 'none' }}
                    />
                    <Legend
                        iconSize={14}
                        wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
                        layout="horizontal"
                        verticalAlign="bottom"
                        payload={data.map((item, index) => ({
                            id: item.name,
                            type: 'square',
                            value: `${item.name}`,
                            color: colors2[index % colors2.length],
                        }))}
                    />
                    <Bar dataKey="value" fill="#3366CC" radius={[5, 5, 0, 0]}>
                        <LabelList dataKey="value" fill="#fff" />
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors2[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TotalCovered;
