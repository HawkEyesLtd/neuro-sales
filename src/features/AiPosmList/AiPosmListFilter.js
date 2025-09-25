import { Button, Col, Select } from 'antd';
import { useDispatch } from 'react-redux';

import {
    setCategory,
    setOwnerName,
    setSovCount,
} from '../../redux/features/AiPosmList/aiPosmListFilterSlice';

function AiPosmListFilter({ queryFunc, loading }) {
    const dispatch = useDispatch();
    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Owner Name"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setOwnerName(e))}
                    options={[
                        {
                            value: 'Nagad',
                            label: 'Nagad',
                        },
                        {
                            value: 'Bkash',
                            label: 'Bkash',
                        },
                        {
                            value: 'Rocket',
                            label: 'Rocket',
                        },
                        {
                            value: 'Upay',
                            label: 'Upay',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="SOV Count"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setSovCount(e))}
                    options={[
                        {
                            value: 'yes',
                            label: 'Yes',
                        },
                        {
                            value: 'no',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
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
                            value: 'Festoon',
                            label: 'Festoon',
                        },
                        {
                            value: 'Poster',
                            label: 'Poster',
                        },
                        {
                            value: 'Sticker',
                            label: 'Sticker',
                        },
                        {
                            value: 'Banner',
                            label: 'Banner',
                        },
                        {
                            value: 'QR',
                            label: 'QR',
                        },
                        {
                            value: 'Signboard',
                            label: 'Signboard',
                        },
                    ]}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    disabled={loading}
                    loading={loading}
                    size="large"
                    className="filter-btn"
                    type="primary"
                    style={{ background: '#faad14', color: '#fff' }}
                    onClick={() => queryFunc()}
                >
                    Search
                </Button>
            </Col>
        </>
    );
}

export default AiPosmListFilter;
