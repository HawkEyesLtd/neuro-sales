import { AimOutlined, FolderOpenOutlined, PieChartOutlined, SaveFilled } from '@ant-design/icons';

const items = [
    {
        label: 'Dashboard',
        key: '/',
        icon: <PieChartOutlined />,
        serial: 1,
    },
    {
        label: 'Attendance',
        key: '/attendance',
        icon: <AimOutlined />,
        serial: 2,
    },
    {
        label: 'Inventory',
        key: '/inventory',
        icon: <FolderOpenOutlined />,
        serial: 3,
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
        label: 'Sales Report',
        key: '/sales-report',
        icon: <SaveFilled />,
    },
];

export default items;
