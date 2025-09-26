import { DownloadOutlined } from '@ant-design/icons';
import CommonButton from '@components/CommonButton';
import {
    setDate,
    setEmployeeCode,
    setEmployeeId,
} from '@redux/features/attendance/attendanceFilterSlice';
import { useSearchEmployeeMutation } from '@redux/features/teamManagement/teamManagementApi';
import labelChange from '@utils/labelChange';
import { Button, Col, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getDataManagementFilterData from '@/utils/generateDataManagementFilterData';

function AttendanceFilter({ queryFunc, loading, downloadButton, isDownloading }) {
    const { date, employeeCode, townCode, level } = useSelector(
        (state) => state.attendanceFilter ?? {}
    );

    const dispatch = useDispatch();

    // date picker function
    const onChange = (_, dateString) => {
        dispatch(setDate(dateString));
    };

    // user information log
    const { user } = useSelector((state) => state.auth || {});
    const projectAccessData = user?.projectAccess
        ?.map((x) => ({ label: labelChange(x), value: x }))
        ?.filter((x) => x.value !== 'DFF');

    // filter data
    const { circle, region, area, territory, town } = useSelector(
        (state) => state.dataManagement ?? {}
    );

    // search employee api hook
    const [searchEmployee, { data: employeeData, isLoading }] = useSearchEmployeeMutation();

    const getFilterData = (lev) => {
        const bodyData = {
            type: [projectAccessData[0].value],
        };
        if (lev) {
            bodyData.type = lev;
        }
        return bodyData;
    };

    useEffect(() => {
        searchEmployee({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getFilterData(level),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchEmployee, circle, region, area, territory, town, level]);

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    return (
        <>
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
                <Input
                    value={employeeCode}
                    placeholder="FF Level"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setEmployeeCode(e.target.value))}
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
                    placeholder="Search By User code or Name"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setEmployeeCode(e.target.value))}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <CommonButton loading={loading} disabled={isDownloading} queryFunc={queryFunc} />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
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
            </Col>
        </>
    );
}

export default AttendanceFilter;
