import { Col, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

function DateRange({ dataPickerFunc }) {
    return (
        <Col xs={12} sm={8} md={6} lg={6} xl={6}>
            <RangePicker
                defaultValue={[dayjs(), dayjs()]}
                onChange={dataPickerFunc}
                className="filter-calender"
                size="large"
                changeOnBlur
            />
        </Col>
    );
}

export default DateRange;
