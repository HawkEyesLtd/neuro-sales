import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import { displayChannel, displayItems } from '../../constents/interim';
import {
    setChannel,
    setCompleteVisit,
    setDisplayItems,
    setMonth,
    setOutletCode,
    setScheduledVisit,
} from '../../redux/features/interim/interimFilterSlice';

function InterimFilter({ queryFunc, loading, downloadButton }) {
    const {
        outletcode,
        month,
        displayItems: selectedItems,
    } = useSelector((state) => state.interimFilter);

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
                    placeholder="Scheduled Visit"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setScheduledVisit(e))}
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
                    options={displayChannel}
                />
            </Col>
            {/* <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Outlet Type"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setOutletType(e))}
                    options={outletTypes}
                />
            </Col> */}
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
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                <Select
                    allowClear
                    placeholder="Display Items"
                    mode="multiple"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setDisplayItems(e))}
                    options={displayItems}
                    defaultValue={selectedItems}
                    maxTagCount="responsive"
                />
            </Col>
            {/* <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Status"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setPassedOrFailed(e))}
                    options={[
                        {
                            value: 'Passed',
                            label: 'Passed',
                        },
                        {
                            value: 'Failed',
                            label: 'Failed',
                        },
                    ]}
                />
            </Col> */}
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
                            url: '/v1/report/interim',
                            fileName: 'Interim Report.xlsx',
                        });
                    }}
                >
                    Download
                </Button>
            </Col>
        </>
    );
}

export default InterimFilter;
