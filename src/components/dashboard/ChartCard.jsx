import { MoreOutlined } from '@ant-design/icons';
import { Card, Spin, Typography } from 'antd';

const { Title } = Typography;

function ChartCard({
    title,
    children,
    loading = false,
    actions = null,
    height = 300,
    className = '',
    extra = null,
}) {
    return (
        <Card
            className={`h-full shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
            title={
                <div className="flex items-center justify-between">
                    <Title level={5} className="mb-0 text-gray-800">
                        {title}
                    </Title>
                    {extra}
                </div>
            }
            extra={
                actions || (
                    <MoreOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
                )
            }
            bodyStyle={{ padding: '20px', height: `${height}px` }}
        >
            <Spin spinning={loading} tip="Loading...">
                <div className="h-full w-full">{children}</div>
            </Spin>
        </Card>
    );
}

export default ChartCard;
