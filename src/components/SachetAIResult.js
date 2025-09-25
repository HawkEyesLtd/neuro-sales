import { Col, Row, Table } from 'antd';

import formatAccuracy from '../util/formatAccuracy';

function SachetAIResult({ data }) {
    // sachet column
    const shareColumn = [
        {
            title: 'Company',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Sachet Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Visible Qty.',
            dataIndex: 'totalDetectedQty',
            key: 'totalDetectedQty',
            align: 'center',
        },
        {
            title: 'Orientation Adherence',
            dataIndex: 'orientation',
            key: 'orientation',
            align: 'center',
        },
        {
            title: 'Slot Adherence',
            dataIndex: 'slot',
            key: 'slot',
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
            {data?.map((item, i) => (
                <Row gutter={[20, 10]} key={item?.name}>
                    <Col>
                        <p
                            style={{
                                margin: '10px 0 0 0',
                                fontWeight: 500,
                                fontSize: '14px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexWarp: 'wrap',
                                gap: '20px',
                            }}
                        >
                            <strong>Combined Sachet Hanger: {item?.combinedHanger}</strong>
                            <strong>Brand Exclusive Hanger: {item?.brandHanger}</strong>
                        </p>
                        <Table
                            size="small"
                            columns={shareColumn}
                            dataSource={item?.sku || []}
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
                            <strong>Share of Sachet</strong>
                        </p>
                        <Table
                            size="small"
                            columns={sosColumn}
                            dataSource={item?.share || []}
                            pagination={false}
                            bordered
                        />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default SachetAIResult;
