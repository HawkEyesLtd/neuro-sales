import AttendancePage from '@/pages/Attendance/Attendance';
import Dashboard from '@/pages/Dashboard/Dashboard';
import DHCreditLifting from '@/pages/Inventory/DHCreditLifting';
import DHProductReceived from '@/pages/Inventory/DHProductReceived';
import InventoryStatus from '@/pages/Inventory/InventoryStatus';
import SROrders from '@/pages/SalesReport/SROrders';

const routeData = [
    {
        name: 'Dashboard',
        path: '/',
        element: <Dashboard />,
    },
    {
        name: 'Attendance',
        path: '/attendance',
        element: <AttendancePage />,
    },
    {
        name: 'Inventory Status',
        path: '/inventory/inventory-status',
        element: <InventoryStatus />,
    },
    {
        name: 'DH Product Receipt',
        path: '/inventory/dh-product-receipt',
        element: <DHProductReceived />,
    },
    {
        name: 'DH Credit Lifting',
        path: '/inventory/dh-credit-lifting',
        element: <DHCreditLifting />,
    },
    {
        name: 'Sales Report',
        path: '/sales-report',
        element: <SROrders />,
    },
];

export default routeData;
