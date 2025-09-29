import { Col, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonButton from '@/components/CommonButton';
import DataManagementFilter from '@/components/DataManagementFilter';
import {
    setDate,
    setEmployeeCode,
    setEmployeeId,
    setLeveL,
} from '@/redux/features/attendance/attendanceFilterSlice';
import { useSearchEmployeeMutation } from '@/redux/features/teamManagement/teamManagementApi';
import {
    selectAttendanceFilterData,
    selectDataManagementFilters,
    selectUserProjectAccess,
} from '@/redux/selectors/attendanceSelectors';
import getDataManagementFilterData from '@/utils/generateDataManagementFilterData';

function AttendanceFilter({ queryFunc, loading, _downloadButton, isDownloading }) {
    // Use memoized selectors to prevent unnecessary rerenders
    const { date, employeeCode, level } = useSelector(selectAttendanceFilterData);
    const { region, area, territory, town } = useSelector(selectDataManagementFilters);
    const projectAccessData = useSelector(selectUserProjectAccess);
    const { accessToken } = useSelector((state) => state.auth || {});

    const dispatch = useDispatch();

    // date picker function
    const onChange = (_, dateString) => {
        dispatch(setDate(dateString));
    };

    // search employee api hook
    const [searchEmployee, { data: employeeData, isLoading }] = useSearchEmployeeMutation();

    const getFilterData = (lev) => {
        const bodyData = {
            type: [projectAccessData?.[0]?.value || 'CM'],
        };
        if (lev && lev.length > 0) {
            bodyData.type = lev;
        }
        return bodyData;
    };

    useEffect(() => {
        if (accessToken && projectAccessData && projectAccessData.length > 0) {
            searchEmployee({
                ...getDataManagementFilterData({ region, area, territory, town }),
                ...getFilterData(level),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchEmployee, region, area, territory, town, level, projectAccessData, accessToken]);

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    return (
        <>
            {/* Data Management Filters */}
            <DataManagementFilter />

            {/* Attendance Specific Filters */}
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <DatePicker
                    defaultValue={dayjs()}
                    value={date ? dayjs(date) : dayjs()}
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Date"
                    onChange={onChange}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    mode="multiple"
                    value={level}
                    placeholder="EMP Level"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    options={projectAccessData || []}
                    onChange={(e) => dispatch(setLeveL(e))}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    showSearch
                    loading={isLoading}
                    allowClear
                    placeholder="FF Name"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setEmployeeId(e))}
                    options={employeeData?.data?.map((emp) => ({
                        label: emp.name,
                        value: emp._id,
                    }))}
                    filterOption={(input, option) =>
                        option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    searchValue={search}
                    onSearch={onSearch}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={employeeCode}
                    placeholder="FF Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setEmployeeCode(e.target.value))}
                />
            </Col>
            {/* <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Location Match"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setLocationMatch(e))}
                    options={[
                        {
                            value: 'yes',
                            label: 'Yes',
                        },
                        {
                            value: 'no',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Late Attendance"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setLateAttendance(e))}
                    options={[
                        {
                            value: 'yes',
                            label: 'Yes',
                        },
                        {
                            value: 'no',
                            label: 'No',
                        },
                    ]}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="Facial Error"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setFacialError(e))}
                    options={[
                        {
                            value: 'yes',
                            label: 'Yes',
                        },
                        {
                            value: 'no',
                            label: 'No',
                        },
                    ]}
                />
            </Col> */}
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <CommonButton loading={loading} disabled={isDownloading} queryFunc={queryFunc} />
            </Col>

            {/* <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    loading={isDownloading}
                    disabled={loading}
                    size="large"
                    className="filter-btn"
                    icon={<DownloadOutlined />}
                    danger
                    type="primary"
                    onClick={() => {
                        downloadButton();
                    }}
                >
                    Download
                </Button>
            </Col>  */}
        </>
    );
}

export default AttendanceFilter;
