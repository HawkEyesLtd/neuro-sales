import { memo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingComponent = memo(({ message = 'Loading...' }) => (
    <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <Spin
                size="large"
                spinning
                indicator={<LoadingOutlined style={{ fontSize: 60, color: '#1890ff' }} spin />}
                fullscreen
                tip={message}
            />
        </div>
    </div>
));

LoadingComponent.displayName = 'LoadingComponent';

export default LoadingComponent;
