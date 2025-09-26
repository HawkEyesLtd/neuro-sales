import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function InventoryFilter({
    onFilter,
    loading,
    showAddButton = false,
    onAddClick = () => {},
    addButtonText = 'Add SKU',
    showStatus = true,
    showSearch = true,
    showDateRange = true,
}) {
    const [filters, setFilters] = useState({
        region: null,
        area: null,
        territory: null,
        dhName: null,
        dateRange: null,
        status: null,
        search: '',
    });

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilter?.(newFilters);
    };

    const handleSearch = () => {
        onFilter?.(filters);
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Region"
                        style={{ width: '100%' }}
                        value={filters.region}
                        onChange={(value) => handleFilterChange('region', value)}
                        allowClear
                    >
                        <Option value="central-north">Central North</Option>
                        <Option value="central-south">Central South</Option>
                        <Option value="eastern">Eastern</Option>
                        <Option value="western">Western</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Area"
                        style={{ width: '100%' }}
                        value={filters.area}
                        onChange={(value) => handleFilterChange('area', value)}
                        allowClear
                    >
                        <Option value="dhaka">Dhaka</Option>
                        <Option value="tangail">Tangail</Option>
                        <Option value="chittagong">Chittagong</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="Territory"
                        style={{ width: '100%' }}
                        value={filters.territory}
                        onChange={(value) => handleFilterChange('territory', value)}
                        allowClear
                    >
                        <Option value="territory-1">Territory 1</Option>
                        <Option value="territory-2">Territory 2</Option>
                        <Option value="territory-3">Territory 3</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6} lg={4}>
                    <Select
                        placeholder="DH Name"
                        style={{ width: '100%' }}
                        value={filters.dhName}
                        onChange={(value) => handleFilterChange('dhName', value)}
                        allowClear
                    >
                        <Option value="dh-1">DH 1</Option>
                        <Option value="dh-2">DH 2</Option>
                        <Option value="dh-3">DH 3</Option>
                    </Select>
                </Col>

                {showDateRange && (
                    <Col xs={24} sm={12} md={6} lg={4}>
                        <RangePicker
                            style={{ width: '100%' }}
                            placeholder={['Start Date', 'End Date']}
                            onChange={(dates) => handleFilterChange('dateRange', dates)}
                        />
                    </Col>
                )}

                {showStatus && (
                    <Col xs={24} sm={12} md={6} lg={4}>
                        <Select
                            placeholder="Status"
                            style={{ width: '100%' }}
                            value={filters.status}
                            onChange={(value) => handleFilterChange('status', value)}
                            allowClear
                        >
                            <Option value="active">Active</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="delivered">Delivered</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </Col>
                )}

                {showSearch && (
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Input
                            placeholder="Search Order ID/outlets..."
                            prefix={<SearchOutlined />}
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            onPressEnter={handleSearch}
                        />
                    </Col>
                )}

                <Col xs={24} sm={12} md={8} lg={6}>
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                            loading={loading}
                        >
                            Search
                        </Button>
                        {showAddButton && (
                            <Button
                                type="primary"
                                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                                onClick={onAddClick}
                            >
                                {addButtonText}
                            </Button>
                        )}
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
