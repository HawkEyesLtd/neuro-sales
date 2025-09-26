import { Layout, Menu, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import appLogo from '@/assets/logo/logo-portal.svg';
import mlLogo from '@/assets/logo/ml-logo.svg';
import items from '@/data/menuData';

import { useWhoAmIQuery } from '../redux/features/auth/authApi';
import { resetSalaryDisbursementFilter } from '../redux/features/SharedSalaryModule/salaryEvaluationFilterSlice';

const { Sider } = Layout;

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { accessToken } = useSelector((state) => state.auth);
    const [skip, setSkip] = useState(true);

    // Fetch user permissions
    const { data, isLoading } = useWhoAmIQuery({}, { skip });

    // Responsive collapse
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setCollapsed(windowWidth <= 1024);
    }, [windowWidth]);

    useEffect(() => {
        setSkip(false);
    }, [accessToken]);

    // Always show all menu items without permission checks
    const finalPermittedRoutes = useMemo(() => {
        if (!items) return [];
        return items.sort((a, b) => a.serial - b.serial);
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
            {isLoading || !data ? (
                Array.from({ length: 20 }).map((_, index) => (
                    <div
                        style={{
                            padding: '6px 10px',
                        }}
                        key={index}
                    >
                        <Skeleton.Input active block key={index} />
                    </div>
                ))
            ) : (
                <Menu
                    theme="dark"
                    style={{ paddingBottom: '50px' }}
                    onClick={({ key }) => {
                        navigate(key);
                        dispatch(resetSalaryDisbursementFilter());
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
