import ProgressCircle from '../../components/ProgressCircle';
import RoundChartSkeleton from '../../components/ui/RoundChartSkeleton';

function StrikeRateByRegion({ data, loading }) {
    return (
        <div className="box-container">
            <div className="box-heading">Strike Rate</div>
            <div className="box-body" style={{ flexWrap: 'wrap', gap: '5px' }}>
                {loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0 10px',
                        }}
                    >
                        {new Array(3).fill('').map((_, i) => (
                            <RoundChartSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* data render */}

                        {data?.data?.length
                            ? data?.data?.map(
                                  (
                                      {
                                          percentage,
                                          circle: { name } = {},
                                          region: { name: rName } = {},
                                          area: { name: aName } = {},
                                          territory: { name: tName } = {},
                                          dh: { name: dName } = {},
                                      },
                                      i
                                  ) => (
                                      <ProgressCircle
                                          size={80}
                                          key={i}
                                          label={name || rName || aName || tName || dName}
                                          data={Math.round(percentage)}
                                          margin={i === data.data.length - 1 ? 0 : 15}
                                          colors={{ '0%': '#4477F9', '100%': '#25D4ED' }}
                                      />
                                  )
                              )
                            : null}

                        {data?.data?.length <= 0 ? (
                            <>
                                <ProgressCircle
                                    label="..."
                                    data={0}
                                    margin={15}
                                    colors={{ '0%': '#4477F9', '100%': '#25D4ED' }}
                                />
                                <ProgressCircle
                                    label="..."
                                    data={0}
                                    margin={15}
                                    colors={{ '0%': '#8464EE', '100%': '#697BFD' }}
                                />
                                <ProgressCircle
                                    label="..."
                                    data={0}
                                    colors={{ '0%': '#4477F9', '100%': '#25D4ED' }}
                                />
                            </>
                        ) : null}
                    </>
                )}
            </div>
            {/* <div className="box-footer-container">
                <p className="box-footer-content">Total {data?.totalExecutions} Execution Done</p>
            </div> */}
        </div>
    );
}

export default StrikeRateByRegion;
