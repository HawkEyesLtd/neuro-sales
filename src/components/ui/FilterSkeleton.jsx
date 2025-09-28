import { Col, Skeleton } from 'antd';

function FilterSkeleton() {
    return new Array(4)?.fill('')?.map((_, i) => (
        <Col key={i} xs={12} sm={8} md={6} lg={6} xl={6}>
            <Skeleton.Input active size="large" block style={{ width: '100%' }} />
        </Col>
    ));
}

export default FilterSkeleton;
