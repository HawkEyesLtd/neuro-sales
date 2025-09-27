import { Alert } from 'antd';
import React from 'react';

class SidebarErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console?.error('Sidebar Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px' }}>
                    <Alert
                        message="Sidebar Error"
                        description={`Something went wrong with the sidebar: ${this.state.error?.message || 'Unknown error'}`}
                        type="error"
                        showIcon
                        action={
                            <button
                                type="button"
                                onClick={() => this.setState({ hasError: false, error: null })}
                                style={{
                                    background: 'none',
                                    border: '1px solid #ff4d4f',
                                    color: '#ff4d4f',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                }}
                            >
                                Retry
                            </button>
                        }
                    />
                </div>
            );
        }

        return this.props.children;
    }
}

export default SidebarErrorBoundary;
