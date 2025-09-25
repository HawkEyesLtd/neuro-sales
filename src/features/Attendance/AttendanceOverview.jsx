import { Col, Row, Space } from 'antd';

function renameUser(name) {
    const userType = {
        MTCM: 'MTM',
        CC: 'BA',
        CM: 'Merchandiser',
    };
    // if (name === 'MS') {
    //     return 'MS';
    // }
    // if (name === 'MTCM') {
    //     return 'MTM';
    // }
    // if (name === 'CC') {
    //     return 'BA';
    // }
    return userType[name] ?? name;
}

function AttendanceCategory({
    userType,
    name,
    total,
    present,
    onLeave,
    error,
    lateError,
    faceError,
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Space direction="horizontal" key={userType}>
                <p className="attendance-info-txt">{renameUser(userType)}:</p>
                {name === 'MS' && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
                <p className="attendance-info-txt">{total}</p>
                <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                <p className="attendance-info-txt">Present: {present}</p>
                <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                <p className="attendance-info-txt">Absent: {total - (present + onLeave)}</p>
                <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                {userType === 'CM' || userType === 'MS' ? (
                    <>
                        <p className="attendance-info-txt">Leave: {onLeave}</p>
                        <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                    </>
                ) : null}

                <p className="attendance-info-txt">LOC. Err. {error}</p>
                <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                <p className="attendance-info-txt">Face Err. {faceError}</p>

                <div style={{ width: '1px', height: '10px', background: 'gray' }} />
                <p className="attendance-info-txt">Late ATT. {lateError}</p>
            </Space>
        </div>
    );
}

function AttendanceOverview({ data }) {
    // const data = [
    //     {
    //       userType: "MS",
    //       total: 127,
    //       present: 0,
    //       locationError: 0,
    //       lateError: 0,
    //       faceError: 0,
    //       onLeave: 0,
    //       absent: 127
    //     },
    //     {
    //       userType: "CM",
    //       total: 1259,
    //       present: 0,
    //       locationError: 0,
    //       lateError: 0,
    //       faceError: 0,
    //       onLeave: 0,
    //       absent: 1259
    //     }
    //   ]
    const renderAttendanceCategory = (userTypes) =>
        userTypes.map((y) => <AttendanceCategory key={y.userType} {...y} />);

    const cmWmaData = data?.filter((x) => x.userType === 'CM' || x.userType === 'WMA');
    const msMtcmData = data?.filter((x) => x.userType === 'MS' || x.userType === 'MTCM');
    const baData = data?.filter((x) => x.userType === 'CC');

    return (
        <Row justify="space-between" style={{ gap: '6px' }}>
            <Col style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Space direction="vertical">{renderAttendanceCategory(cmWmaData)}</Space>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Space direction="vertical">{renderAttendanceCategory(msMtcmData)}</Space>
            </Col>
            <Col>
                <Space style={{ marginTop: '10px' }} direction="vertical">
                    {renderAttendanceCategory(baData)}
                </Space>
            </Col>
        </Row>
    );
}

export default AttendanceOverview;
