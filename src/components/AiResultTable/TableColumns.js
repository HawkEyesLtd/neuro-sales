const getBaseColumnStyle = (idx, val, isTotal = false) => ({
    props: {
        style:
            idx !== val.arrLen - 2
                ? { border: 'none', padding: '2px 8px', fontSize: '12px' }
                : { padding: '2px 8px', fontSize: '12px' },
    },
    children: (
        <span style={isTotal ? { fontWeight: 600, fontSize: '12px' } : { fontSize: '12px' }}>
            {val}
        </span>
    ),
});

export const mainColumns = [
    {
        title: 'SKUs Name',
        dataIndex: 'name',
        key: 'name',
        render: (arr, val, idx) => getBaseColumnStyle(idx, val.name, val.name === 'Total'),
    },
    {
        title: 'Planned Qty',
        dataIndex: 'plannedQty',
        key: 'plannedQty',
        render: (_, val, idx) => getBaseColumnStyle(idx, val.plannedQty, val.name === 'Total'),
    },
    {
        title: 'AI Detected Qty',
        dataIndex: 'detectedQty',
        key: 'detectedQty',
        render: (_, val, idx) => getBaseColumnStyle(idx, val.detectedQty, val.name === 'Total'),
    },
    {
        title: 'Accuracy',
        dataIndex: 'accuracy',
        key: 'accuracy',
        align: 'right',
        render: (_, val, idx) =>
            getBaseColumnStyle(
                idx,
                typeof val.accuracy === 'number' ? `${val.accuracy.toFixed(2)}%` : '',
                val.name === 'Total'
            ),
    },
];

export const sosColumns = [
    {
        title: 'Company',
        dataIndex: 'owner',
        key: 'owner',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
    {
        title: 'AI Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
];

export const posmColumns = [
    {
        title: 'POSMs Name',
        dataIndex: 'name',
        key: 'name',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
    {
        title: 'Used Qty',
        dataIndex: 'qty',
        key: 'qty',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
    {
        title: 'AI Qty',
        dataIndex: 'detectedQty',
        key: 'detectedQty',
        render: (v) => <span style={{ fontSize: '12px' }}>{v}</span>,
    },
    {
        title: 'Accuracy',
        dataIndex: 'accuracy',
        key: 'accuracy',
        render: (v) => <span style={{ fontSize: '12px' }}>{`${v?.toFixed(2) || 0}%`}</span>,
    },
];
