import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

import IdleModal from '@/components/ui/IddleSessionTimeoutModal';

import FooterComponent from './FooterComponent';
// import HeaderComponent from './HeaderComponent';
import Sidebar from './Sidebar';
import SidebarErrorBoundary from './SidebarErrorBoundary';

const { Content } = Layout;

function LayoutComponent({ children }) {
    // globalLoading state
    const { globalLoading } = useSelector((state) => state.globalLoading || {});

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (globalLoading) {
            const interval = setInterval(() => {
                setValue((prevValue) => (prevValue < 100 ? prevValue + 10 : 0));
            }, 100); // Increment every second

            return () => clearInterval(interval);
        }
        if (!globalLoading) {
            const interval = setInterval(() => {
                setValue((prevValue) => (prevValue < 100 ? prevValue + 10 : prevValue));
            }, 5); // Increment every second

            return () => clearInterval(interval);
        }
    }, [globalLoading]);

    const pathName = window.location.pathname;

    return (
        <Layout
            style={{
                minHeight: '100vh',
                backgroundColor: 'black',
            }}
            className={`${globalLoading && pathName === '/download-report' ? 'global-loading' : ''}`}
        >
            {/* sidebar and menu */}
            <SidebarErrorBoundary>
                <Sidebar />
            </SidebarErrorBoundary>
            <LoadingBar height={3} progress={value} color="#f11946" />

            <Layout className="site-layout">
                {/* header component */}
                {/* <HeaderComponent /> */}

                <Content
                    style={{
                        margin: '0 16px',
                        marginTop: '16px',
                    }}
                >
                    <IdleModal timeout={1200} autoCloseTime={300} />
                    {children}
                </Content>

                {/* footer */}
                <FooterComponent />
            </Layout>
        </Layout>
    );
}
export default LayoutComponent;
