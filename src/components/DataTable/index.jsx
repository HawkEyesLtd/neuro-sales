import { Table } from 'antd';

function DataTable({ data, columns, loading }) {
    return (
        <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            size="middle"
            rowKey={(record) => record.name}
            className="custom-table"
        />
    );
}

export default DataTable;
