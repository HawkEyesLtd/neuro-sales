import { EnvironmentOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Row, Segmented, Tabs, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import AttendanceItemSkeleton from '../../components/ui/AttendanceItemSkeleton';
import NoResult from '../../components/ui/NoResult';
import labelChange from '../../util/labelChange';

function AttendanceList({ type, isLoading, data, setInfoWindowState }) {
    return (
        <div className="component-box-container">
            <div style={{ padding: '10px', width: '100%' }}>
                {isLoading ? (
                    <AttendanceItemSkeleton />
                ) : (
                    <>
                        {data?.length ? (
                            <Row gutter={[5, 10]}>
                                <Image.PreviewGroup
                                    preview={{
                                        countRender: (current) =>
                                            `${data[current - 1]?.user?.name} - ${data[current - 1]?.user?.usercode} ( ${
                                                data[current - 1]?.lat
                                            }, ${data[current - 1]?.lon} )`,
                                    }}
                                >
                                    {data?.map(
                                        (
                                            {
                                                _id = null,
                                                lat,
                                                lon,
                                                name = null,
                                                kind = null,
                                                user = {},
                                                image = null,
                                                usercode = null,
                                                punchInAt = null,
                                                withinRadius = null,
                                                late = null,
                                                isFaceMatched = null,
                                            },
                                            i
                                        ) => {
                                            const hasError =
                                                !isFaceMatched || !withinRadius || late;
                                            const errorReasons = [];
                                            if (!isFaceMatched) errorReasons.push('Facial Error');
                                            if (!withinRadius) errorReasons.push('Geo Tag Error');
                                            if (late) errorReasons.push('Late Attendance');
                                            const showErrors =
                                                errorReasons.length > 0
                                                    ? errorReasons.join(', ')
                                                    : '';

                                            return (
                                                <Col key={user?._id || _id} lg={6}>
                                                    <div
                                                        style={{
                                                            textAlign: 'center',
                                                            background: `${
                                                                hasError ? '#FF5150' : '#fff'
                                                            }`,
                                                            borderRadius: '5px',
                                                            padding: '5px',
                                                        }}
                                                    >
                                                        {type === 'present' ? (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                {hasError ? (
                                                                    <Tooltip
                                                                        title={showErrors}
                                                                        style={{
                                                                            display: hasError
                                                                                ? 'block'
                                                                                : 'none',
                                                                        }}
                                                                    >
                                                                        <InfoCircleOutlined
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                color: hasError
                                                                                    ? 'white'
                                                                                    : 'black',
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                ) : (
                                                                    <div />
                                                                )}

                                                                <EnvironmentOutlined
                                                                    onClick={() => {
                                                                        setInfoWindowState({
                                                                            lat,
                                                                            lng: lon,
                                                                            name: user?.name,
                                                                            time: punchInAt,
                                                                            imageURL:
                                                                                image?.original ||
                                                                                '',
                                                                            kind: user?.kind,
                                                                            usercode:
                                                                                user?.usercode,
                                                                            visible: true,
                                                                        });
                                                                    }}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: hasError
                                                                            ? 'white'
                                                                            : 'black',
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        padding: 0,
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : null}
                                                        {type === 'absent' ? (
                                                            <Avatar
                                                                size={80}
                                                                icon={<UserOutlined />}
                                                                style={{
                                                                    marginTop: '10px',
                                                                }}
                                                            />
                                                        ) : (
                                                            <Image
                                                                width={80}
                                                                height={80}
                                                                style={{
                                                                    borderRadius: '50%',
                                                                }}
                                                                preview={{
                                                                    src: image?.original || '',
                                                                }}
                                                                src={image?.thumb || ''}
                                                            />
                                                        )}

                                                        <h5
                                                            style={{
                                                                color: `${!withinRadius ? '#fff' : '#000'}`,
                                                                margin: '10px 0 0 0',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {user?.name || name}
                                                        </h5>
                                                        <h5
                                                            style={{
                                                                color: `${!withinRadius ? '#fff' : '#000'}`,
                                                                margin: '0',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {labelChange(
                                                                user?.usercode || usercode
                                                            )}
                                                        </h5>
                                                        <h5
                                                            style={{
                                                                color: `${!withinRadius ? '#fff' : '#000'}`,
                                                                margin: '0',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {labelChange(user?.kind || kind)}
                                                        </h5>
                                                        <p
                                                            style={{
                                                                color: `${!withinRadius ? '#fff' : '#000'}`,
                                                                margin: 0,
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {punchInAt
                                                                ? dayjs(punchInAt).format(
                                                                      'hh:mm:ss A'
                                                                  )
                                                                : null}
                                                        </p>
                                                    </div>
                                                </Col>
                                            );
                                        }
                                    )}
                                </Image.PreviewGroup>
                            </Row>
                        ) : (
                            <NoResult />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function AttendanceTracker({ data, isLoading, setInfoWindowState }) {
    const [state, setState] = useState({
        alignValue: 'Present',
        activeTab: '1',
    });

    const items = [
        {
            key: '1',
            label: '1',
            children: (
                <AttendanceList
                    type="present"
                    isLoading={isLoading}
                    data={data?.presentList || []}
                    setInfoWindowState={setInfoWindowState}
                />
            ), // Present list
        },
        {
            key: '2',
            label: '2',
            children: (
                <AttendanceList type="absent" isLoading={isLoading} data={data?.absentList || []} />
            ), // Absent list
        },
    ];

    const handleSegmentChange = (value) => {
        const key = value === 'Present' ? '1' : '2';
        setState((prevState) => ({
            ...prevState,
            alignValue: value,
            activeTab: key,
        }));
    };

    return (
        <div className="component-box-container">
            <div className="box-heading" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                Attendance Tracker
            </div>
            <div>
                <div>
                    <Segmented
                        value={state.alignValue}
                        onChange={handleSegmentChange}
                        options={['Present', 'Absent']}
                        block
                        style={{ border: '2px solid #005ded' }}
                    />
                    <Tabs
                        className="attendance__tabs"
                        activeKey={state.activeTab}
                        onChange={(key) =>
                            setState((prevState) => ({
                                ...prevState,
                                activeTab: key,
                                alignValue: key === '1' ? 'Present' : 'Absent',
                            }))
                        }
                        items={items}
                    />
                </div>
            </div>
        </div>
    );
}

export default AttendanceTracker;
