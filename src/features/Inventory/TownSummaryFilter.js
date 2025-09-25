import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DateRange from '../../components/DateRange';
import { useGetPosmListQuery } from '../../redux/features/inventory/inventoryApiSlice';
import {
    setDateRange,
    setPosmId,
    setPosmName,
} from '../../redux/features/inventory/townSummaryFilterSlice';

function TownSummaryFilter({ queryFunc, loading, downloadButton }) {
    const { dateRange } = useSelector((state) => state.townSummaryFilter);

    const dispatch = useDispatch();

    const { data, isLoading } = useGetPosmListQuery();

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    const posmChange = (id) => {
        dispatch(setPosmId(id));

        dispatch(setPosmName(data?.data?.data?.find((x) => x._id === id).name));
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
                    onChange={(e) => posmChange(e)}
                    options={data?.data?.data?.map((x) => ({ label: x.name, value: x._id }))}
                    filterOption={(input, option) =>
                        option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    searchValue={search}
                    onSearch={onSearch}
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
                            url: '/v1/report/town-posm-summary',
                            fileName: 'Town POSM Summary.xlsx',
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

export default TownSummaryFilter;
