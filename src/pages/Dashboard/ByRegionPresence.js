import { useState } from 'react';

import ProgressCircle from '../../components/ProgressCircle';

function ByRegionPresence() {
    const [value, setValue] = useState({
        Dhaka: 0,
        Barishal: 0,
        Rajshahi: 0,
    });

    setTimeout(() => {
        setValue({
            Dhaka: 80,
            Barishal: 90,
            Rajshahi: 75,
        });
    }, 1000);
    return (
        <div className="box-container">
            <div className="box-heading">By Cluster Presence</div>
            <div className="box-body">
                {/* data render */}
                <ProgressCircle
                    label="Dhaka"
                    data={value.Dhaka}
                    margin={15}
                    colors={{ '0%': '#D33FC7', '100%': '#F92779' }}
                />
                <ProgressCircle
                    label="Barishal"
                    data={value.Barishal}
                    margin={15}
                    colors={{ '0%': '#8464EE', '100%': '#697BFD' }}
                />
                <ProgressCircle
                    label="Rajshahi"
                    data={value.Rajshahi}
                    colors={{ '0%': '#4477F9', '100%': '#25D4ED' }}
                />
            </div>
            <div className="box-footer-container">
                <p className="box-footer-content">Total 12,500 Execution Done</p>
            </div>
        </div>
    );
}

export default ByRegionPresence;
