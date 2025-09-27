import { Row } from 'antd';

import AttendanceFilter from '@/pages/Attendance/components/AttendanceFilter';
import DashboardFilter from '@/pages/Dashboard/DashboardFilter';
import InventoryFilter from '@/pages/Inventory/components/InventoryFilter';
import SalesReportFilter from '@/pages/SalesReport/components/SalesReportFilter';

import DataManagementFilter from './DataManagementFilter';

// mapping of pathnames to components
const filterComponents = {
    '/': DashboardFilter,
    '/attendance': AttendanceFilter,
    '/inventory-status': InventoryFilter,
    '/dh-product-receipt': InventoryFilter,
    '/dh-credit-lifting': InventoryFilter,
    '/sales-report': SalesReportFilter,
};

function Filter({
    pathname,
    queryFunc,
    loading,
    selectAllDisable,
    downloadButton,
    isDownloading,
    filters,
    setFilters,
}) {
    // get the appropriate filter component based on the pathname
    const ActivePageFilter = filterComponents[pathname] || null;

    return (
        <Row gutter={[5, 5]}>
            {pathname !== '/aiPosmList' &&
                pathname !== '/view-posm-list' &&
                pathname !== '/competitor-posm' &&
                pathname !== '/login' && (
                    <DataManagementFilter selectAllDisable={selectAllDisable} />
                )}
            {ActivePageFilter && (
                <ActivePageFilter
                    downloadButton={downloadButton}
                    loading={loading}
                    queryFunc={queryFunc}
                    pathname={pathname}
                    isDownloading={isDownloading}
                    filters={filters}
                    setFilters={setFilters}
                />
            )}
        </Row>
    );
}

export default Filter;
