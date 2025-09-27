import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataManagementFilter from '@/components/DataManagementFilter';
import { setDateRange } from '@/redux/features/dashboard/dashboardFilterSlice';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SalesReportFilter({ onFilter, loading }) {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.salesReportFilter || {});

    const handleDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            dispatch(
                setDateRange({
                    from: dates[0].toISOString(),
                    to: dates[1].toISOString(),
                })
            );
        } else {
            dispatch(
                setDateRange({
                    from: null,
                    to: null,
                })
            );
        }
    };

    const handleSearch = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        // dispatch(resetFilters());
    };

    // Auto-trigger search when filters change
    useEffect(() => {
        if (
            filters.from ||
            filters.to ||
            filters.orderStatus ||
            filters.deliveryStatus ||
            filters.searchTerm
        ) {
            onFilter(filters);
        }
    }, [filters, onFilter]);

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
                <DataManagementFilter />

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
                        // onChange={(value) => dispatch(setOrderStatus(value))}
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
                        // onChange={(value) => dispatch(setDeliveryStatus(value))}
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
                        // onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
