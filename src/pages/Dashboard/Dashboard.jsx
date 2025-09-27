import { Col, message, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HelmetHeader from '@/components/HelmetHeader';
import { useGetDashboardDataMutation } from '@/redux/features/dashboard/dashboardApi';
import { setReFetchFilter } from '@/redux/features/loaderSlice';

import B2BOrderPerformanceChart from './Chart/B2BOrderPerformanceChart';
import DeliveryPerformanceChart from './Chart/DeliveryPerformanceChart';
import InventoryAlertsChart from './Chart/InventoryAlertsChart';
import LeaderboardCard from './Chart/LeaderboardCard';
import OrderTrendsByGeoCard from './Chart/OrderTrendsByGeoCard';
import ReturnProductsList from './Chart/ReturnProductsList';
import SalesPerformanceChart from './Chart/SalesPerformanceChart';
import TopPromotionsCard from './Chart/TopPromotionsCard';
import TopSellingProductsTable from './Chart/TopSellingProductsTable';
import { TopKPIRow } from './Chart/topKPICards';
import DashboardFilter from './DashboardFilter';

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

            <Row gutter={[16, 16]} className="mb-6">
                <DashboardFilter fetchDashboardData={fetchDashboardData} />
            </Row>

            {/* <div className="sticky top-0 z-50 bg-gray-50 py-4 mb-6">
                <Filter loading={isLoading} queryFunc={fetchDashboardData} pathname="/" />
            </div> */}

            {/* Key Metrics Row */}
            <div className="mb-6">
                <TopKPIRow />
            </div>

            {/* Charts Row */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <SalesPerformanceChart />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <DeliveryPerformanceChart />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <B2BOrderPerformanceChart />
                </Col>
            </Row>

            {/* Data Tables Row */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <InventoryAlertsChart />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <TopSellingProductsTable />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <ReturnProductsList />
                </Col>
            </Row>

            {/* bottom chart */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <LeaderboardCard />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <OrderTrendsByGeoCard />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <TopPromotionsCard />
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
