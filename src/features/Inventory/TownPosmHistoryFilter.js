import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DateRange from '../../components/DateRange';
import { useGetPosmListQuery } from '../../redux/features/inventory/inventoryApiSlice';
import {
    setDateRange,
    setEntryType,
    setPosmCode,
    setPosmName,
} from '../../redux/features/inventory/viewPosmTownHistoryFilterSlice';

function TownPosmHistoryFilter({ queryFunc, loading, downloadButton }) {
    const { dateRange, entryType, posmName, posmCode } = useSelector(
        (state) => state.posmTownHistoryFilter
    );

    const { data, isLoading } = useGetPosmListQuery();

    const dispatch = useDispatch();

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    return (
        <>
            <DateRange dataPickerFunc={dataPickerFunc} />
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <Select
                    allowClear
                    placeholder="POSM"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    showSearch
                    loading={isLoading}
                    onChange={(e) => dispatch(setPosmName(e))}
                    options={data?.data?.data?.map((x) => ({ label: x.name, value: x._id }))}
                    filterOption={(input, option) =>
                        option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    searchValue={search}
                    onSearch={onSearch}
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
                <Select
                    allowClear
                    placeholder="Entry Type"
                    size="large"
                    style={{
                        width: '100%',
                    }}
                    onChange={(e) => dispatch(setEntryType(e))}
                    options={[
                        {
                            value: 'Town Material Accept',
                            label: 'Receive in town',
                        },
                        {
                            value: 'Town Material Allocate',
                            label: 'Allocate via Excel',
                        },
                        {
                            value: 'Town Material Transfer',
                            label: 'Transfer',
                        },
                        {
                            value: 'Town Material Transfer Receive',
                            label: 'Transfer Receive',
                        },
                        {
                            value: 'Town Material Damage',
                            label: 'Town Material Damage',
                        },
                        {
                            value: 'Town Material Lost',
                            label: 'Town Material Lost',
                        },
                    ]}
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
                            url: '/v1/report/town-posm-history',
                            fileName: 'Town POSM History.xlsx',
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

export default TownPosmHistoryFilter;
