import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DateRange from '../../components/DateRange';
import { useGetPosmListQuery } from '../../redux/features/inventory/inventoryApiSlice';
import {
    setDateRange,
    setFFCode,
    setFFId,
    setFFLevel,
    setPosmCode,
    setPosmName,
    setPosmOriginalName,
} from '../../redux/features/inventory/userSummaryFilterSlice';
import { useSearchEmployeeMutation } from '../../redux/features/teamManagement/teamManagementApi';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';
import labelChange from '../../util/labelChange';

function UserSummaryFilter({ queryFunc, loading, downloadButton }) {
    const { dateRange, ffLevel, ffCode, posmCode } = useSelector(
        (state) => state.userSummaryFilter
    );

    const dispatch = useDispatch();

    // get material name
    const { data, isLoading: materialGetLoading } = useGetPosmListQuery();

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const getFilterData = (lev) => {
        const bodyData = {};
        if (lev) {
            bodyData.type = lev;
        }
        return bodyData;
    };

    // search employee api hook
    const [searchEmployee, { data: employeeData, isLoading }] = useSearchEmployeeMutation();

    useEffect(() => {
        searchEmployee({
            ...getDataManagementFilterData({ circle, region, area, territory, town }),
            ...getFilterData(ffLevel),
        });
    }, [searchEmployee, circle, region, area, territory, town, ffLevel]);

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    const [search2, setSearch2] = useState('');
    const onSearch2 = (e) => {
        setSearch2(e);
    };

    // user information
    const { user } = useSelector((state) => state.auth);
    const projectAccessData = user?.projectAccess
        ?.map((x) => ({ label: labelChange(x), value: x }))
        ?.filter((x) => x.value !== 'MS' && x.value !== 'MTCM');

    const posmNameCng = (id) => {
        dispatch(setPosmName(id));

        dispatch(setPosmOriginalName(data?.data?.data?.find((x) => x._id === id).name));
    };
    return (
        <>
            <DateRange dataPickerFunc={dataPickerFunc} />

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    mode="multiple"
                    value={ffLevel}
                    loading={isLoading}
                    allowClear
                    placeholder="FF Level"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setFFLevel(e))}
                    options={projectAccessData || []}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    mode="multiple"
                    showSearch
                    loading={isLoading}
                    allowClear
                    placeholder="FF Name"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setFFId(e))}
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
                    value={ffCode}
                    placeholder="FF Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setFFCode(e.target.value))}
                />
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    loading={materialGetLoading}
                    allowClear
                    showSearch
                    placeholder="POSM"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => posmNameCng(e)}
                    options={data?.data?.data?.map((x) => ({ label: x.name, value: x._id }))}
                    filterOption={(input, option) =>
                        option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    searchValue={search2}
                    onSearch={onSearch2}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Input
                    value={posmCode}
                    placeholder="POSM Code"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(e) => dispatch(setPosmCode(e.target.value))}
                />
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    className="filter-btn"
                    icon={<SearchOutlined />}
                    type="primary"
                    onClick={() => queryFunc(1, 10, 'cleanShowResultOnPage')}
                >
                    Search
                </Button>
            </Col>

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Button
                    className="download-btn"
                    loading={loading}
                    disabled={loading}
                    onClick={() => {
                        downloadButton({
                            url: '/v1/report/ff-posm-summary',
                            fileName: 'FF POSM Summary.xlsx',
                        });
                    }}
                    size="large"
                    type="primary"
                    danger
                    icon={<DownloadOutlined />}
                >
                    Download
                </Button>
            </Col>
        </>
    );
}

export default UserSummaryFilter;
