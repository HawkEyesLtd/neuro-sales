import { Col, Row, Table } from 'antd';

import formatAccuracy from '../util/formatAccuracy';

function ConfidenceScoreResult({ data }) {
    // sovm overall column
    const column = [
        {
            title: 'Criteria',
            dataIndex: 'criteria',
            key: 'criteria',
        },
        {
            title: 'Max Score',
            dataIndex: 'floor',
            key: 'floor',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
        {
            title: 'Outlet Score',
            dataIndex: 'score',
            key: 'score',
            align: 'center',
            render: (v) => formatAccuracy(v),
        },
    ];

    return (
        <Row gutter={[20, 10]}>
            <Col xxl={8} xl={10} lg={18} span={24}>
                <Table
                    title={() => `Confidence Score: ${formatAccuracy(data?.confidenceScore)}`}
                    size="small"
                    columns={column}
                    dataSource={data?.confidence || []}
                    pagination={false}
                    bordered
                />
            </Col>
        </Row>
    );
}

export default ConfidenceScoreResult;
