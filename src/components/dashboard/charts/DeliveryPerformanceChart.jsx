function DeliveryPerformanceChart() {
    const monthlyData = [45, 52, 48, 61, 55, 67, 73, 78];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    return (
        <div className="w-full h-full flex flex-col">
            <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-500">65%</div>
                <div className="text-sm text-gray-600">Delivery Rate</div>
            </div>
            <div className="flex items-end justify-between flex-1 px-4">
                {monthlyData.map((percentage, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className="bg-green-500 rounded-t-sm mb-1 hover:bg-green-600 transition-all duration-300"
                            style={{
                                height: `${percentage * 1.5}px`,
                                width: '20px',
                                minHeight: '10px',
                            }}
                        />
                        <div className="text-xs text-gray-500 transform rotate-45 origin-center">
                            {months[index]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeliveryPerformanceChart;
