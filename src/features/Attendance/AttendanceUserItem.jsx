import { Col, Image } from 'antd';

function AttendanceUserItem({ item }) {
    const {
        name,
        punchInAtBDTime,
        attendanceImageOriginal,
        attendanceImageThumb,
        isAttendanceValid,
    } = item;
    return (
        <Col lg={6}>
            <div
                style={{
                    textAlign: 'center',
                    background: `${isAttendanceValid ? 'red' : 'red'}`,
                    borderRadius: '5px',
                    padding: '5px',
                }}
            >
                <Image
                    width={80}
                    height={80}
                    style={{ borderRadius: '50%' }}
                    src={attendanceImageOriginal || ''}
                />
                <h5 style={{ color: '#000', margin: '10px 0 0 0', textAlign: 'center' }}>{name}</h5>
                <p style={{ color: '#000', margin: 0, textAlign: 'center' }}>{punchInAtBDTime}</p>
            </div>
        </Col>
    );
}

export default AttendanceUserItem;
