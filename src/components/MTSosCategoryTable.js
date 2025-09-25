import { Table } from 'antd';

import OverallMtSosTable from './OverallMtSosTable';

export default function MTSosCategoryTable({ data }) {
    const categoryData = [...data.sku];
    categoryData.push({
        name: 'Total',
        detectedQty: data?.sku?.reduce((a, c) => a + c.detectedQty, 0),
    });

    // sos column
    const tableColumn = [
        {
            title: 'SKU Name',
            dataIndex: 'name',
            key: 'name',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
        {
            title: 'AI Qty',
            dataIndex: 'detectedQty',
            key: 'detectedQty',
            render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
        },
    ];
    const overallSovData = [
        {
            key: '1',
            type: 'Shelf',
            sizeInSize: data?.shelfSize || 0,
            percentage: data?.shelfPercentage || 0,
        },
        {
            key: '2',
            type: 'UBL',
            sizeInSize: data?.uniliverSize || 0,
            percentage: data?.uniliverPercentage || 0,
        },
    ];
    return (
        <div>
            <Table
                size="small"
                columns={tableColumn}
                dataSource={categoryData || []}
                pagination={false}
            />
            <div style={{ marginTop: '20px' }}>
                <OverallMtSosTable data={overallSovData} />
            </div>
        </div>
    );
}
