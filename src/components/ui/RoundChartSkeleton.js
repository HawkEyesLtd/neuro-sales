import { Skeleton } from 'antd';

function RoundChartSkeleton() {
    return (
        <div>
            <Skeleton.Avatar active size={80} />
            <div className="dot-loader">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
            </div>
        </div>
    );
}

export default RoundChartSkeleton;
