import { Col, Row, Skeleton } from 'antd';

function AttendanceItemSkeleton() {
    return (
        <Row gutter={[5, 10]}>
            {new Array(15).fill('').map((_, i) => (
                <Col lg={6} key={i}>
                    <div
                        style={{
                            textAlign: 'center',
                            background: '#fff',
                            borderRadius: '5px',
                            padding: '5px',
                        }}
                    >
                        <Skeleton.Avatar shape="circle" size={80} active />
                        <Skeleton.Input
                            size="small"
                            style={{ marginTop: '8px', width: '80%' }}
                            active
                        />
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default AttendanceItemSkeleton;
