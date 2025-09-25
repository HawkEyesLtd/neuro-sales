import { InfoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import CountUp from 'react-countup';

import chartIcon from '../../../assets/donut-chart.png';

function Compliance({ compliance, nationalCompliance }) {
    // tooltip content
    const text = (
        <div style={{ textAlign: 'center' }}>
            <span
                style={{
                    fontSize: '25px',
                    display: 'block',
                    fontWeight: 700,
                    marginBottom: '-10px',
                }}
            >
                {nationalCompliance || 0}%
            </span>
            {/* <br /> */}
            <span>National</span>
        </div>
    );

    return (
        <div className="box-container" style={{ height: '260px' }}>
            <div className="box-heading box-heading-dash">Compliance</div>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={chartIcon} alt="" width="90" />
                <h2 className="strike-rate-item">
                    <CountUp end={compliance || 0} />%
                </h2>
            </div>
            <div className="chart-button-container" style={{ top: '-5px' }}>
                <Tooltip placement="bottomRight" title={text}>
                    <Button size="small" type="primary" shape="circle" icon={<InfoOutlined />} />
                </Tooltip>
            </div>
        </div>
    );
}

export default Compliance;
