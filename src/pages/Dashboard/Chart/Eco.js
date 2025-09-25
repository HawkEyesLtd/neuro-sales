import CountUp from 'react-countup';

import settingIcon from '../../../assets/setting.png';

function Eco({ eco }) {
    return (
        <div className="box-container" style={{ height: '260px' }}>
            <div className="box-heading box-heading-dash">ECO</div>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={settingIcon} alt="" width="90" />
                <h2 className="strike-rate-item">
                    <CountUp end={eco || 0} />%
                </h2>
            </div>
        </div>
    );
}

export default Eco;
