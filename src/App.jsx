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
import Login from './pages/auth/Login';
import PrivateRoute from './pages/auth/PrivateRoute';

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <LoadingComponent message="Checking Authentication..." />
    ) : (
        <ErrorBoundary>
            <PerformanceMonitor>
                <A11yAudit>
                    {/* Background-preload top routes once authenticated */}

                    <Suspense fallback={<LoadingComponent />}>
                        <Routes>
                            {routeData.map(({ path, element }, i) => (
                                <Route
                                    key={i}
                                    path={path}
                                    element={
                                        <PrivateRoute>
                                            <LayoutComponent>{element}</LayoutComponent>
                                        </PrivateRoute>
                                    }
                                />
                            ))}

                            <Route path="/un-authorized" element={<UnAuthorized />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </A11yAudit>
            </PerformanceMonitor>
        </ErrorBoundary>
    );
}
export default App;
