import { MoreOutlined } from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';

const { Title } = Typography;

function TableCard({
    title,
    columns,
    dataSource,
    loading = false,
    pagination = false,
    actions = null,
    className = '',
    extra = null,
    size = 'middle',
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
            bodyStyle={{ padding: '0' }}
        >
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                size={size}
                className="dashboard-table"
            />
        </Card>
    );
}

export default TableCard;
