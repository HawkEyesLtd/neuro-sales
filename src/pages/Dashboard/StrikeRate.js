import ProgressCircle from '../../components/ProgressCircle';
import RoundChartSkeleton from '../../components/ui/RoundChartSkeleton';

function StrikeRate({ data, loading }) {
    return (
        <div className="box-container">
            <div className="box-heading">National Strike Rate</div>
            <div className="box-body">
                {loading ? (
                    <RoundChartSkeleton />
                ) : (
                    <ProgressCircle
                        size={80}
                        data={Math.round(data?.percentage || 0)}
                        colors={{ '0%': '#D33FC7', '100%': '#F92779' }}
                    />
                )}
            </div>
            {!loading && (
                <div className="box-footer-container">
                    <p className="box-footer-content">
                        Total {data?.totalExecutions || 0} Execution Done
                    </p>
                </div>
            )}
        </div>
    );
}

export default StrikeRate;
