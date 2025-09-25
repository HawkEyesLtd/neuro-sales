import { Col, Row, Skeleton, Space } from 'antd';

function ExecutionSkeleton() {
    return (
        <div className="execution-item">
            <Row gap={[5, 5]} justify="space-between">
                <Col lg={6} md={12} sm={24}>
                    <Skeleton
                        paragraph={{
                            rows: 5,
                            width: ['80%', '70%', '80%', '60%', '80%'],
                        }}
                        active
                    />
                </Col>

                <Col lg={6} md={12} sm={24}>
                    <Skeleton
                        paragraph={{
                            rows: 4,
                            width: ['80%', '80%', '60%', '80%'],
                        }}
                        active
                    />
                </Col>

                <Col lg={6} md={12} sm={24}>
                    <Skeleton
                        paragraph={{
                            rows: 5,
                            width: ['80%', '70%', '80%', '60%', '80%'],
                        }}
                        active
                    />
                </Col>

                <Col lg={6} md={12} sm={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Space style={{ alignItems: 'start' }}>
                        <Skeleton.Image active />
                        <Skeleton.Button active />
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default ExecutionSkeleton;
