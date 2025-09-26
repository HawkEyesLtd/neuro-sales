import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SalesReportFilter({ onFilter, loading }) {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        regionId: [],
        areaId: [],
        territoryId: [],
        townId: [],
        from: null,
        to: null,
        userId: [],
        orderStatus: '',
        deliveryStatus: '',
        searchTerm: '',
    });

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            setFilters((prev) => ({
                ...prev,
                from: dates[0].toISOString(),
                to: dates[1].toISOString(),
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                from: null,
                to: null,
            }));
        }
    };

    const handleSearch = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            page: 1,
            limit: 10,
            regionId: [],
            areaId: [],
            territoryId: [],
            townId: [],
            from: null,
            to: null,
            userId: [],
            orderStatus: '',
            deliveryStatus: '',
            searchTerm: '',
        };
        setFilters(resetFilters);
        onFilter(resetFilters);
    };

    return (
        <Card
            title={
                <Space>
                    <FilterOutlined />
                    Sales Report Filters
                </Space>
            }
            style={{ marginBottom: 16 }}
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                        Date Range
                    </label>
                    <RangePicker
                        style={{ width: '100%' }}
                        onChange={handleDateRangeChange}
                        value={
                            filters.from && filters.to
                                ? [dayjs(filters.from), dayjs(filters.to)]
                                : []
                        }
                        placeholder={['From Date', 'To Date']}
                    />
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                        Order Status
                    </label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Order Status"
                        value={filters.orderStatus || undefined}
                        onChange={(value) => handleFilterChange('orderStatus', value)}
                        allowClear
                    >
                        <Option value="Pending">Pending</Option>
                        <Option value="Confirmed">Confirmed</Option>
                        <Option value="Delivered">Delivered</Option>
                        <Option value="Cancelled">Cancelled</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                        Delivery Status
                    </label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Delivery Status"
                        value={filters.deliveryStatus || undefined}
                        onChange={(value) => handleFilterChange('deliveryStatus', value)}
                        allowClear
                    >
                        <Option value="Pending">Pending</Option>
                        <Option value="InTransit">In Transit</Option>
                        <Option value="Delivered">Delivered</Option>
                        <Option value="Failed">Failed</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                        Search Term
                    </label>
                    <Input
                        placeholder="Search by outlet name, user, etc."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        prefix={<SearchOutlined />}
                    />
                </Col>

                <Col xs={24} style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                            loading={loading}
                        >
                            Search
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}
