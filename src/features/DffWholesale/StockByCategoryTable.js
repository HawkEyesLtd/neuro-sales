import { Table } from 'antd';

export default function StockByCategoryTable({ title, data }) {
    const columns = [
        {
            title: 'SKU Name',
            dataIndex: 'name',
            render: (text) => <span style={{ fontSize: '11px' }}>{text}</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stockQty',
            render: (text) => <span style={{ fontSize: '11px' }}>{text}</span>,
        },
        {
            title: 'Offtake',
            dataIndex: 'offtakeQty',
            render: (text) => <span style={{ fontSize: '11px' }}>{text}</span>,
        },
    ];

    return (
        <Table
            pagination={false}
            size="small"
            columns={columns}
            dataSource={data}
            title={() => title || ''}
        />
    );
}
