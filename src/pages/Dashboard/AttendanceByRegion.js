import ProgressCircle from '../../components/ProgressCircle';
import RoundChartSkeleton from '../../components/ui/RoundChartSkeleton';

function AttendanceByRegion({ data, loading }) {
    function numberFormat(value, padding) {
        const zeroes = new Array(padding + 1).join('0');
        return (zeroes + value).slice(-padding);
    }
    return (
        <div className="box-container">
            <div className="box-heading">Attendance</div>
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
                                          key={i}
                                          label={name || rName || aName || tName || dName}
                                          data={Math.round(percentage)}
                                          margin={i === data.data?.length - 1 ? 0 : 15}
                                          colors={{ '0%': '#8464EE', '100%': '#697BFD' }}
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
                                    colors={{ '0%': '#8464EE', '100%': '#697BFD' }}
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
            {!loading && (
                <div className="box-footer-container">
                    <p className="box-footer-content">
                        <span>Total TMR: </span> {numberFormat(data?.totalTmr, 3)}{' '}
                        <span>Present: </span>
                        {numberFormat(data?.tmrPresent, 3)} <span>Absent: </span>{' '}
                        {numberFormat(data?.tmrAbsent, 3)} <span>Leave: </span>{' '}
                        {numberFormat(data?.tmrOnLeave, 3)}
                    </p>
                    <p className="box-footer-content">
                        <span>Total TMS: </span> {numberFormat(data?.totalTms, 3)}{' '}
                        <span>Present: </span>
                        {numberFormat(data?.tmsPresent, 3)} <span>Absent: </span>{' '}
                        {numberFormat(data?.tmsAbsent, 3)} <span>Leave: </span>{' '}
                        {numberFormat(data?.tmsOnLeave, 3)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default AttendanceByRegion;
