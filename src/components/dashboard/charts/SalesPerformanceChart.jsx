function SalesPerformanceChart() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">87.3M</div>
                <div className="text-lg text-gray-600 mb-4">Total Sales</div>
                <div className="bg-gray-200 rounded-lg p-4">
                    <div className="flex items-end space-x-2 h-24">
                        {[65, 80, 70, 85, 75, 90, 95].map((height, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                                style={{ height: `${height}%`, width: '20px' }}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                        Sales Performance Trend
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesPerformanceChart;
