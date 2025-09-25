import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import {
    setChannel,
    setCompleteVisit,
    setMonth,
    setOutletCode,
    setQpdsName,
    setVisited,
} from '../../redux/features/interim/interimQpdsFilterSlice';

function InterimFilterQpds({ queryFunc, loading, downloadButton }) {
    const { outletcode, month } = useSelector((state) => state.interimQpdsFilter);

    const dispatch = useDispatch();

    // user information
    const { user } = useSelector((state) => state.auth);
    const projectAccessData = user?.projectAccess?.map((x) => ({ label: x, value: x }));

    const monthChange = (_, dateString) => {
        dispatch(setMonth(dateString));
    };

    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Visited"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setVisited(e))}
                    options={[
                        {
                            value: 'Yes',
                            label: 'Yes',
                        },
                        {
                            value: 'No',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Completed Visit"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setCompleteVisit(e))}
                    options={[
                        {
                            value: 1,
                            label: '1',
                        },
                        {
                            value: 2,
                            label: '2',
                        },
                        {
                            value: 3,
                            label: '3',
                        },
                        {
                            value: 4,
                            label: '4',
                        },
                        {
                            value: 5,
                            label: '5',
                        },
                        {
                            value: 6,
                            label: '6',
                        },
                        {
                            value: 7,
                            label: '7',
                        },
                        {
                            value: 8,
                            label: '8',
                        },
                        {
                            value: 9,
                            label: '9',
                        },
                        {
                            value: 10,
                            label: '10',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Channel"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setChannel(e))}
                    options={[
                        {
                            value: 'UNG',
                            label: 'UNG',
                        },
                        {
                            value: 'UWMG',
                            label: 'UWMG',
                        },
                        {
                            value: 'UHPCT',
                            label: 'UHPCT',
                        },
                        {
                            value: 'UCS',
                            label: 'UCS',
                        },
                        {
                            value: 'UGS',
                            label: 'UGS',
                        },
                        {
                            value: 'DS',
                            label: 'DS',
                        },
                        {
                            value: 'WS',
                            label: 'WS',
                        },
                        {
                            value: 'OH',
                            label: 'OH',
                        },
                        {
                            value: 'HOTEL',
                            label: 'HOTEL',
                        },
                        {
                            value: 'E-COMM',
                            label: 'E-COMM',
                        },
                        {
                            value: 'CDO',
                            label: 'CDO',
                        },
                        {
                            value: 'FOOD',
                            label: 'FOOD',
                        },
                        {
                            value: 'RWMG',
                            label: 'RWMG',
                        },
                        {
                            value: 'RNG',
                            label: 'RNG',
                        },
                        {
                            value: 'RCS',
                            label: 'RCS',
                        },
                        {
                            value: 'PGS',
                            label: 'PGS',
                        },
                        {
                            value: 'POLLYDUT',
                            label: 'POLLYDUT',
                        },
                        {
                            value: 'CDOW',
                            label: 'CDOW',
                        },
                        {
                            value: 'RMG STORES',
                            label: 'RMG STORES',
                        },
                        {
                            value: 'RMGGROCER',
                            label: 'RMGGROCER',
                        },
                        {
                            value: 'SSS',
                            label: 'SSS',
                        },
                        {
                            value: 'CDOM',
                            label: 'CDOM',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="QPDS Name"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setQpdsName(e))}
                    options={[
                        {
                            value: 'Pepsodent QPDS',
                            label: 'Pepsodent QPDS',
                        },
                        {
                            value: 'Laabher Bazar QPDS',
                            label: 'Laabher Bazar QPDS',
                        },
                        {
                            value: 'Winter Lotion QPDS',
                            label: 'Winter Lotion QPDS',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={outletcode}
                    placeholder="Outlet Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setOutletCode(e.target.value))}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <DatePicker
                    value={month ? dayjs(month) : dayjs()}
                    size="large"
                    style={{ width: '100%' }}
                    onChange={monthChange}
                    picker="month"
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <CommonButton
                    loading={loading}
                    queryFunc={() => queryFunc(1, 10, 'cleanShowResultOnPage')}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    className="filter-btn"
                    icon={<DownloadOutlined />}
                    danger
                    type="primary"
                    onClick={() => {
                        downloadButton({
                            url: '/v1/report/interim-report-qpds',
                            fileName: 'Interim QPDS Report.xlsx',
                        });
                    }}
                >
                    Download
                </Button>
            </Col>
        </>
    );
}

export default InterimFilterQpds;
