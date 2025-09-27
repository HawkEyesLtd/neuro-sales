import { Button, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Filter, LineChart } from 'lucide-react';
import { useMemo } from 'react';

const CARD_HEIGHT = 320;
const BLUE = '#2563EB';

const kFmt = (v) => `${Math.round(v / 1000)}K`;

export default function OrderTrendsByGeoCard({ height = CARD_HEIGHT }) {
    const cities = ['Rajshahi', 'Dhaka', 'Khulna', 'Sylhet', 'Chittagong', 'Rangpur'];
    const values = [80_000, 90_000, 95_000, 85_000, 105_000, 115_000];

    const option = useMemo(
        () => ({
            grid: { left: 50, right: 16, top: 12, bottom: 30 },
            tooltip: {
                trigger: 'axis',
                confine: true,
                valueFormatter: (v) => kFmt(v),
                axisPointer: { type: 'line', lineStyle: { color: '#9AA7C3', type: 'dashed' } },
            },
            xAxis: {
                type: 'category',
                data: cities,
                axisLine: { show: true, lineStyle: { color: '#D1D5DB' } },
                axisTick: { show: false },
                axisLabel: { color: '#6B7280', margin: 12 },
                splitLine: { show: true, lineStyle: { color: '#E5E7EB', type: 'dashed' } }, // vertical
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 125_000,
                interval: 25_000,
                axisLine: { show: true, lineStyle: { color: '#D1D5DB' } },
                axisTick: { show: false },
                axisLabel: { color: '#6B7280', formatter: (v) => kFmt(v), margin: 8 },
                splitLine: { show: true, lineStyle: { color: '#E5E7EB', type: 'dashed' } }, // horizontal
            },
            series: [
                {
                    type: 'line',
                    data: values,
                    smooth: true,
                    showSymbol: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: { color: '#fff', borderColor: BLUE, borderWidth: 2 },
                    lineStyle: { width: 3, color: BLUE },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(37,99,235,0.12)' },
                                { offset: 1, color: 'rgba(37,99,235,0.02)' },
                            ],
                        },
                    },
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
                            <LineChart size={18} />
                        </span>
                        <span className="text-xl font-semibold">Order Trends by Geo</span>
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
