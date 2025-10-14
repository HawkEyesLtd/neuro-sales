import {
    ExportOutlined,
    EyeOutlined,
    MoreOutlined,
    SortAscendingOutlined,
} from '@ant-design/icons';
import { Button, Card, Dropdown, Space, Table, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { useGetInventoryStatusMutation } from '@/redux/features/inventory/inventoryApiSlice';

import InventoryFilter from './components/InventoryFilter';

const { Title } = Typography;

export default function InventoryStatus() {
    // const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [getInventoryStatus] = useGetInventoryStatusMutation();

    // Mock data for the table - matching screenshot data
    const data = useMemo(
        () => [
            {
                key: '1',
                productName: 'Meril Vitamin C Soap Bar - Tangerine Orange',
                productCode: 'PRD-001',
                size: '100gm',
                currentStock: 150,
                reorderLevel: 200,
                lastUpdatedTime: '23-04-2025 10:15 AM',
                location: 'Warehouse A',
            },
            {
                key: '2',
                productName: 'Meril Milk Soap Bar',
                productCode: 'PRD-002',
                size: '75gm',
                currentStock: 320,
                reorderLevel: 250,
                lastUpdatedTime: '23-04-2025 09:45 AM',
                location: 'Store B',
            },
            {
                key: '3',
                productName: 'Meril Milk & Rose Soap Bar',
                productCode: 'PRD-003',
                size: '150gm',
                currentStock: 180,
                reorderLevel: 200,
                lastUpdatedTime: '22-04-2025 03:20 PM',
                location: 'Warehouse C',
            },
            {
                key: '4',
                productName: 'Meril Milk & Beli Soap Bar',
                productCode: 'PRD-004',
                size: '60gm',
                currentStock: 420,
                reorderLevel: 300,
                lastUpdatedTime: '22-04-2025 11:05 AM',
                location: 'Store A',
            },
            {
                key: '5',
                productName: 'Meril Milk & Kiwi Soap Bar',
                productCode: 'PRD-005',
                size: '75gm',
                currentStock: 90,
                reorderLevel: 150,
                lastUpdatedTime: '21-04-2025 02:55 PM',
                location: 'Warehouse B',
            },
        ],
        []
    );

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record) => (
                <div>
                    <div className="font-medium text-gray-900">{text}</div>
                    <div className="text-sm text-gray-500">{record.productCode}</div>
                </div>
            ),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: 100,
        },
        {
            title: 'Current Stock',
            dataIndex: 'currentStock',
            key: 'currentStock',
            width: 120,
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'Reorder Level',
            dataIndex: 'reorderLevel',
            key: 'reorderLevel',
            width: 120,
        },
        {
            title: 'Last Updated Time',
            dataIndex: 'lastUpdatedTime',
            key: 'lastUpdatedTime',
            width: 150,
            render: (text) => <span className="text-sm text-gray-600">{text}</span>,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: 120,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                        className="text-blue-600"
                    />
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'edit',
                                    label: 'Edit',
                                },
                                {
                                    key: 'delete',
                                    label: 'Delete',
                                },
                            ],
                        }}
                    >
                        <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    // const handleFilter = useCallback(
    //     async (filters) => {
    //         // setLoading(true);
    //         try {
    //             const response = await getInventoryStatus({
    //                 ...filters,
    //                 page: pagination.current,
    //                 pageSize: pagination.pageSize,
    //             });

    //             if (response?.data?.success) {
    //                 setInventoryData(response.data.data);
    //                 setPagination((prev) => ({
    //                     ...prev,
    //                     total: response.data.total || 0,
    //                 }));
    //             } else {
    //                 throw new Error('API Error');
    //             }
    //         } catch {
    //             message.error('Failed to fetch inventory data');
    //             // Fallback to mock data
    //             setInventoryData(data);
    //             setPagination((prev) => ({
    //                 ...prev,
    //                 total: data.length,
    //             }));
    //         } finally {
    //             // setLoading(false);
    //         }
    //     },
    //     [pagination, data]
    // );

    // useEffect(() => {
    //     const loadData = async () => {
    //         await handleFilter({});
    //     };
    //     loadData();
    // }, [handleFilter]);

    const handleViewDetails = (_record) => {
        // Handle view details functionality
    };

    const handleSort = () => {
        // Handle sort functionality
    };

    const handleExport = () => {
        // Handle export functionality
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    return (
        <div>
            <div className="mb-6">
                <Title level={3} className="mb-4">
                    Inventory
                </Title>
            </div>

            <InventoryFilter
                // onFilter={handleFilter}
                // loading={loading}
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
                    dataSource={inventoryData.length > 0 ? inventoryData : data}
                    rowSelection={rowSelection}
                    // loading={loading}
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
                    scroll={{ x: 1200 }}
                    size="small"
                />
            </Card>
        </div>
    );
}
