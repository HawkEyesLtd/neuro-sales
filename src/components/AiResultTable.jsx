import { Col, Row, Table } from 'antd';

function AiResultTable({ data }) {
    const columns = [
        {
            title: 'SKUs Name',
            dataIndex: 'name',
            key: 'name',
            render: (arr, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.name}
                    </span>
                ),
            }),
        },
        {
            title: 'Planned Qty',
            dataIndex: 'plannedQty',
            key: 'plannedQty',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.plannedQty}
                    </span>
                ),
            }),
        },
        {
            title: 'AI Detected Qty',
            dataIndex: 'detectedQty',
            key: 'detectedQty',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.detectedQty}
                    </span>
                ),
            }),
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            align: 'right',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {typeof val.accuracy === 'number' ? `${val.accuracy.toFixed(2)}%` : ''}
                    </span>
                ),
            }),
        },
    ];

    // sos column
    const sosColumn = [
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
        // {
        //     title: 'Accuracy',
        //     dataIndex: 'sos',
        //     key: 'sos',
        //     render: (v) => <span style={{ fontSize: '12px' }}>{`${Math.round(v)}%`}</span>,
        // },
    ];

    const posmColumn = [
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

    return (
        <>
            <div className="ai-table-container">
                {data
                    ?.filter(
                        (x) =>
                            x.name !== 'DA' &&
                            x.name !== 'QPDS' &&
                            x.name !== 'FAT' &&
                            x.name !== 'POSM'
                    )
                    ?.map((item, i) => (
                        <div key={item.name}>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                                {item.name}
                            </p>
                            {item?.box?.map((box) => (
                                <div key={box.category}>
                                    <p
                                        style={{
                                            margin: '10px 0 0 0',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Category Name: {box.category}
                                    </p>
                                    <Table
                                        size="small"
                                        columns={sosColumn}
                                        dataSource={box.sku || []}
                                        pagination={false}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                {data
                    ?.filter(
                        (x) =>
                            x.name !== 'DA' &&
                            x.name !== 'QPDS' &&
                            x.name !== 'FAT' &&
                            x.name !== 'SOS'
                    )
                    ?.map((item, i) => (
                        <div key={item.name}>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                                {item.name}
                            </p>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
                                AI Accuracy: {item?.accuracy?.toFixed(2) || 0}%
                            </p>
                            <Table
                                rowKey="name"
                                size="small"
                                columns={posmColumn}
                                dataSource={
                                    item.material
                                        ?.map((x) => ({ ...x }))
                                        .concat({
                                            name: 'Total',
                                            qty: item.totalUsedQty || 0,
                                            detectedQty: item.totalDetectedQty || 0,
                                            accuracy: Math.round(item.accuracy || 0),
                                        }) || []
                                }
                                pagination={false}
                            />
                        </div>
                    ))}

                {data
                    ?.filter(
                        (x) =>
                            x.name !== 'DA' &&
                            x.name !== 'QPDS' &&
                            x.name !== 'POSM' &&
                            x.name !== 'SOS'
                    )
                    ?.map((item, i) => (
                        <div key={item.name}>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                                Fixed Asset Tracking
                            </p>
                            {item?.fatQA?.map((question) => (
                                <div key={question.id} style={{ display: 'flex', gap: 3 }}>
                                    {question.subQuesName ? (
                                        <div style={{ display: 'flex', gap: 25 }}>
                                            <div style={{ display: 'flex', gap: 3 }}>
                                                <p style={{ margin: 0 }}>{question.name}</p>:
                                                <p style={{ margin: 0 }}> {question.answer}</p>
                                            </div>

                                            <div style={{ display: 'flex', gap: 3 }}>
                                                <p style={{ margin: 0 }}>{question.subQuesName}</p>:
                                                <p style={{ margin: 0 }}>
                                                    {' '}
                                                    {question.subQuesAnswer}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p style={{ margin: 0 }}>{question.name}</p>:
                                            <p style={{ margin: 0 }}> {question.answer}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>

            {data
                ?.filter((x) => x.name !== 'SOS' && x.name !== 'FAT' && x.name !== 'POSM')
                ?.map((item, i) => (
                    <div style={{ marginTop: '10px' }} key={item.name}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                            {item.name === 'DA' ? 'Display Audit' : item.name}
                        </p>
                        <div style={{ display: 'flex', gap: 15 }}>
                            {/* <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                                Overall Compliance: {Math.round(item.overallCompliance || 0)}%
                            </p>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                                Variant Wise Compliance:{' '}
                                {Math.round(item.variantWiseCompliance || 0)}%
                            </p> */}
                        </div>
                        <Row gutter={[10, 10]}>
                            {item?.planogram?.map((sku) => {
                                const aiData = sku?.sku
                                    ?.map((skus) => ({
                                        ...skus,
                                        arrLen: Number(sku.sku.length + 1 || 0),
                                    }))
                                    .concat({
                                        name: 'Total',
                                        plannedQty: sku.totalPlannedQty,
                                        detectedQty: sku.totalDetectedQty,
                                    });
                                return (
                                    <Col sm={24} md={12} lg={8} key={sku.name}>
                                        <p
                                            style={{
                                                margin: '10px 0 0 0',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                            }}
                                        >
                                            {sku.name} Overall compliance:{' '}
                                            {sku?.compliance?.toFixed(2) || 0}%
                                        </p>
                                        <p
                                            style={{
                                                margin: '10px 0 0 0',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                            }}
                                        >
                                            {sku.name} Variant Wise Compliance:{' '}
                                            {sku?.variantWiseCompliance?.toFixed(2) || 0}%
                                        </p>
                                        <Table
                                            size="small"
                                            columns={columns}
                                            dataSource={aiData || []}
                                            pagination={false}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                ))}
        </>
    );
}

export default AiResultTable;
