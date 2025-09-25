import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

function TownSummaryTable({ isLoading, data }) {
    return (
        <Table
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
            <Column title="Town Damage" dataIndex="damaged" key="damaged" />
            <Column title="Town Lost" dataIndex="lost" key="lost" />
            <Column title="FF Damage" dataIndex="ffDamage" key="ffDamage" />
            <Column title="FF Lost" dataIndex="ffLost" key="ffLost" />
            {/* <Column title="Transfer Qty" dataIndex="transfer" key="transfer" /> */}
            {/* <Column
                title="Transfer Received Qty"
                dataIndex="transfer_receive"
                key="transfer_receive"
            /> */}
            <Column title="Assigned Qty" dataIndex="assigned" key="assigned" />
            <Column title="Return From FF" dataIndex="ffReturn" key="ffReturn" />
            <Column title="In hand Qty" dataIndex="remaining" key="remaining" />
            <Column title="Used Qty" dataIndex="used" key="used" />
        </Table>
    );
}

export default TownSummaryTable;
