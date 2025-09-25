import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

function UserSummaryTable({ isLoading, data }) {
    return (
        <Table
            key="materialId"
            pagination={false}
            size="small"
            loading={isLoading}
            dataSource={data}
            scroll={{
                x: 400,
            }}
        >
            <Column title="POSM" dataIndex="name" key="name" />
            <Column title="Brand Name" dataIndex="brand" key="brand" />
            <Column title="Allocated Qty" dataIndex="allocated" key="allocated" />
            <Column title="Received Qty" dataIndex="received" key="received" />
            <Column title="Damage Qty" dataIndex="damaged" key="damaged" />
            <Column title="Lost Qty" dataIndex="lost" key="lost" />
            <Column title="In hand Qty" dataIndex="remaining" key="remaining" />
            <Column title="Used Qty" dataIndex="used" key="used" />
        </Table>
    );
}

export default UserSummaryTable;
