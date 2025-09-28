import { InfoOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';

import ProgressCircle from '../../../components/ProgressCircle';

function OutletWiseCompliance({ outletWiseCompliance, nationalOutletWiseCompliance }) {
    // tooltip content
    const text = (
        <div style={{ textAlign: 'center' }}>
            <span
                className="tooltip-custom-text"
                style={{
                    textDecoration: 'underline',
                    fontSize: '18px',
                }}
            >
                National
            </span>
            {nationalOutletWiseCompliance
                ?.filter((x) => x.name !== 'DS' && x.name !== 'QPDS')
                ?.map((x) => (
                    <React.Fragment key={x.name}>
                        {x.name === 'QPDS' ? (
                            <span className="tooltip-custom-text">
                                {x.name} :{x.quantity}%
                            </span>
                        ) : (
                            <span className="tooltip-custom-text">
                                {x.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{x.quantity}%
                            </span>
                        )}
                    </React.Fragment>
                ))}
        </div>
    );

    const styles = {
        BS: {
            label: 'Perfect Store',
            colors: {
                '0%': '#25AADA',
                '100%': '#1694DA',
            },
        },
        NS: {
            label: 'Nutrition Store',
            colors: {
                '0%': '#5758BD',
                '100%': '#4F4AA8',
            },
        },
        'LUX BODYWASH QPDS': {
            label: 'Lux Bodywash',
            colors: {
                '0%': 'rgba(29, 73, 234, 0.5)', // Blue with opacity
                '100%': 'rgba(29, 73, 234, 1)', // Blue
            },
        },
        'VIM LIQUID DISPLAY': {
            label: 'Vim Liquid',
            colors: {
                '0%': '#894FAF',
                '100%': '#087FF5',
            },
        },
        'ORAL CARE QPDS': {
            label: 'Oral Care',
            colors: {
                '0%': '#00E396',
                '100%': '#00E396',
            },
        },
        DS: {
            label: 'Drug Store',
            colors: {
                '0%': '#F52F71',
                '100%': '#FBA32D',
            },
        },
        'Pepsodent QPDS': {
            label: 'Pepsodent QPDS',
            colors: {
                '0%': '#894FAF',
                '100%': '#087FF5',
            },
        },
        'Laabher Bazar QPDS': {
            label: 'Laabher Bazar QPDS',
            colors: {
                '0%': '#F52F71',
                '100%': '#FBA32D',
            },
        },
    };

    // chart data
    const data = outletWiseCompliance
        ?.map((x) => ({
            id: crypto.randomUUID(),
            ...styles[x.name],
            data: x.quantity,
        }))
        ?.filter((x) => x.label !== 'Drug Store');

    function calculateWidth() {
        const windowWidth = window.innerWidth;
        return windowWidth <= 650 ? '260px' : '260px';
    }

    return (
        <div className="box-container h-fit">
            <div className="box-heading box-heading-dash">Program Wise Compliance</div>
            <Space
                wrap
                align="center"
                className="my-4 gap-8 px-5 pb-2 justify-center items-center w-full"
            >
                {data.map((doc) => (
                    <ProgressCircle
                        key={doc.id}
                        label={doc.label}
                        data={doc.data}
                        colors={doc.colors}
                    />
                ))}
            </Space>
            <div className="chart-button-container" style={{ top: '-5px' }}>
                <Tooltip placement="bottomRight" title={text}>
                    <Button size="small" type="primary" shape="circle" icon={<InfoOutlined />} />
                </Tooltip>
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 5 }}>
                <p
                    style={{
                        margin: 0,
                        fontSize: '15px',
                        padding: '5px 5px 0 5px',
                        textAlign: 'right',
                    }}
                >
                    Based On <br /> Planned VS AI Detected
                </p>
            </div>
        </div>
    );
}

export default OutletWiseCompliance;
