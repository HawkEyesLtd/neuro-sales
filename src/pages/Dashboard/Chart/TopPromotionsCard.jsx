import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Filter, Megaphone } from 'lucide-react';
import { useMemo } from 'react';

const CARD_HEIGHT = 320;
const BLUE = '#2563EB';

export default function TopPromotionsCard({ height = CARD_HEIGHT }) {
    const labels = [
        'Summer Sale',
        'Flash Deal',
        'Holiday Special',
        'Clearance Sale',
        'New Year Bundle',
    ];
    const values = [2200, 2050, 1800, 1700, 1600];

    const option = useMemo(
        () => ({
            grid: { left: 100, right: 20, top: 12, bottom: 20 },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            xAxis: {
                type: 'value',
                axisLine: { show: true, lineStyle: { color: '#D1D5DB' } },
                axisTick: { show: false },
                axisLabel: { color: '#6B7280' },
                splitLine: { show: true, lineStyle: { color: '#E5E7EB', type: 'dashed' } }, // vertical grid lines
            },
            yAxis: {
                type: 'category',
                data: labels,
                inverse: true, // top to bottom as in mock
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#111827' },
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    data: values,
                    barWidth: 18,
                    itemStyle: { color: BLUE, borderRadius: [6, 6, 6, 6] },
                    emphasis: { itemStyle: { opacity: 0.9 } },
                },
            ],
            animationDuration: 350,
        }),
        []
    );

    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <Megaphone size={18} />
                        </span>
                        <span className="text-xl font-semibold">Top Performing Promotions</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <div className="rounded-2xl overflow-hidden" style={{ height: 220 }}>
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    notMerge
                    lazyUpdate
                />
            </div>
        </Card>
    );
}
