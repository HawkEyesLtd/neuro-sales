import { ExportOutlined, EyeOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table, Tag, Typography } from 'antd';
import { useState } from 'react';

import SalesReportFilter from './SalesReportFilter';

const { Title } = Typography;

export default function SROrders() {
    const [loading, setLoading] = useState(false);

    // Mock data matching the screenshot
    const data = [
        {
            key: 'INV001',
            invoiceId: 'INV001',
            dateTime: '23-04-2025 10:15 AM',
            outletName: 'Bhai Bhai Enterprise',
            outletCode: 'RAJA-31-05568',
            srName: 'Rahim Ahmed',
            totalValue: 15500,
            paymentStatus: 'Due on Delivery',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: null,
            picture: true,
            viewMemo: true,
        },
        {
            key: 'INV002',
            invoiceId: 'INV002',
            dateTime: '23-04-2025 09:45 AM',
            outletName: 'Karim Store',
            outletCode: 'RAJA-80-21724',
            srName: 'Fahim Islam',
            totalValue: 8200,
            paymentStatus: 'Paid (Bkash)',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: null,
            picture: true,
            viewMemo: true,
        },
        {
            key: 'INV003',
            invoiceId: 'INV003',
            dateTime: '22-04-2025 03:20 PM',
            outletName: 'Sohota Traders',
            outletCode: 'RAJA-31-19605',
            srName: 'Rahim Ahmed',
            totalValue: 22750,
            paymentStatus: 'Paid (Cash)',
            deliveryStatus: 'Delivered',
            deliveryDate: '04.09.25',
            picture: true,
            viewMemo: true,
        },
        {
            key: 'INV004',
            invoiceId: 'INV004',
            dateTime: '22-04-2025 11:05 AM',
            outletName: 'Shadhín Suppliers',
            outletCode: 'RAJA-31-05569',
            srName: 'Rahim Ahmed',
            totalValue: 5960,
            paymentStatus: 'Due on Delivery',
            deliveryStatus: 'Pending Delivery',
            deliveryDate: null,
            picture: true,
            viewMemo: true,
        },
        {
            key: 'INV005',
            invoiceId: 'INV005',
            dateTime: '21-04-2025 02:55 PM',
            outletName: 'Rupali Benglory',
            outletCode: 'RAJA-80-21724',
            srName: 'Nabila Jahan',
            totalValue: 18000,
            paymentStatus: 'Paid (Cash)',
            deliveryStatus: 'Delivered',
            deliveryDate: '04.09.25',
            picture: true,
            viewMemo: true,
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
            render: (text) => <span className="text-sm">{text}</span>,
        },
        {
            title: 'Outlet Name',
            dataIndex: 'outletName',
            key: 'outletName',
            render: (text, record) => (
                <div>
                    <div className="font-medium text-gray-900">{text}</div>
                    <div className="text-sm text-gray-500">{record.outletCode}</div>
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
            title: 'Total Value (৳)',
            dataIndex: 'totalValue',
            key: 'totalValue',
            width: 120,
            render: (value) => <span className="font-medium">{value?.toLocaleString()}</span>,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            width: 140,
            render: (status) => {
                let color = 'default';
                if (status?.includes('Paid')) {
                    color = 'green';
                } else if (status?.includes('Due')) {
                    color = 'orange';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            width: 140,
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
            render: (date) => date || '-',
        },
        {
            title: 'Picture',
            key: 'picture',
            width: 80,
            render: () => (
                <Button type="link" size="small" className="p-0">
                    📷
                </Button>
            ),
        },
        {
            title: 'View Memo',
            key: 'viewMemo',
            width: 100,
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewMemo(record)}
                    className="text-blue-600"
                />
            ),
        },
    ];

    const handleFilter = (_filters) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleViewMemo = (_record) => {
        // Handle view memo functionality
    };

    const handleSort = () => {
        // Handle sort functionality
    };

    const handleExport = () => {
        // Handle export functionality
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <Title level={3} className="mb-4">
                    SR Orders
                </Title>
                <p className="text-gray-600">Order Management / SR Orders</p>
            </div>

            <SalesReportFilter
                onFilter={handleFilter}
                loading={loading}
                showAddButton={false}
                showSearch={true}
                showStatus={true}
                showDateRange={true}
            />

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
                    // loading={loading}
                    p
                    pagination={{
                        current: 1,
                        pageSize: 5,
                        total: 530,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]}-${range[1]} of ${total} records (Page 1 of 106)`,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                    scroll={{ x: 1400 }}
                    size="small"
                />
            </Card>
        </div>
    );
}
