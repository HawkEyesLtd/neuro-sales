import { Skeleton, Space } from 'antd';

function TableSkeleton() {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {new Array(10).fill('').map((_, i) => (
                <Skeleton.Input
                    key={i}
                    size="large"
                    block
                    active
                    style={{ width: '100%', display: 'block' }}
                />
            ))}
        </Space>
    );
}

export default TableSkeleton;
