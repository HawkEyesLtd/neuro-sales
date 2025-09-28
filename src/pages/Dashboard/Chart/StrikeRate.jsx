import CountUp from 'react-countup';

import statisticIcon from '../../../assets/statistics.png';

function StrikeRate({ strikeRate }) {
    return (
        <div className="box-container" style={{ height: '290px' }}>
            <div className="box-heading box-heading-dash">Strike Rate</div>
            <div className="place-items-center">
                <img src={statisticIcon} alt="" width="90" />
                <h2 className="strike-rate-item text-[60px] md:text-[70px] lg:text-[80px]">
                    <CountUp end={strikeRate || 0} />%
                </h2>
                <div style={{ position: 'absolute', bottom: 0, right: 5 }}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '12px',
                            padding: '5px 5px 0 5px',
                            textAlign: 'right',
                        }}
                    >
                        Strike is Calculating <br /> Based on the SOS task
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StrikeRate;
