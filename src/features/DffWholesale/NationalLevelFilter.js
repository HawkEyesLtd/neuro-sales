import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import {
    setCategory,
    setCompany,
    setOutletCode,
} from '../../redux/features/dffWholesale/dffWholesaleNationalLevelFilter';

function NationalLevelFilter({ queryFunc, loading, downloadButton }) {
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
                            value: 'UBL',
                            label: 'UBL',
                        },
                        {
                            value: 'KOHINOOR',
                            label: 'KOHINOOR',
                        },
                        {
                            value: 'ACI',
                            label: 'ACI',
                        },
                        {
                            value: 'Reckitt',
                            label: 'Reckitt',
                        },
                        {
                            value: 'MARICO',
                            label: 'MARICO',
                        },
                        {
                            value: 'RSPL',
                            label: 'RSPL',
                        },

                        {
                            value: 'CAVINKARE',
                            label: 'CAVINKARE',
                        },
                        {
                            value: 'Keya',
                            label: 'Keya',
                        },
                        {
                            value: 'SQUARE',
                            label: 'SQUARE',
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
                            url: '/v1/report/wholesale-report',
                            fileName: 'Wholesale report.xlsx',
                        });
                    }}
                >
                    Download
                </Button>
            </Col>
        </>
    );
}

export default NationalLevelFilter;
