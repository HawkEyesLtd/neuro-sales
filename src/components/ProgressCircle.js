import { Progress } from 'antd';
import CountUp from 'react-countup';

function RenderFormatValue({ val, label }) {
    return (
        <>
            <span
                style={{
                    display: 'block',
                    fontWeight: 800,
                    color: '#4d4d4d',
                    marginBottom: '-10px',
                }}
            >
                <CountUp end={val} />%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 400 }}>{label}</span>
        </>
    );
}

function ProgressCircle({
    size = 'default',
    data = 0,
    colors = {
        '0%': '#8464EE',
        '100%': '#697BFD',
    },
    label = '',
    margin = 0,
}) {
    return (
        <div style={{ display: 'block', marginRight: margin, textAlign: 'center' }}>
            <Progress
                animation="true"
                size={size}
                type="circle"
                status="active"
                percent={data}
                strokeWidth={12}
                strokeColor={colors}
                format={(percent) => <RenderFormatValue val={percent} label={label} />}
                className="dashboard-progress-circle"
            />
        </div>
    );
}

export default ProgressCircle;
