import { Button, Card, Table } from 'antd';
import { FileText, Filter } from 'lucide-react';

const CARD_HEIGHT = 320;
const fmtIN = (n) => new Intl.NumberFormat('en-IN').format(n);

const data = [
    { key: 2, name: 'Product - 9', qty: 4500, amount: 1383850, icon: '🥤' },
    { key: 3, name: 'Product - 2', qty: 4200, amount: 1275350, icon: '🧴' },
    { key: 4, name: 'Product - 6', qty: 3900, amount: 1256720, icon: '🧼' },
    { key: 5, name: 'Product - 1', qty: 3500, amount: 1203950, icon: '🧪' },
];

export default function TopSellingProductsCard() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 text-base">
                        {row.icon}
                    </span>
                    <span className="text-gray-800">{row.name}</span>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            align: 'right',
            render: (v) => fmtIN(v),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            render: (v) => fmtIN(v),
        },
    ];

    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_HEIGHT }}
            bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <FileText size={18} />
                        </span>
                        <span className="text-xl font-semibold">Top Selling Products</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <div className="flex-1 min-h-0">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="key"
                    pagination={false}
                    size="small"
                    scroll={{ y: 180 }} // tuned to fit 320px card
                    className="
            [&_.ant-table]:!bg-transparent
            [&_.ant-table-thead>tr>th]:!bg-transparent [&_.ant-table-thead>tr>th]:!text-gray-900
            [&_.ant-table-tbody>tr>td]:!bg-transparent [&_.ant-table-tbody>tr>td]:!py-2
          "
                />
            </div>
        </Card>
    );
}
