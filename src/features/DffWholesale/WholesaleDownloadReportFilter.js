import { CloudDownloadOutlined } from '@ant-design/icons';
import { Col, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import FilterButton from '../../components/FilterButton';
import { setMonth, setReportType } from '../../redux/features/dffWholesale/dffDownloadReportFilter';

function WholesaleDownloadReportFilter({ queryFunc, loading }) {
    const dispatch = useDispatch();

    const { month } = useSelector((state) => state.dffDownloadReportFilter);

    // date picker function
    const monthChange = (_, dateString) => {
        dispatch(setMonth(dateString));
    };

    const {
        user: { employeeLevel },
    } = useSelector((state) => state.auth);

    return (
        <>
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
                <Select
                    placeholder="Report Type"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(v) => dispatch(setReportType(v))}
                    options={[
                        {
                            label: 'Market Rate Report',
                            value: 'Market Rate Report',
                        },
                        {
                            label: 'Insight Report',
                            value: 'Insight Report',
                        },
                        {
                            label: 'Wholesale Report',
                            value: 'Wholesale Report',
                        },
                        {
                            label: 'Stock & Offtake Report',
                            value: 'Stock & Offtake Report',
                        },
                    ]}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <FilterButton
                    loading={loading}
                    fn={queryFunc}
                    icon={<CloudDownloadOutlined />}
                    title="Export Data"
                />
            </Col>
        </>
    );
}

export default WholesaleDownloadReportFilter;
