import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import CountUp from 'react-countup';

const { Text } = Typography;

function MetricCard({
    title,
    value,
    suffix = '',
    icon,
    trend,
    trendValue,
    trendLabel,
    loading = false,
    color = '#1890ff',
}) {
    const getTrendIcon = () => {
        if (trend === 'up') {
            return <ArrowUpOutlined className="text-green-500" />;
        } else if (trend === 'down') {
            return <ArrowDownOutlined className="text-red-500" />;
        }
        return null;
    };

    const getTrendColor = () => {
        if (trend === 'up') {
            return 'text-green-500';
        }
        if (trend === 'down') {
            return 'text-red-500';
        }
        return 'text-gray-500';
    };

    return (
        <Card
            className="h-full shadow-md hover:shadow-lg transition-shadow duration-300"
            loading={loading}
            bodyStyle={{ padding: '20px' }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {icon && (
                        <div
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: `${color}15`, color }}
                        >
                            {icon}
                        </div>
                    )}
                    <div>
                        <Text className="text-gray-600 text-sm font-medium block mb-1">
                            {title}
                        </Text>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <div className="text-2xl font-bold text-gray-800">
                    {typeof value === 'number' ? <CountUp end={value} separator="," /> : value}
                    {suffix && <span className="text-lg">{suffix}</span>}
                </div>
            </div>

            {(trend || trendValue || trendLabel) && (
                <div className="flex items-center space-x-2">
                    {getTrendIcon()}
                    <span className={`text-sm font-medium ${getTrendColor()}`}>
                        {trendValue} {trendLabel}
                    </span>
                </div>
            )}
        </Card>
    );
}

export default MetricCard;
