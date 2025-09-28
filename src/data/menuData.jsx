import {
    AimOutlined,
    FolderOpenOutlined,
    PieChartOutlined,
    ProductFilled,
    SaveFilled,
    UpCircleOutlined,
} from '@ant-design/icons';

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
                icon: <FolderOpenOutlined />,
                serial: 1,
            },
            {
                label: 'DH Product Receipt',
                key: '/inventory/dh-product-receipt',
                icon: <ProductFilled />,
                serial: 2,
            },
            {
                label: 'DH Credit Lifting',
                key: '/inventory/dh-credit-lifting',
                icon: <UpCircleOutlined />,
                serial: 3,
            },
        ],
    },
    {
        label: 'Sales Report',
        key: '/sales-report',
        icon: <SaveFilled />,
        serial: 4,
    },
];

export default items;
