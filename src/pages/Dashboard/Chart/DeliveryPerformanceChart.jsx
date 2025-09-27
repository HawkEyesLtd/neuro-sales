// src/components/DeliveryPerformanceChart.jsx
import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Filter, PackageCheck } from 'lucide-react';
import { useMemo } from 'react';

const kFmt = (v) => `${Math.round(v / 1_000)}K`;

export default function DeliveryPerformanceChart() {
    // Exact demo values to match the screenshot proportions
    const categories = ['3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr'];
    const values = [48_000, 65_000, 90_000, 100_000, 88_000, 105_000];

    const option = useMemo(
        () => ({
            // keep the chart tight inside the card
            grid: { left: 64, right: 16, top: 8, bottom: 36 },
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: '#111827',
                borderWidth: 0,
                textStyle: { color: '#fff' },
                valueFormatter: (v) => kFmt(v),
                axisPointer: { type: 'shadow', shadowStyle: { opacity: 0.06 } },
            },
            xAxis: {
                type: 'category',
                data: categories,
                boundaryGap: true,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }, // no vertical grid lines
                axisLabel: {
                    color: '#6B7280', // gray-500
                    fontSize: 12,
                    margin: 12,
                },
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 110_000, // a little headroom above 100K so bars don't touch grid
                interval: 25_000, // 0,25K,50K,75K,100K
                splitNumber: 5,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: {
                    show: true,
                    lineStyle: { color: '#E5E7EB' }, // light gray (horizontal only)
                },
                axisLabel: {
                    color: '#6B7280',
                    fontSize: 12,
                    formatter: (v) => kFmt(v),
                    margin: 12,
                },
            },
            series: [
                {
                    type: 'bar',
                    data: values,
                    // bar sizing & spacing tuned to the mock
                    barMaxWidth: 34,
                    barCategoryGap: '36%',
                    itemStyle: {
                        color: '#2563EB', // blue-600
                        borderRadius: [8, 8, 0, 0], // rounded top corners
                    },
                    emphasis: { itemStyle: { opacity: 0.9 } },
                },
            ],
            animationDuration: 400,
        }),
        []
    );

    return (
        <Card
            className="rounded-3xl shadow-sm bg-white border border-gray-100"
            bodyStyle={{ padding: 16 }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <PackageCheck size={18} />
                        </span>
                        <span className="text-xl font-semibold">Delivery Performance</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <ReactECharts
                option={option}
                style={{ height: 230, width: '100%' }}
                notMerge
                lazyUpdate
            />
        </Card>
    );
}
