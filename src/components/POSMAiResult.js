import { Col, Row, Table } from 'antd';

import formatAccuracy from '../util/formatAccuracy';

function POSMAiResult({ data }) {
    // sos column
    const materialColumn = [
        {
            title: 'Company',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Input Qty.',
            dataIndex: 'qty',
            key: 'qty',
            render: (qty, record) => (
                <div>
                    {qty} {record?.isDeployed ? `(Deployed Qty)` : null}
                </div>
            ),
            align: 'center',
        },
        {
            title: 'Visible Qty.',
            dataIndex: 'detectedQty',
            key: 'detectedQty',
            align: 'center',
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            align: 'center',
            render: (accuracy) => formatAccuracy(accuracy),
        },
        // {
        //     title: 'Quality Feedback',
        //     dataIndex: 'quality',
        //     key: 'quality',
        //     align: 'center',
        //     render: (quality) => (quality?.length ? `${quality?.map((q) => q).join(', ')}` : 'N/A'),
        // },
        // {
        //     title: 'Life Cycle',
        //     dataIndex: 'life',
        //     key: 'life',
        //     align: 'center',
        //     render: (v) => v || 'N/A',
        // },
    ];

    // sovm overall column
    const sovmColumn = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Present Count',
            dataIndex: 'presenceCount',
            key: 'presenceCount',
            align: 'center',
        },
        {
            title: 'POSM by Count (%)',
            dataIndex: 'sovmByCount',
            key: 'sovmByCount',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
        {
            title: 'POSM by Surface Area (%)',
            dataIndex: 'sovmBySurface',
            key: 'sovmBySurface',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
    ];

    return (
        <div>
            {data?.map((item, i) => (
                <Row gutter={[20, 10]} key={item.name}>
                    <Col>
                        <p
                            style={{
                                margin: '10px 0 0 0',
                                fontWeight: 500,
                                fontSize: '14px',
                            }}
                        >
                            <strong> UBL POSM AI Accuracy:</strong> {formatAccuracy(item?.accuracy)}
                        </p>
                        <Table
                            size="small"
                            columns={materialColumn}
                            dataSource={item?.material || []}
                            pagination={false}
                            bordered
                        />
                    </Col>
                    <Col>
                        <p
                            style={{
                                margin: '10px 0 0 0',
                                fontWeight: 500,
                                fontSize: '14px',
                            }}
                        >
                            <strong> POSM (Overall)</strong>
                        </p>
                        <Table
                            size="small"
                            columns={sovmColumn}
                            dataSource={item?.sovm || []}
                            pagination={false}
                            bordered
                        />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default POSMAiResult;
