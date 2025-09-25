import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setDhCodeReceiveMaterial } from '../../redux/features/materialManagement/receiveMaterialFilterSlice';

function ReceiveMaterialFilter({ loading, queryFunc }) {
    const { dhCode } = useSelector((state) => state.receiveMaterialFilter);

    const dispatch = useDispatch();

    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={dhCode || null}
                    placeholder="DH Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setDhCodeReceiveMaterial(e.target.value))}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    className="filter-btn"
                    icon={<SearchOutlined />}
                    type="primary"
                    style={{ background: '#faad14', color: '#fff' }}
                    onClick={queryFunc}
                >
                    Search
                </Button>
            </Col>
        </>
    );
}

export default ReceiveMaterialFilter;
