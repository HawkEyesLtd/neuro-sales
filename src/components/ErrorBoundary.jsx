import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console and any error reporting service
        console?.error('Error Boundary Caught Error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // In production, send error to logging service
        if (process.env.NODE_ENV === 'production') {
            // Example: Send to error tracking service
            // analytics.track('Error Boundary Triggered', {
            //     error: error.message,
            //     stack: error.stack,
            //     componentStack: errorInfo.componentStack
            // });
        }
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            const { fallback } = this.props;

            // Custom fallback component if provided
            if (fallback) {
                return fallback(this.state.error, this.state.errorInfo, this.handleReload);
            }

            // Default error UI
            return (
                <div>
                    <Result
                        status="error"
                        title={this.state.error?.message || 'An unexpected error occurred'}
                        subTitle="We're sorry, but something unexpected happened. Please try reloading the page."
                        extra={[
                            <Button
                                type="primary"
                                icon={<ReloadOutlined />}
                                onClick={this.handleReload}
                                key="reload"
                            >
                                Reload Page
                            </Button>,
                            <Button icon={<HomeOutlined />} onClick={this.handleGoHome} key="home">
                                Go Home
                            </Button>,
                        ]}
                        className="flex flex-col items-center justify-center h-screen"
                    >
                        {process.env.NODE_ENV === 'development' && (
                            <div className=" mt-4 p-4 bg-red-50 border border-red-200 rounded">
                                <details className="text-sm">
                                    <summary className="font-medium text-red-800 cursor-pointer">
                                        Error Details (Development Only)
                                    </summary>
                                    <div className="mt-2 space-y-2">
                                        <div>
                                            <strong>Error:</strong> {this.state.error?.message}
                                        </div>
                                        <div>
                                            <strong>Stack:</strong>
                                            <pre className="text-xs mt-1 overflow-auto">
                                                {this.state.error?.stack}
                                            </pre>
                                        </div>
                                        {this.state.errorInfo && (
                                            <div>
                                                <strong>Component Stack:</strong>
                                                <pre className="text-xs mt-1 overflow-auto">
                                                    {this.state.errorInfo.componentStack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </details>
                            </div>
                        )}
                    </Result>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
