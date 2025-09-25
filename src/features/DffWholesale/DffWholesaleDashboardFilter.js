import { Col, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import {
    setCategory,
    setMonth,
} from '../../redux/features/dffWholesale/dffWholesaleDashboardFilter';

function DffWholesaleDashboardFilter({ queryFunc, loading, downloadButton }) {
    const { category, company, outletCode } = useSelector((state) => state.dffNationalLevelFilter);

    const dispatch = useDispatch();

    // user information
    const { user } = useSelector((state) => state.auth);

    const monthChange = (_, dateString) => {
        dispatch(setMonth(dateString));
    };
    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Category"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setCategory(e))}
                    options={[
                        {
                            value: 'FABRIC SOLUTION',
                            label: 'FABRIC SOLUTION',
                        },
                        {
                            value: 'HAIR CARE',
                            label: 'HAIR CARE',
                        },
                        {
                            value: 'SKIN CLEANSING',
                            label: 'SKIN CLEANSING',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <DatePicker
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
        </>
    );
}

export default DffWholesaleDashboardFilter;
