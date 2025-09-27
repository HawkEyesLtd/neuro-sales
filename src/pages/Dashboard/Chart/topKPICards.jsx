// TopKPICards.jsx
import { Button, Card } from 'antd';
import {
    AlertTriangle,
    BadgeDollarSign,
    Filter,
    LineChart,
    Percent,
    Receipt,
    TrendingUp,
    Users,
} from 'lucide-react';

/* ---------- shared helpers ---------- */
const CARD_H = 172; // uniform height; tweak if you need a different size
const Num = ({ children }) => (
    <div className="text-3xl leading-none font-extrabold tracking-tight">{children}</div>
);
const Sub = ({ positive, icon = 'up', children }) => (
    <div
        className={`mt-4 text-sm ${
            positive ? 'text-green-600' : 'text-red-600'
        } flex items-center gap-2`}
    >
        {positive ? <TrendingUp size={16} /> : <AlertTriangle size={16} />}
        {children}
    </div>
);

/* ---------- 1) Total Sales ---------- */
export function TotalSalesCard() {
    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_H }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-gray-900 text-white">
                            {/* Taka context via money badge icon; title conveys currency */}
                            <BadgeDollarSign size={18} />
                        </span>
                        <span className="text-lg font-semibold">Total Sales</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <Num>87.3M</Num>
            <Sub positive>
                9.19% <span className="text-gray-700">Since last month</span>
            </Sub>
        </Card>
    );
}

/* ---------- 2) Total Orders ---------- */
export function TotalOrdersCard() {
    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_H }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-gray-900 text-white">
                            <Receipt size={18} />
                        </span>
                        <span className="text-lg font-semibold">Total Orders</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <Num>687.3k</Num>
            <Sub positive>
                26.87% <span className="text-gray-700">Since last month</span>
            </Sub>
        </Card>
    );
}

/* ---------- 3) Target VS Achiev ---------- */
export function TargetVsAchievCard() {
    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_H }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-gray-900 text-white">
                            <LineChart size={18} />
                        </span>
                        <span className="text-lg font-semibold">Target VS Acv</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <div className="text-3xl leading-none font-extrabold tracking-tight">
                87.3M<span className="text-gray-400">/95M</span>
            </div>
            <Sub positive>
                26.87% <span className="text-gray-700">Since last month</span>
            </Sub>
        </Card>
    );
}

/* ---------- 4) Active SR ---------- */
export function ActiveSrCard() {
    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_H }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-gray-900 text-white">
                            <Users size={18} />
                        </span>
                        <span className="text-lg font-semibold">Active SR</span>
                    </div>
                    <Button type="text" icon={<Filter size={18} />} />
                </div>
            }
        >
            <Num>725/769</Num>
            <div className="mt-4 text-sm text-red-600 flex items-center gap-2">
                <AlertTriangle size={16} />
                <span className="font-semibold">24 SRs</span>
                <span className="text-gray-700">Today’s Leave</span>
            </div>
        </Card>
    );
}

/* ---------- 5) Strike Rate ---------- */
export function StrikeRateCard() {
    return (
        <Card
            className="rounded-3xl shadow-sm border border-gray-100 bg-white"
            style={{ height: CARD_H }}
            bodyStyle={{ padding: 16, height: '100%' }}
            title={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-gray-900 text-white">
                            <Percent size={18} />
                        </span>
                        <span className="text-lg font-semibold">Strike Rate</span>
                    </div>
                </div>
            }
        >
            <div className="flex items-center justify-center">
                <Num>
                    <span className="text-5xl">68%</span>
                </Num>
            </div>
        </Card>
    );
}

/* ---------- optional: quick layout to render the row ---------- */
export function TopKPIRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <TotalSalesCard />
            <TotalOrdersCard />
            <TargetVsAchievCard />
            <ActiveSrCard />
            <StrikeRateCard />
        </div>
    );
}
