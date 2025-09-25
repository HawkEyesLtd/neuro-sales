import HelmetHeader from '../../components/HelmetHeader';

import DataTable from './DataTable';

function DataManagement() {
    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="View Town" />

            <div style={{ marginTop: '10px' }}>
                <div>
                    <div className="box-heading">Town List</div>
                    <DataTable />
                </div>
            </div>
        </>
    );
}

export default DataManagement;
