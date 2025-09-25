import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DateRange from '../../components/DateRange';
import {
    setDateRange,
    setFFCode,
    setFFLevel,
    setFFName,
    setPosmCode,
    setPosmName,
} from '../../redux/features/inventory/damageAndLostFilterSlice';
import { useGetPosmListQuery } from '../../redux/features/inventory/inventoryApiSlice';
import { useSearchEmployeeMutation } from '../../redux/features/teamManagement/teamManagementApi';
import getDataManagementFilterData from '../../util/generateDataManagementFilterData';
import labelChange from '../../util/labelChange';

function DamageAndLostFilter({ queryFunc, loading, downloadButton }) {
    const { dateRange, ffLevel, ffCode, posmCode } = useSelector(
        (state) => state.damageAndLostFilter
    );

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    const dispatch = useDispatch();

    // search employee api hook
    const [searchEmployee, { data: employeeData, isLoading }] = useSearchEmployeeMutation();

    // get material name
    const { data, isLoading: materialGetLoading } = useGetPosmListQuery();

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    const getFilterData = (lev) => {
        const bodyData = {};
        if (lev) {
            bodyData.type = lev;
        }
        return bodyData;
    };

    // user information
    const { user } = useSelector((state) => state.auth);
    const projectAccessData = user?.projectAccess
        ?.map((x) => ({ label: labelChange(x), value: x }))
        ?.filter((x) => x.value !== 'MS' && x.value !== 'MTCM');

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
                    onChange={(e) => dispatch(setFFName(e))}
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
                    onChange={(e) => dispatch(setPosmName(e))}
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
                            url: '/v1/report/ff-posm-damage-lost-history',
                            fileName: 'POSM Damage and Lost.xlsx',
                        });
                    }}
                    size="large"
                    danger
                    type="primary"
                    icon={<DownloadOutlined />}
                >
                    Download
                </Button>
            </Col>
        </>
    );
}

export default DamageAndLostFilter;
