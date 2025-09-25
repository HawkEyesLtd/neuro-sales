import { Table } from 'antd';

export default function OverallMtSosTable({ data }) {
    // sos column
    const overallTableColumn = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'Size in inch',
            dataIndex: 'sizeInSize',
            key: 'sizeInSize',
            render: (v) => <span style={{ fontSize: '12px' }}>{v?.toFixed(2)}</span>,
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (v) => <span style={{ fontSize: '12px' }}>{v ? `${v.toFixed(2)}%` : ''}</span>,
        },
    ];
    return (
        <Table
            size="small"
            columns={overallTableColumn}
            dataSource={data || []}
            pagination={false}
        />
    );
}
