import { Col, Row, Table } from 'antd';

import formatAccuracy from '../util/formatAccuracy';

function SOSAIResult({ data }) {
    // sos column
    const shareColumn = [
        {
            title: 'Company Name',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Min Qty.',
            dataIndex: 'minQty',
            key: 'minQty',
            align: 'center',
        },
        {
            title: 'Visible Qty.',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Shelving Norm',
            dataIndex: 'shelvingNorm',
            key: 'shelvingNorm',
            align: 'center',
        },
    ];

    // sos column
    const sosColumn = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'UBL',
            dataIndex: 'ubl',
            key: 'ubl',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
        {
            title: 'Competitor',
            dataIndex: 'competitor',
            key: 'competitor',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
    ];

    return (
        <div>
            {data
                ?.filter((x) => x.name === 'SOS')
                ?.map((item, i) => (
                    <Row gutter={[20, 10]} key={item.name}>
                        <Col>
                            {item?.box?.map((box) => (
                                <div key={box.category}>
                                    <p
                                        style={{
                                            margin: '10px 0 0 0',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                        }}
                                    >
                                        <strong>Category Name:</strong> {box.category}
                                    </p>
                                    <Table
                                        size="small"
                                        columns={shareColumn}
                                        dataSource={box.sku || []}
                                        pagination={false}
                                        bordered
                                    />
                                </div>
                            ))}
                        </Col>
                        <Col>
                            <div>
                                <p
                                    style={{
                                        margin: '10px 0 0 0',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                    }}
                                >
                                    <strong>Share of Shelf</strong>
                                </p>
                                <Table
                                    size="small"
                                    columns={sosColumn}
                                    dataSource={item?.share || []}
                                    pagination={false}
                                    bordered
                                />
                            </div>
                        </Col>
                    </Row>
                ))}
        </div>
    );
}

export default SOSAIResult;
