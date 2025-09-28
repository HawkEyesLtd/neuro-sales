import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import A11yAudit from './components/A11yAudit';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingComponent from './components/LoadingComponent';
import PerformanceMonitor from './components/PerformanceMonitor';
import NotFound from './components/ui/NotFound';
import UnAuthorized from './components/ui/UnAuthorized';
import routeData from './data/routeData';
import useAuthCheck from './hooks/useAuthCheck';
import LayoutComponent from './Layout/Layout';
import LoginPage from './pages/Auth/Login';
import './utils/globalErrorHandler'; // Initialize global error handling

function App() {
    const authChecked = useAuthCheck();

    // Extra safety check for critical data
    if (!authChecked) {
        return <LoadingComponent message="Checking Authentication..." />;
    }

    // Ensure routeData is valid before rendering
    if (!Array.isArray(routeData)) {
        console.error('RouteData is not an array:', routeData);
        return <LoadingComponent message="Loading application..." />;
    }

    return (
        <ErrorBoundary>
            <PerformanceMonitor>
                <A11yAudit>
                    {/* Background-preload top routes once authenticated */}

                    <Suspense fallback={<LoadingComponent />}>
                        <Routes>
                            {Array.isArray(routeData) && routeData.length > 0 ? (
                                routeData.map(({ path, element }, i) => (
                                    <Route
                                        key={i}
                                        path={path}
                                        element={
                                            // <PrivateRoute>
                                            <LayoutComponent>{element}</LayoutComponent>
                                            // </PrivateRoute>
                                        }
                                    />
                                ))
                            ) : (
                                <Route
                                    path="*"
                                    element={<LoadingComponent message="Loading routes..." />}
                                />
                            )}

                            <Route path="/un-authorized" element={<UnAuthorized />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </A11yAudit>
            </PerformanceMonitor>
        </ErrorBoundary>
    );
}
export default App;
