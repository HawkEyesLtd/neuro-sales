import { SearchOutlined } from '@ant-design/icons';
import DateRange from '@components/DateRange';
import FilterButton from '@components/FilterButton';
import { setDateRange } from '@redux/features/dashboard/dashboardFilterSlice';
import { Col, Select } from 'antd';
import { useDispatch } from 'react-redux';

import DataManagementFilter from '@/components/DataManagementFilter';

const { Option } = Select;

function DashboardFilter({ queryFunc, loading }) {
    const dispatch = useDispatch();

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    // Mock data for dropdowns - replace with actual data from API
    const regions = [
        { label: 'All Regions', value: '' },
        { label: 'North Region', value: 'north' },
        { label: 'South Region', value: 'south' },
        { label: 'East Region', value: 'east' },
        { label: 'West Region', value: 'west' },
    ];

    const areas = [
        { label: 'All Areas', value: '' },
        { label: 'Area 1', value: 'area1' },
        { label: 'Area 2', value: 'area2' },
        { label: 'Area 3', value: 'area3' },
    ];

    const territories = [
        { label: 'All Territories', value: '' },
        { label: 'Territory 1', value: 'territory1' },
        { label: 'Territory 2', value: 'territory2' },
        { label: 'Territory 3', value: 'territory3' },
    ];

    const dhNames = [
        { label: 'All DH', value: '' },
        { label: 'DH Dhaka', value: 'dh_dhaka' },
        { label: 'DH Chittagong', value: 'dh_chittagong' },
        { label: 'DH Sylhet', value: 'dh_sylhet' },
    ];

    return (
        <>
            <DataManagementFilter />

            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                <Select placeholder="Select DH Name" className="w-full" size="large" allowClear>
                    {dhNames.map((dh) => (
                        <Option key={dh.value} value={dh.value}>
                            {dh.label}
                        </Option>
                    ))}
                </Select>
            </Col>

            <DateRange dataPickerFunc={dataPickerFunc} />

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <FilterButton
                    block
                    fn={queryFunc}
                    loading={loading}
                    icon={<SearchOutlined />}
                    title="Search"
                />
            </Col>
        </>
    );
}

export default DashboardFilter;
