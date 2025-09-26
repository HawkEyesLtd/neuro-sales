function B2BOrderPerformanceChart() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-opacity-20" />
                <div
                    className="absolute inset-0 rounded-full border-8 border-blue-500 border-l-transparent transform -rotate-90"
                    style={{
                        borderRightColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: '#1890ff',
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">65%</div>
                        <div className="text-xs text-gray-500">Order</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
                <div className="text-sm">
                    <div className="text-blue-500 font-semibold">748K</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                </div>
                <div className="text-sm">
                    <div className="text-green-500 font-semibold">82.1K</div>
                    <div className="text-xs text-gray-500">Completed</div>
                </div>
            </div>
        </div>
    );
}

export default B2BOrderPerformanceChart;
