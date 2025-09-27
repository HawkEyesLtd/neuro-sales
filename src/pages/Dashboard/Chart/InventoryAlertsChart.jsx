// InventoryAlertsExactCard.jsx
import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Boxes, Filter } from 'lucide-react';
import { useMemo } from 'react';

export default function InventoryAlertsExactCard({
    height = 320, // card height (keep same as your other cards)
    chartHeight = 210, // drawing area; leaves room for legend under the plot
}) {
    const categories = ['Product 01', 'Product 02', 'Product 03'];

    const option = useMemo(() => {
        const BLUE = '#2563EB';
        const BLUE_LIGHT = '#93B4FF';
        const GRID = '#D1D5DB'; // light grey dashed grid
        const AXIS = '#111827'; // dark axis (left & bottom)
        const LABEL = '#6B7280';

        return {
            grid: { left: 60, right: 16, top: 20, bottom: 70 }, // bottom space for legend
            tooltip: {
                trigger: 'axis',
                confine: true,
                valueFormatter: (v) => `${v}%`,
                axisPointer: { type: 'line', lineStyle: { color: '#9AA7C3', type: 'dashed' } },
            },

            // X axis (category)
            xAxis: {
                type: 'category',
                data: categories,
                boundaryGap: true,
                axisLine: { show: true, lineStyle: { color: AXIS, width: 1.2 } }, // bottom line
                axisTick: { show: false },
                axisLabel: { color: LABEL, fontSize: 12, margin: 12 },
                splitLine: { show: true, lineStyle: { color: GRID, type: 'dashed' } }, // vertical dashed
            },

            // Y axis (percent)
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 25,
                axisLine: { show: true, lineStyle: { color: AXIS, width: 1.2 } }, // left line
                axisTick: { show: false },
                axisLabel: {
                    color: LABEL,
                    fontSize: 12,
                    margin: 8,
                    formatter: (v) => `${v}%`,
                },
                splitLine: { show: true, lineStyle: { color: GRID, type: 'dashed' } }, // horizontal dashed
            },

            legend: {
                bottom: 8,
                left: 'center',
                itemWidth: 14,
                itemHeight: 10,
                itemGap: 24,
                icon: 'rect', // square swatch
                textStyle: { color: '#111827', fontSize: 13, fontWeight: 600 },
                data: ['Delivered', 'Stock'],
            },

            series: [
                {
                    name: 'Delivered',
                    type: 'line',
                    smooth: true,
                    data: [50, 75, 60],
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    itemStyle: { color: '#ffffff', borderColor: BLUE, borderWidth: 2 },
                    lineStyle: { width: 2.8, color: BLUE },
                    areaStyle: { color: 'transparent' }, // no fill in this design
                    z: 2,
                },
                {
                    name: 'Stock',
                    type: 'line',
                    smooth: true,
                    data: [60, 90, 55],
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 7,
                    itemStyle: { color: '#ffffff', borderColor: BLUE_LIGHT, borderWidth: 2 },
                    lineStyle: { width: 2, color: BLUE_LIGHT, opacity: 0.9 },
                    areaStyle: { color: 'transparent' },
                    z: 1,
                    // vertical dashed line at Product 02 (like the mock)
                    markLine: {
                        silent: true,
                        symbol: 'none',
                        lineStyle: { type: 'dashed', color: '#9AA7C3' },
                        data: [{ xAxis: 'Product 02' }],
                    },
                },
            ],

            animationDuration: 350,
        };
    }, []);

    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height }}
            bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <Boxes size={18} />
                        </span>
                        <span className="text-xl font-semibold">Inventory Alerts</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            {/* Fixed-height plot area to keep proportions consistent */}
            <div className="rounded-2xl overflow-hidden" style={{ height: chartHeight }}>
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
