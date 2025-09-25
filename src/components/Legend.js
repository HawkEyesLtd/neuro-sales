import { Col, Row } from 'antd';

function Legend({ data }) {
    const { color, name, total, present, absent, leave } = data;

    // format value
    function formatValue(val) {
        let stringValue = String(val);

        while (stringValue.length < 4) {
            stringValue = `0${stringValue}`;
        }

        return stringValue;
    }
    return (
        <div style={{ margin: '0 auto', width: '100%' }}>
            <Row style={{ padding: '2px 5px' }} gutter={[5, 5]}>
                <Col lg={8} md={12} className="legend-right-section">
                    <div
                        className="legend-icon"
                        style={{
                            background: color,
                        }}
                    />
                    <p className="legend-text">
                        Total {name} {formatValue(total)}
                    </p>
                </Col>
                <Col lg={6} md={12}>
                    <p className="legend-text">Present {formatValue(present)}</p>
                </Col>
                <Col lg={5} md={12}>
                    <p className="legend-text">Absent {formatValue(absent)}</p>
                </Col>
                <Col lg={5} md={12}>
                    <p className="legend-text">Leave {formatValue(leave)}</p>
                </Col>
            </Row>
        </div>
    );
}

export default Legend;
