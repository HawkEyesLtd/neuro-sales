import {
    AimOutlined,
    FolderOpenOutlined,
    PieChartOutlined,
    ProductOutlined,
} from '@ant-design/icons';

const items = [
    {
        label: 'Dashboard',
        key: '/',
        icon: <PieChartOutlined />,
        serial: 2,
    },
    {
        label: 'Attendance',
        key: '/attendance',
        icon: <AimOutlined />,
        serial: 3,
    },
    {
        label: 'Inventory',
        key: '/inventory',
        icon: <FolderOpenOutlined />,
        children: [
            {
                label: 'Inventory Status',
                key: '/inventory/inventory-status',
            },
            {
                label: 'DH Product Receipt',
                key: '/inventory/dh-product-receipt',
            },
            {
                label: 'DH Credit Lifting',
                key: '/inventory/dh-credit-lifting',
            },
        ],
    },
    {
        serial: 4,
        icon: <ProductOutlined />,
        label: 'Sales Report',
        key: '/inventory/sales-report',
    },
];

export default items;
