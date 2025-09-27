// src/components/B2BOrderPerformanceChart.jsx
import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Building2, Filter } from 'lucide-react';
import { useMemo } from 'react';

export default function B2BOrderPerformanceChart({
    percent = 65, // center %
    totalOutlet = '786K',
    totalOrder = '82.1K',
}) {
    const main = '#2563EB'; // blue
    const lite = '#93B4FF'; // light blue

    const option = useMemo(
        () => ({
            tooltip: { show: false },
            series: [
                {
                    type: 'pie',
                    radius: ['72%', '90%'], // thick ring
                    center: ['50%', '54%'],
                    startAngle: 90, // start at top
                    clockwise: true,
                    avoidLabelOverlap: true,
                    label: {
                        show: true,
                        position: 'center',
                        formatter: () => `{val|${percent}%}\n{small|Outlet}`,
                        rich: {
                            val: {
                                fontSize: 28,
                                fontWeight: 800,
                                lineHeight: 30,
                                color: '#111827',
                            },
                            small: {
                                fontSize: 12,
                                lineHeight: 16,
                                color: '#6B7280',
                                padding: [4, 0, 0, 0],
                            },
                        },
                    },
                    labelLine: { show: false },
                    itemStyle: { borderWidth: 0 },
                    data: [
                        { value: percent, name: 'Outlet', itemStyle: { color: main } },
                        { value: 100 - percent, name: 'Remaining', itemStyle: { color: lite } },
                    ],
                    emphasis: { scale: false },
                },
            ],
            animationDuration: 300,
        }),
        [percent]
    );

    return (
        <Card
            className="rounded-3xl shadow-sm bg-white border border-gray-100"
            bodyStyle={{ padding: 16 }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <Building2 size={18} />
                        </span>
                        <span className="text-xl font-semibold">B2B Order Performance</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <div className="w-full flex flex-col items-center">
                <ReactECharts
                    option={option}
                    style={{ height: 210, width: '100%' }}
                    notMerge
                    lazyUpdate
                />
                {/* legend row */}
                <div className="mt-2 flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-block w-4 h-4 rounded-sm"
                            style={{ background: main }}
                        />
                        <span className="text-sm text-gray-600">
                            Total Outlet:{' '}
                            <span className="font-extrabold text-gray-900">{totalOutlet}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-block w-4 h-4 rounded-sm"
                            style={{ background: lite }}
                        />
                        <span className="text-sm text-gray-600">
                            Total Order:{' '}
                            <span className="font-extrabold text-gray-900">{totalOrder}</span>
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
