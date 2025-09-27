import {
    AimOutlined,
    DollarOutlined,
    GiftOutlined,
    ShoppingCartOutlined,
    TrophyOutlined,
    UndoOutlined,
    UserOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Col, message, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HelmetHeader from '@/components/HelmetHeader';
import ChartCard from '@/components/dashboard/ChartCard';
import MetricCard from '@/components/dashboard/MetricCard';
import TableCard from '@/components/dashboard/TableCard';
import B2BOrderPerformanceChart from '@/components/dashboard/charts/B2BOrderPerformanceChart';
import DeliveryPerformanceChart from '@/components/dashboard/charts/DeliveryPerformanceChart';
import SalesPerformanceChart from '@/components/dashboard/charts/SalesPerformanceChart';
import { useGetDashboardDataMutation } from '@/redux/features/dashboard/dashboardApi';
import { setReFetchFilter } from '@/redux/features/loaderSlice';

function Dashboard() {
    const dispatch = useDispatch();
    const { reFetchFilter } = useSelector((state) => state.loader || {});

    // API hook
    const [getDashboardData, { isLoading }] = useGetDashboardDataMutation();

    // Initialize filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
    }, [dispatch, reFetchFilter]);

    // Initial data load
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getDashboardData();
            } catch (err) {
                message.error(err.message);
            }
        };
        fetchData();
    }, [getDashboardData]);

    // Fetch dashboard data function
    const fetchDashboardData = async () => {
        try {
            await getDashboardData();
        } catch (err) {
            message.error(err.message);
        }
    };

    // Mock data for development - replace with actual API data
    const metricsData = {
        totalSales: {
            value: 87300000,
            trend: 'up',
            trendValue: '6.10%',
            trendLabel: 'Since last month',
        },
        totalOrders: {
            value: 687300,
            trend: 'up',
            trendValue: '26.67%',
            trendLabel: 'Since last month',
        },
        targetVsAchiev: {
            value: '87.3M/95M',
            trend: 'up',
            trendValue: '26.87%',
            trendLabel: 'Since last month',
        },
        activeSR: {
            value: '725/769',
            trend: 'down',
            trendValue: '24.58%',
            trendLabel: "Today's Leave",
        },
        strikeRate: { value: 68, suffix: '%', trend: 'neutral' },
    };

    const inventoryAlertsColumns = [
        { title: 'Product', dataIndex: 'product', key: 'product' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Stock Level', dataIndex: 'stockLevel', key: 'stockLevel' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    const inventoryAlertsData = [
        {
            key: '1',
            product: 'Product 01',
            category: 'Category A',
            stockLevel: '75%',
            status: 'Delivered',
        },
        {
            key: '2',
            product: 'Product 02',
            category: 'Category B',
            stockLevel: '50%',
            status: 'Stock',
        },
        {
            key: '3',
            product: 'Product 03',
            category: 'Category C',
            stockLevel: '25%',
            status: 'Low Stock',
        },
    ];

    const topSellingColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    ];

    const topSellingData = [
        { key: '1', name: 'Product - 36', quantity: 5000, amount: 'Tk 79,690' },
        { key: '2', name: 'Product - 8', quantity: 4500, amount: 'Tk 33,350' },
        { key: '3', name: 'Product - 5', quantity: 4250, amount: 'Tk 75,350' },
        { key: '4', name: 'Product - 4', quantity: 3600, amount: 'Tk 58,770' },
        { key: '5', name: 'Product - 1', quantity: 3500, amount: 'Tk 203,950' },
    ];

    const returnProductsColumns = [
        { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
        { title: 'Category 01', dataIndex: 'category01', key: 'category01' },
    ];

    const returnProductsData = [
        { key: '1', categoryName: 'Category 01', category01: '15,848' },
        { key: '2', categoryName: 'Category 02', category01: '19,024' },
        { key: '3', categoryName: 'Category 03', category01: '8,248' },
        { key: '4', categoryName: 'Category 04', category01: '6,064' },
        { key: '5', categoryName: 'Category 05', category01: '4,108' },
    ];

    return (
        <>
            <HelmetHeader title="Dashboard" />

            {/* <div className="sticky top-0 z-50 bg-gray-50 py-4 mb-6">
                <Filter loading={isLoading} queryFunc={fetchDashboardData} pathname="/" />
            </div> */}

            {/* Key Metrics Row */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <MetricCard
                        title="Total Sales"
                        value={metricsData.totalSales.value}
                        icon={<DollarOutlined />}
                        trend={metricsData.totalSales.trend}
                        trendValue={metricsData.totalSales.trendValue}
                        trendLabel={metricsData.totalSales.trendLabel}
                        loading={isLoading}
                        color="#1890ff"
                    />
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <MetricCard
                        title="Total Orders"
                        value={metricsData.totalOrders.value}
                        icon={<ShoppingCartOutlined />}
                        trend={metricsData.totalOrders.trend}
                        trendValue={metricsData.totalOrders.trendValue}
                        trendLabel={metricsData.totalOrders.trendLabel}
                        loading={isLoading}
                        color="#52c41a"
                    />
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <MetricCard
                        title="Target VS Achiev"
                        value={metricsData.targetVsAchiev.value}
                        icon={<AimOutlined />}
                        trend={metricsData.targetVsAchiev.trend}
                        trendValue={metricsData.targetVsAchiev.trendValue}
                        trendLabel={metricsData.targetVsAchiev.trendLabel}
                        loading={isLoading}
                        color="#fa8c16"
                    />
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <MetricCard
                        title="Active SR"
                        value={metricsData.activeSR.value}
                        icon={<UserOutlined />}
                        trend={metricsData.activeSR.trend}
                        trendValue={metricsData.activeSR.trendValue}
                        trendLabel={metricsData.activeSR.trendLabel}
                        loading={isLoading}
                        color="#eb2f96"
                    />
                </Col>
            </Row>

            {/* Strike Rate Card */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <MetricCard
                        title="Strike Rate"
                        value={metricsData.strikeRate.value}
                        suffix={metricsData.strikeRate.suffix}
                        icon={<TrophyOutlined />}
                        trend={metricsData.strikeRate.trend}
                        loading={isLoading}
                        color="#722ed1"
                    />
                </Col>
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <ChartCard title="Sales Performance" loading={isLoading} height={300}>
                        <SalesPerformanceChart />
                    </ChartCard>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <ChartCard title="Delivery Performance" loading={isLoading} height={300}>
                        <DeliveryPerformanceChart />
                    </ChartCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                    <ChartCard title="B2B Order Performance" loading={isLoading} height={300}>
                        <B2BOrderPerformanceChart />
                    </ChartCard>
                </Col>
            </Row>

            {/* Data Tables Row */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <TableCard
                        title="Inventory Alerts"
                        columns={inventoryAlertsColumns}
                        dataSource={inventoryAlertsData}
                        loading={isLoading}
                        pagination={false}
                        size="small"
                        extra={<WarningOutlined className="text-orange-500" />}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <TableCard
                        title="Top Selling Products"
                        d
                        columns={topSellingColumns}
                        dataSource={topSellingData}
                        loading={isLoading}
                        pagination={false}
                        size="small"
                        extra={<GiftOutlined className="text-green-500" />}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <TableCard
                        title="Return Products"
                        columns={returnProductsColumns}
                        dataSource={returnProductsData}
                        loading={isLoading}
                        pagination={false}
                        size="small"
                        extra={<UndoOutlined className="text-red-500" />}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
