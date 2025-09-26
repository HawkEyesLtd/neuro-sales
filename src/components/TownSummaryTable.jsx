import { Table } from 'antd';

export default function TownSummaryTable({ data, isLoading }) {
    const columns = [
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            key: 'productCode',
            width: 120,
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: 200,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 150,
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            width: 120,
            align: 'center',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 120,
            align: 'right',
            render: (price) => `৳ ${price?.toLocaleString() || 0}`,
        },
        {
            title: 'Total Value',
            dataIndex: 'totalValue',
            key: 'totalValue',
            width: 150,
            align: 'right',
            render: (value) => `৳ ${value?.toLocaleString() || 0}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => {
                const getStatusColor = (status) => {
                    switch (status?.toLowerCase()) {
                        case 'in stock':
                            return 'text-green-600 bg-green-100';
                        case 'low stock':
                            return 'text-orange-600 bg-orange-100';
                        case 'out of stock':
                            return 'text-red-600 bg-red-100';
                        default:
                            return 'text-gray-600 bg-gray-100';
                    }
                };

                return (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
                    >
                        {status || 'Unknown'}
                    </span>
                );
            },
        },
    ];

    // Transform data to match expected structure
    const tableData =
        data?.map((item, index) => ({
            key: index,
            productCode: item?.material_code || item?.code || `PRD-${index + 1}`,
            productName: item?.material_name || item?.name || `Product ${index + 1}`,
            category: item?.category || 'General',
            stockQuantity: item?.stock_quantity || item?.quantity || 0,
            unitPrice: item?.unit_price || item?.price || 0,
            totalValue: (item?.stock_quantity || 0) * (item?.unit_price || 0),
            status:
                item?.status ||
                (item?.stock_quantity > 10
                    ? 'In Stock'
                    : item?.stock_quantity > 0
                      ? 'Low Stock'
                      : 'Out of Stock'),
        })) || [];

    return (
        <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={false}
            size="small"
            scroll={{ x: 800 }}
            className="border rounded-lg"
        />
    );
}
