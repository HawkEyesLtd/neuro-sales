import {
    CalendarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

function AttendanceSummaryCards({ data }) {
    // Calculate totals from all user types
    const calculateTotals = () => {
        if (!Array.isArray(data) || data.length === 0) {
            return {
                totalEmployees: 0,
                totalPresent: 0,
                totalAbsent: 0,
                totalLeave: 0,
                totalSR: 0,
                totalDSR: 0,
            };
        }

        const totals = data.reduce(
            (acc, item) => {
                acc.totalEmployees += item.total || 0;
                acc.totalPresent += item.present || 0;
                acc.totalLeave += item.onLeave || 0;
                acc.totalAbsent += (item.total || 0) - ((item.present || 0) + (item.onLeave || 0));

                // Calculate SR and DSR based on user types
                if (item.userType === 'MS' || item.userType === 'CM') {
                    acc.totalSR += item.total || 0;
                } else if (item.userType === 'CC' || item.userType === 'MTCM') {
                    acc.totalDSR += item.total || 0;
                }

                return acc;
            },
            {
                totalEmployees: 0,
                totalPresent: 0,
                totalAbsent: 0,
                totalLeave: 0,
                totalSR: 0,
                totalDSR: 0,
            }
        );

        return totals;
    };

    const { totalEmployees, totalPresent, totalAbsent, totalLeave, totalSR, totalDSR } =
        calculateTotals();

    // Calculate percentages
    const presentPercentage =
        totalEmployees > 0 ? Math.round((totalPresent / totalEmployees) * 100) : 0;
    const absentPercentage =
        totalEmployees > 0 ? Math.round((totalAbsent / totalEmployees) * 100) : 0;
    const leavePercentage =
        totalEmployees > 0 ? Math.round((totalLeave / totalEmployees) * 100) : 0;

    const cardStyle = {
        borderRadius: '8px',
        // boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e8e8e8',
        backgroundColor: '#fff',
        padding: '15px',
    };

    const titleStyle = {
        fontSize: '14px',
        color: '#8c8c8c',
        marginBottom: '4px',
        fontWeight: 'normal',
    };

    const valueStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#262626',
        marginBottom: '4px',
        lineHeight: '1',
    };

    const percentageStyle = {
        fontSize: '14px',
        fontWeight: '500',
    };

    const iconStyle = {
        fontSize: '24px',
        color: '#d9d9d9',
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    };

    const subInfoStyle = {
        display: 'flex',
        gap: '16px',
        fontSize: '12px',
        color: '#1890ff',
    };

    return (
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} md={6} lg={6}>
                <Card hoverable style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <div style={containerStyle}>
                        <div>
                            <div style={titleStyle}>Total Employee</div>
                            <div style={valueStyle}>{totalEmployees}</div>
                            <div style={subInfoStyle}>
                                <span>Total SR: {totalSR}</span>
                                <span>Total DSR: {totalDSR}</span>
                            </div>
                        </div>
                        <div style={iconStyle}>
                            <UserOutlined />
                        </div>
                    </div>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6}>
                <Card hoverable style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <div style={containerStyle}>
                        <div>
                            <div style={titleStyle}>Total Present</div>
                            <div style={valueStyle}>{totalPresent}</div>
                            <div style={{ ...percentageStyle, color: '#52c41a' }}>
                                {presentPercentage}%
                            </div>
                        </div>
                        <div style={iconStyle}>
                            <CheckCircleOutlined />
                        </div>
                    </div>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6}>
                <Card hoverable style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <div style={containerStyle}>
                        <div>
                            <div style={titleStyle}>Total Absent</div>
                            <div style={valueStyle}>{totalAbsent}</div>
                            <div style={{ ...percentageStyle, color: '#ff4d4f' }}>
                                {absentPercentage}%
                            </div>
                        </div>
                        <div style={iconStyle}>
                            <CloseCircleOutlined />
                        </div>
                    </div>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6}>
                <Card hoverable style={cardStyle} bodyStyle={{ padding: 0 }}>
                    <div style={containerStyle}>
                        <div>
                            <div style={titleStyle}>Total Leave</div>
                            <div style={valueStyle}>{totalLeave}</div>
                            <div style={{ ...percentageStyle, color: '#faad14' }}>
                                {leavePercentage}%
                            </div>
                        </div>
                        <div style={iconStyle}>
                            <CalendarOutlined />
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}

export default AttendanceSummaryCards;
