// ReturnProductsExactCard.jsx
import { Button, Card } from 'antd';
import { ChevronsRight, Filter, Undo2 } from 'lucide-react';

const BLUE = '#2563EB';
const GREY_TRACK = '#E5E7EB';
const CARD_HEIGHT = 320; // <- same height as your other cards; change if needed

const rows = [
    { name: 'Category 01', value: 12845 },
    { name: 'Category 04', value: 10694 },
    { name: 'Category 02', value: 8246 },
    { name: 'Category 09', value: 6864 },
    { name: 'Category 03', value: 4106 },
];

const fmt = (n) => new Intl.NumberFormat('en-US').format(n);

export default function ReturnProductsExactCard({ height = CARD_HEIGHT }) {
    const max = Math.max(...rows.map((r) => r.value));

    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height }} // <- locked height
            bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-gray-100">
                            <Undo2 size={18} />
                        </span>
                        <span className="text-xl font-semibold">Return Products</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <div className="text-sm font-medium text-gray-900 mb-2">Category Name</div>

            {/* list fills remaining space */}
            <div className="flex-1 min-h-0">
                <div className="space-y-3">
                    {rows.map((r) => {
                        const pct = Math.max(0, Math.min(1, r.value / max)); // 0..1
                        return (
                            <div key={r.name} className="relative">
                                {/* row header */}
                                <div className="flex items-center justify-between">
                                    <div className="text-[13px] text-gray-500">{r.name}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[13px] text-gray-700 font-medium tabular-nums">
                                            {fmt(r.value)}
                                        </div>
                                        <ChevronsRight size={14} style={{ color: BLUE }} />
                                    </div>
                                </div>

                                {/* full-width track + fill */}
                                <div
                                    className="mt-1 h-[3px] w-full rounded-full"
                                    style={{ background: GREY_TRACK }}
                                >
                                    <div
                                        className="h-[3px] rounded-full"
                                        style={{ width: `${pct * 100}%`, background: BLUE }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}
