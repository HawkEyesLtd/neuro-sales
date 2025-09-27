import { Button, Card, Table } from 'antd';
import { Filter, Star } from 'lucide-react';
import { useState } from 'react';

const CARD_HEIGHT = 320;

export default function LeaderboardCard({ height = CARD_HEIGHT }) {
    const [sorter, setSorter] = useState({ field: 'sales', order: 'descend' });

    const data = [
        { key: 1, name: 'Rahim Hossain', sales: 5000, orders: 150 },
        { key: 2, name: 'Shuvo Ahmed', sales: 4500, orders: 140 },
        { key: 3, name: 'Rina Begum', sales: 4200, orders: 136 },
        { key: 4, name: 'Anwar Hossain', sales: 3900, orders: 135 },
        { key: 5, name: 'Nabila Sultana', sales: 3500, orders: 132 },
    ];

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: (
                <>
                    Sales <span className="text-gray-400">▾</span>
                </>
            ),
            dataIndex: 'sales',
            key: 'sales',
            align: 'right',
            sorter: true,
        },
        {
            title: (
                <>
                    Orders <span className="text-gray-400">▾</span>
                </>
            ),
            dataIndex: 'orders',
            key: 'orders',
            align: 'right',
            sorter: true,
        },
    ];

    const sorted = [...data].sort((a, b) => {
        const f = sorter.field || 'sales';
        const dir = sorter.order === 'ascend' ? 1 : -1;
        return a[f] > b[f] ? dir : -dir;
    });

    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <Star size={18} />
                        </span>
                        <span className="text-xl font-semibold">Leaderboard</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <Table
                columns={columns}
                dataSource={sorted}
                rowKey="key"
                pagination={false}
                size="small"
                onChange={(_, __, sorterObj) => setSorter(sorterObj)}
                scroll={{ y: 205 }}
                className="
          [&_.ant-table]:!bg-transparent
          [&_.ant-table-container]:!border-0
          [&_.ant-table-thead>tr>th]:!bg-transparent [&_.ant-table-thead>tr>th]:!text-gray-900
          [&_.ant-table-tbody>tr>td]:!bg-transparent [&_.ant-table-tbody>tr>td]:!py-2
          [&_.ant-table-tbody>tr]:!border-gray-200
        "
            />
        </Card>
    );
}
