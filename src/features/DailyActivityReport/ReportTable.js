import { Table } from 'antd';

import TableSkeleton from '../../components/ui/TableSkeleton';
import labelChange from '../../util/labelChange';

const { Column, ColumnGroup } = Table;

function ReportTable({ data, loading }) {
    return (
        <div style={{ borderRadius: '10px' }}>
            <div className="box-heading">Daily Activity Report</div>

            <div style={{ padding: '10px', width: '100%' }}>
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <Table
                        rowKey="_id"
                        pagination={false}
                        scroll={{
                            x: 750,
                        }}
                        size="small"
                        loading={false}
                        dataSource={
                            data?.map((x) => ({ ...x, userType: labelChange(x.userType) })) || []
                        }
                    >
                        <Column title="Cluster" dataIndex="region" key="region" />
                        <Column title="Area" dataIndex="area" key="area" />
                        <Column title="Territory" dataIndex="territory" key="territory" />
                        <Column title="Town" dataIndex="town" key="town" />
                        <Column title="FF Code" dataIndex="usercode" key="usercode" />
                        <Column title="FF Name" dataIndex="name" key="name" />
                        <Column
                            align="center"
                            title="FF Level"
                            dataIndex="userType"
                            key="userType"
                            render={(level) => (level === 'CM' ? 'Merchandiser' : level)}
                        />
                        <Column
                            align="center"
                            title="Attendance Marked"
                            dataIndex="punchIn"
                            key="punchIn"
                        />
                        <Column
                            align="center"
                            title="Dayend Marked"
                            dataIndex="punchOut"
                            key="punchOut"
                        />
                        <Column title="POSM Inhand" dataIndex="inHand" key="inHand" />
                        <Column title="Pending Route" dataIndex="pendingRoute" key="pendingRoute" />
                        <Column
                            title="Pending Outlet"
                            dataIndex="pendingOutlet"
                            key="pendingOutlet"
                        />

                        <Column align="center" title="Target" dataIndex="target" key="target" />
                        <Column
                            align="center"
                            title="completed"
                            dataIndex="completed"
                            key="completed"
                        />
                    </Table>
                )}
            </div>
        </div>
    );
}

export default ReportTable;
