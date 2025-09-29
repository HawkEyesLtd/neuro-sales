import {
    ClockCircleOutlined,
    DollarCircleOutlined,
    EyeOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Card,
    Col,
    Collapse,
    Divider,
    Image,
    List,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    Typography,
    message,
} from 'antd';
import { useEffect, useState } from 'react';

import { useGetSalesReportsMutation } from '@/redux/features/sales/salesReportApi';

import SalesReportFilter from './components/SalesReportFilter';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function SalesReportPage() {
    const [salesData, setSalesData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [getSalesReports, { isLoading }] = useGetSalesReportsMutation();

    const handleFilter = async (filterData) => {
        try {
            const response = await getSalesReports({
                ...filterData,
                page: pagination.current,
                limit: pagination.pageSize,
            }).unwrap();

            setSalesData(response.data || []);
            setPagination((prev) => ({
                ...prev,
                total: response.total || 0,
            }));
        } catch (error) {
            message.error('Failed to fetch sales reports');
            console.error('Sales report error:', error);
        }
    };

    const handleTableChange = (paginationInfo) => {
        setPagination((prev) => ({
            ...prev,
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize,
        }));
    };

    useEffect(() => {
        // Load initial data with default filters
        handleFilter({
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
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDuration = (duration) => {
        return duration || '00:00:00';
    };

    const handleViewDetails = (record) => {
        // Implement view details functionality
        console.log('View details for:', record);
    };

    const handleDownload = (record) => {
        // Implement download functionality
        console.log('Download report for:', record);
    };

    const columns = [
        {
            title: 'User Info',
            key: 'user',
            width: 200,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <Avatar icon={<UserOutlined />} size="small" />
                        <div>
                            <Text strong>{record.user?.name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {record.user?.usercode} | {record.user?.userType}
                            </Text>
                        </div>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Outlet Info',
            key: 'outlet',
            width: 250,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <Avatar icon={<ShopOutlined />} size="small" />
                        <div>
                            <Text strong>{record.outlet?.name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {record.outlet?.outletcode} | {record.outlet?.channel}
                            </Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Route: {record.outlet?.route}
                            </Text>
                        </div>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Location',
            key: 'location',
            width: 150,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Text strong>{record.town?.name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.town?.region}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.town?.area} | {record.town?.territory}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Execution Time',
            key: 'execution',
            width: 180,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <ClockCircleOutlined />
                        <Text>{formatDuration(record.duration)}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(record.executionStartAt).toLocaleDateString()}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(record.executionStartAt).toLocaleTimeString()} -{' '}
                        {new Date(record.executionEndAt).toLocaleTimeString()}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Order Amount',
            key: 'amount',
            width: 120,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Statistic
                        value={record.totalOrderedAmount}
                        prefix={<DollarCircleOutlined />}
                        precision={2}
                        valueStyle={{ fontSize: 16 }}
                    />
                    {record.discount > 0 && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Discount: {formatCurrency(record.discount)}
                        </Text>
                    )}
                </Space>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (record) => (
                <Space direction="vertical" size="small">
                    <Tag color={record.delivered ? 'green' : 'orange'}>
                        {record.delivered ? 'Delivered' : 'Pending'}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.deliveryType}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.paymentMethod}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Images',
            key: 'images',
            width: 100,
            render: (record) => (
                <Space>
                    {record.image?.slice(0, 2).map((img, index) => (
                        <Image
                            key={index}
                            width={40}
                            height={40}
                            src={img.thumb}
                            alt={img.kind}
                            style={{ objectFit: 'cover', borderRadius: 4 }}
                            preview={{
                                src: img.original,
                            }}
                        />
                    ))}
                    {record.image?.length > 2 && <Badge count={`+${record.image.length - 2}`} />}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (record) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewDetails(record)}
                        />
                    </Tooltip>
                    {/* <Tooltip title="Download Report">
                        <Button
                            type="text"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(record)}
                        />
                    </Tooltip> */}
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        return (
            <Collapse size="small" ghost>
                <Panel header="Order Items" key="order">
                    <List
                        size="small"
                        dataSource={record.orderItems || []}
                        renderItem={(item) => (
                            <List.Item>
                                <Space>
                                    <Text strong>{item.name}</Text>
                                    <Tag>Qty: {item.qty}</Tag>
                                    <Tag>Price: {formatCurrency(item.unitPrice)}</Tag>
                                    <Tag color="blue">Total: {formatCurrency(item.totalPrice)}</Tag>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Panel>

                <Panel header="Detected Items" key="detected">
                    <List
                        size="small"
                        dataSource={record.detectedItems || []}
                        renderItem={(item) => (
                            <List.Item>
                                <Space>
                                    <Text>{item.name}</Text>
                                    <Tag color="green">Detected: {item.detectedQty}</Tag>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Panel>

                {record.exchangeItems?.length > 0 && (
                    <Panel header="Exchange Items" key="exchange">
                        <List
                            size="small"
                            dataSource={record.exchangeItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space>
                                        <Text>{item.name}</Text>
                                        <Tag>Qty: {item.qty}</Tag>
                                        <Tag color="orange">
                                            Price: {formatCurrency(item.price)}
                                        </Tag>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            Exp: {new Date(item.expireDate).toLocaleDateString()}
                                        </Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                        {record.remarksForExchange && (
                            <>
                                <Divider style={{ margin: '8px 0' }} />
                                <Text type="secondary">Remarks: {record.remarksForExchange}</Text>
                            </>
                        )}
                    </Panel>
                )}

                {record.returnItems?.length > 0 && (
                    <Panel header="Return Items" key="return">
                        <List
                            size="small"
                            dataSource={record.returnItems}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space>
                                        <Text>{item.name}</Text>
                                        <Tag>Qty: {item.qty}</Tag>
                                        <Tag color="red">Price: {formatCurrency(item.price)}</Tag>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            Exp: {new Date(item.expireDate).toLocaleDateString()}
                                        </Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                        {record.remarksForReturn && (
                            <>
                                <Divider style={{ margin: '8px 0' }} />
                                <Text type="secondary">Remarks: {record.remarksForReturn}</Text>
                            </>
                        )}
                    </Panel>
                )}
            </Collapse>
        );
    };

    // Calculate totals
    const totalAmount = salesData.reduce(
        (sum, record) => sum + (record.totalOrderedAmount || 0),
        0
    );
    const totalDiscount = salesData.reduce((sum, record) => sum + (record.discount || 0), 0);
    const deliveredCount = salesData.filter((record) => record.delivered).length;

    return (
        <div>
            <Title level={2}>Sales Report</Title>

            <SalesReportFilter onFilter={handleFilter} loading={isLoading} />

            {/* Summary Cards */}
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={6}>
                    <Card hoverable>
                        <Statistic
                            title="Total Orders"
                            value={salesData.length}
                            prefix={<ShopOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card hoverable>
                        <Statistic
                            prefix={<span className="font-bold text-[30px]">৳</span>}
                            title="Total Amount"
                            value={totalAmount}
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card hoverable>
                        <Statistic
                            title="Delivered Orders"
                            value={deliveredCount}
                            suffix={`/ ${salesData.length}`}
                            prefix={<ShopOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card hoverable>
                        <Statistic
                            title="Total Discount"
                            value={totalDiscount}
                            prefix={<span className="font-bold text-[30px]">৳</span>}
                            precision={2}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Data Table */}
            <Card hoverable className="!mt-3">
                <Table
                    columns={columns}
                    dataSource={salesData}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    onChange={handleTableChange}
                    expandable={{
                        expandedRowRender,
                        rowExpandable: (record) =>
                            record.orderItems?.length > 0 ||
                            record.detectedItems?.length > 0 ||
                            record.exchangeItems?.length > 0 ||
                            record.returnItems?.length > 0,
                    }}
                    scroll={{ x: 1400 }}
                    size="small"
                />
            </Card>
        </div>
    );
}
