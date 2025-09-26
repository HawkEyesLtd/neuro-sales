import { FilterOutlined } from '@ant-design/icons';
import DateRange from '@components/DateRange';
import FilterButton from '@components/FilterButton';
import { setDateRange } from '@redux/features/dashboard/dashboardFilterSlice';
import labelChange from '@utils/labelChange';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function DashboardFilter({ queryFunc, loading }) {
    const dispatch = useDispatch();

    const { projectType } = useSelector((state) => state.dashboardFilter);

    // user information log
    const { user } = useSelector((state) => state.auth);
    const projectAccessData = user?.projectAccess?.map((x) => ({
        label: labelChange(x),
        value: x,
    }));

    // date picker function
    const dataPickerFunc = (_, date) => {
        dispatch(setDateRange(date));
    };

    return (
        <>
            <DateRange dataPickerFunc={dataPickerFunc} />

            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <FilterButton
                    fn={queryFunc}
                    loading={loading}
                    icon={<FilterOutlined />}
                    title="Filter"
                />
            </Col>
        </>
    );
}

export default DashboardFilter;
