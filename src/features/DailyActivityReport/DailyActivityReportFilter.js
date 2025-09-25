import { Col, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '../../components/CommonButton';
import {
    setAssignedRoutes,
    setAttendance,
    setDate,
    setDayend,
    setDhCodeDailyActivity,
    setEmployeeCode,
    setLevel,
} from '../../redux/features/dailyActivityReport/dailyActivityReportFilter';
import labelChange from '../../util/labelChange';

function DailyActivityReportFilter({ queryFunc, loading }) {
    const { date, dhCode, employeeCode } = useSelector((state) => state.dailyActivityReportFilter);

    const dispatch = useDispatch();

    const onChange = (_, dateString) => {
        dispatch(setDate(dateString));
    };

    // user information
    const { user } = useSelector((state) => state.auth);
    const projectAccessData = user?.projectAccess?.map((x) => ({
        label: labelChange(x),
        value: x,
    }));
    return (
        <>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <DatePicker
                    value={date ? dayjs(date) : ''}
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Date"
                    onChange={onChange}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Attendance Marked"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setAttendance(e))}
                    options={[
                        {
                            value: 'Yes',
                            label: 'Yes',
                        },
                        {
                            value: 'N/A',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Route Assigned"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setAssignedRoutes(e))}
                    options={[
                        {
                            value: 'Yes',
                            label: 'Yes',
                        },
                        {
                            value: 'N/A',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Dayend Marked"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setDayend(e))}
                    options={[
                        {
                            value: 'Yes',
                            label: 'Yes',
                        },
                        {
                            value: 'N/A',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="EMP Level"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setLevel(e))}
                    options={projectAccessData || []}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={dhCode}
                    placeholder="DH Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setDhCodeDailyActivity(e.target.value))}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={employeeCode}
                    placeholder="Employee Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setEmployeeCode(e.target.value))}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <CommonButton
                    loading={loading}
                    queryFunc={() => queryFunc(1, 10, 'cleanShowResultOnPage')}
                />
            </Col>
        </>
    );
}

export default DailyActivityReportFilter;
