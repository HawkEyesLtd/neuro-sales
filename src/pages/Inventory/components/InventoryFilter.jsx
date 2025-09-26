import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select } from 'antd';
import { useState } from 'react';

export default function InventoryFilter({ queryFunc, loading, downloadButton }) {
    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Status"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    showSearch
                    filterOption={(input, option) =>
                        option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    searchValue={search}
                    onSearch={onSearch}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    // value={}
                    placeholder="Search By User code or Name"
                    size="large"
                    style={{ width: '100%' }}
                    // onChange={(e) => dispatch(setEmployeeCode(e.target.value))}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    className="filter-btn w-full!"
                    icon={<SearchOutlined />}
                    type="primary"
                    onClick={() => queryFunc(1, 10, 'cleanShowResultOnPage')}
                >
                    Search
                </Button>
            </Col>
        </>
    );
}
