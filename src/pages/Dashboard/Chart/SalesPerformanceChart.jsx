// src/components/SalesPerformanceChart.jsx
import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Filter, LineChart } from 'lucide-react';
import { useMemo } from 'react';

const tkM = (v) => `৳${Math.round(v / 1_000_000)}M`;

export default function SalesPerformanceChart() {
    // ---- Dates (UTC) → ensures labels don't shift with local timezone
    const start = Date.UTC(2025, 3, 3, 0, 0, 0); // 3 Apr
    const mid = Date.UTC(2025, 3, 10, 0, 0, 0); // 10 Apr
    const end = Date.UTC(2025, 3, 17, 23, 59, 59); // 17 Apr (end of day)

    // Demo series (Apr 3 → Apr 17)
    const seriesData = useMemo(
        () =>
            [
                ['2025-04-03', 40e6],
                ['2025-04-04', 60e6],
                ['2025-04-05', 55e6],
                ['2025-04-06', 52e6],
                ['2025-04-07', 56e6],
                ['2025-04-08', 78e6],
                ['2025-04-09', 82e6],
                ['2025-04-10', 65e6],
                ['2025-04-11', 100e6],
                ['2025-04-12', 90e6],
                ['2025-04-13', 98e6],
                ['2025-04-14', 75e6],
                ['2025-04-15', 88e6],
                ['2025-04-16', 92e6],
                ['2025-04-17', 100e6],
            ].map(([d, v]) => [
                Date.UTC(...d.split('-').map((n, i) => (i === 1 ? Number(n) - 1 : Number(n)))),
                v,
            ]),
        []
    );

    const option = useMemo(
        () => ({
            grid: { left: 72, right: 16, top: 8, bottom: 40 }, // extra bottom space like the mock
            tooltip: {
                trigger: 'axis',
                confine: true,
                valueFormatter: (v) => tkM(v).replace('M', ' Million'),
                axisPointer: { type: 'line', lineStyle: { color: '#9AA7C3', type: 'dashed' } },
            },
            xAxis: {
                type: 'time',
                min: start,
                max: end,
                splitNumber: 2, // → 3 ticks (start, middle, end)
                boundaryGap: false,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }, // no vertical grid
                axisLabel: {
                    color: '#6B7280',
                    fontSize: 13,
                    margin: 14,
                    showMinLabel: true,
                    showMaxLabel: true,
                    formatter: (val) => {
                        const d = new Date(val);
                        const day = d.getUTCDate();
                        if (day === 3) return '3 Apr';
                        if (day === 10) return '10 Apr';
                        if (day === 17) return '17 Apr';
                        return '';
                    },
                },
            },
            yAxis: {
                type: 'value',
                min: 25e6,
                max: 125e6,
                interval: 25e6, // 25M steps → 25/50/75/100/125
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: true, lineStyle: { color: '#E5E7EB' } }, // horizontal only
                axisLabel: { color: '#6B7280', fontSize: 13, formatter: tkM, margin: 12 },
            },
            series: [
                {
                    name: 'Sales',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { width: 3.5, color: '#2563EB' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(37,99,235,0.30)' },
                                { offset: 1, color: 'rgba(37,99,235,0.04)' },
                            ],
                        },
                    },
                    data: seriesData,
                },
            ],
            animationDuration: 400,
        }),
        [seriesData]
    );

    return (
        <Card
            className="rounded-3xl shadow-sm bg-white border border-gray-100"
            bodyStyle={{ padding: 16 }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <LineChart size={18} />
                        </span>
                        <span className="text-xl font-semibold">Sales Performance</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            {/* rounded inner wrapper to clip canvas corners */}
            <div className="rounded-2xl overflow-hidden">
                <ReactECharts
                    option={option}
                    style={{ height: 230, width: '100%' }}
                    notMerge
                    lazyUpdate
                />
            </div>
        </Card>
    );
}
