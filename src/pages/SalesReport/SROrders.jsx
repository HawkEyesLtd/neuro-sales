import { ExportOutlined, EyeOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table, Tag, Typography } from 'antd';
import { useState } from 'react';

import SalesReportFilter from './components/SalesReportFilter';

const { Title } = Typography;

export default function SROrders() {
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Mock data matching the first screenshot
    const data = [
        {
            key: '1',
            invoiceId: 'IN1001',
            dateTime: '23-04-2025 10:15 AM',
            outletName: 'Bhai Bhai Enterprise',
            outletCode: 'RAJ-31-12008',
            srName: 'Rahim Ahmed',
            totalValue: 15500,
            paymentStatus: 'Due on Delivery',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: '',
        },
        {
            key: '2',
            invoiceId: 'IN1002',
            dateTime: '23-04-2025 09:45 AM',
            outletName: 'Karim Store',
            outletCode: 'RAJ-80-23297',
            srName: 'Fahim Islam',
            totalValue: 8200,
            paymentStatus: 'Paid (Bkash)',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: '',
        },
        {
            key: '3',
            invoiceId: 'IN1003',
            dateTime: '22-04-2025 03:20 PM',
            outletName: 'Jonota Traders',
            outletCode: 'RAJ-31-13005',
            srName: 'Rahim Ahmed',
            totalValue: 22750,
            paymentStatus: 'Paid (Cash)',
            deliveryStatus: 'Delivered',
            deliveryDate: '04.09.25',
        },
        {
            key: '4',
            invoiceId: 'IN1004',
            dateTime: '22-04-2025 11:05 AM',
            outletName: 'Shaghin Suppliers',
            outletCode: 'RAJ-31-12008',
            srName: 'Rahim Ahmed',
            totalValue: 5900,
            paymentStatus: 'Due on Delivery',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: '',
        },
        {
            key: '5',
            invoiceId: 'IN1005',
            dateTime: '21-04-2025 02:55 PM',
            outletName: 'Rupali Banijaloy',
            outletCode: 'RAJ-80-23774',
            srName: 'Nabila Jahan',
            totalValue: 18000,
            paymentStatus: 'Paid (Cash)',
            deliveryStatus: 'Delivered',
            deliveryDate: '04.09.25',
        },
    ];

    const columns = [
        {
            title: 'Invoice ID',
            dataIndex: 'invoiceId',
            key: 'invoiceId',
            width: 100,
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 150,
            render: (text) => <span className="text-sm text-gray-600">{text}</span>,
        },
        {
            title: 'Outlet Name',
            key: 'outlet',
            width: 200,
            render: (_, record) => (
                <div>
                    <div className="font-medium text-gray-900">{record.outletName}</div>
                    <div className="text-xs text-gray-500">{record.outletCode}</div>
                </div>
            ),
        },
        {
            title: 'SR Name',
            dataIndex: 'srName',
            key: 'srName',
            width: 120,
        },
        {
            title: 'Total Value ($)',
            dataIndex: 'totalValue',
            key: 'totalValue',
            width: 120,
            render: (value) => <span className="font-medium">{value.toLocaleString()}</span>,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            width: 150,
            render: (status) => {
                let color = 'default';
                if (status.includes('Paid')) color = 'green';
                else if (status.includes('Due')) color = 'orange';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            width: 150,
            render: (status) => {
                const color = status === 'Delivered' ? 'green' : 'orange';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            width: 120,
        },
        {
            title: 'Picture',
            key: 'picture',
            width: 80,
            render: () => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    className="text-blue-600"
                    style={{ backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}
                />
            ),
        },
        {
            title: 'View Memo',
            key: 'viewMemo',
            width: 100,
            render: () => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    className="text-blue-600"
                    style={{ backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}
                />
            ),
        },
    ];

    const handleFilter = (filters) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleSort = () => {
        // Handle sort
    };

    const handleExport = () => {
        // Handle export
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Title level={3} className="mb-1">
                            SR Orders
                        </Title>
                        <div className="text-gray-500 text-sm">Order Management / SR Orders</div>
                    </div>
                </div>
            </div>

            <SalesReportFilter onFilter={handleFilter} loading={loading} />

            <Card className="shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <Title level={4} className="mb-0">
                        Recent Orders
                    </Title>
                    <Space>
                        <Button icon={<SortAscendingOutlined />} onClick={handleSort}>
                            Sort
                        </Button>
                        <Button icon={<ExportOutlined />} onClick={handleExport}>
                            Export
                        </Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    loading={loading}
                    pagination={{
                        current: 1,
                        pageSize: 5,
                        total: 530,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]}-${range[1]} of ${total} records (Page 1 of 106)`,
                        pageSizeOptions: ['5', '10', '20', '50'],
                        itemRender: (current, type, originalElement) => {
                            if (type === 'page') {
                                return (
                                    <Button
                                        size="small"
                                        type={current === 1 ? 'primary' : 'default'}
                                    >
                                        {current}
                                    </Button>
                                );
                            }
                            return originalElement;
                        },
                    }}
                    scroll={{ x: 1400 }}
                    size="small"
                />
            </Card>
        </div>
    );
}
