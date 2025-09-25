import AttendanceFilter from '@/pages/Attendance/AttendanceFilter';
import DashboardFilter from '@/pages/Dashboard/DashboardFilter';
import { Row } from 'antd';
import DataManagementFilter from './DataManagementFilter';

// mapping of pathnames to components
const filterComponents = {
    '/': DashboardFilter,
    '/attendance': AttendanceFilter,
    // "/salary-status": SalaryEvaluationFilters,
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
