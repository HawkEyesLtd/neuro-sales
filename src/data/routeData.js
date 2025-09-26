import AttendancePage from '@/pages/Attendance/Attendance';
import Dashboard from '@/pages/Dashboard/Dashboard';
import {
    default as DHCCreditLifting,
    default as DHCreditLifting,
} from '@/pages/Inventory/DHCreditLifting';
import DHProductReceived from '@/pages/Inventory/DHProductReceived';
import SalesReportPage from '@/pages/SalesReport/SalesReport';

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
        element: <DHCCreditLifting />,
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
        element: <SalesReportPage />,
    },
];

export default routeData;
