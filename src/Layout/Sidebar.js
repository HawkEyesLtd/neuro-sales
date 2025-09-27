import { Layout, Menu, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import appLogo from '@/assets/logo/logo-portal.svg';
import mlLogo from '@/assets/logo/ml-logo.svg';
import items from '@/data/menuData';
import { useWhoAmIQuery } from '@/redux/features/auth/authApi';

const { Sider } = Layout;

function Sidebar() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Safe auth state access with proper error handling
    const auth = useSelector((state) => {
        try {
            return state?.auth || null;
        } catch (error) {
            console.error('Error accessing auth state:', error);
            return null;
        }
    });
    const { accessToken } = auth || {};

    // Fetch user permissions - only if authenticated
    const { data: _userData, isLoading } = useWhoAmIQuery(
        {},
        {
            skip: !accessToken,
        }
    );

    // Responsive collapse
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setCollapsed(windowWidth <= 1024);
    }, [windowWidth]);

    // Always show all menu items without permission checks
    const finalPermittedRoutes = useMemo(() => {
        try {
            // Ensure items is an array and handle undefined case
            if (!Array.isArray(items) || items.length === 0) {
                console.error('Menu items is not an array or is empty:', items);
                return [];
            }

            const filteredItems = items
                .filter((item) => item && typeof item === 'object') // Filter out invalid items
                .sort((a, b) => (a.serial || 0) - (b.serial || 0)); // Safe serial comparison

            return filteredItems;
        } catch (error) {
            console.error('Error processing menu items:', error);
            return [];
        }
    }, []);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            style={{ minHeight: '100vh' }}
        >
            <div>
                <Link to="/">
                    <img
                        className="bg-white rounded-md p-2 m-2"
                        src={collapsed ? mlLogo : appLogo}
                        alt="Logo"
                    />
                </Link>
            </div>
            {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <div
                        style={{
                            padding: '6px 10px',
                        }}
                        key={index}
                    >
                        <Skeleton.Input active block />
                    </div>
                ))
            ) : (
                <Menu
                    theme="dark"
                    style={{ paddingBottom: '50px' }}
                    onClick={({ key }) => {
                        if (key && typeof key === 'string') {
                            navigate(key);
                        }
                        // dispatch(resetSalaryDisbursementFilter());
                    }}
                    selectedKeys={[window.location.pathname]}
                    defaultSelectedKeys={[window.location.pathname]}
                    mode="inline"
                    items={finalPermittedRoutes}
                />
            )}
        </Sider>
    );
}

export default Sidebar;
