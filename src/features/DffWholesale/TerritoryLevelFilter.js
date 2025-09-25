import { Col, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import {
    setCategory,
    setCompany,
    setOutletCode,
} from '../../redux/features/dffWholesale/dffWholesaleNationalLevelFilter';

function TerritoryLevelFilter({ queryFunc, loading, downloadButton }) {
    const { category, company, outletCode } = useSelector((state) => state.dffNationalLevelFilter);

    const dispatch = useDispatch();

    // user information
    const { user } = useSelector((state) => state.auth);

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
                            value: 'Hair Care',
                            label: 'Hair Care',
                        },
                        {
                            value: 'Skin Care',
                            label: 'Skin Care',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Company"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setCompany(e))}
                    options={[
                        {
                            value: 'Unilever',
                            label: 'Unilever',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={outletCode}
                    placeholder="Outlet Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setOutletCode(e.target.value))}
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

export default TerritoryLevelFilter;
