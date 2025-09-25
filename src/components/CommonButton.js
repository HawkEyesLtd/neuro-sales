import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function CommonButton({ loading, disabled, queryFunc }) {
    return (
        <Button
            loading={loading}
            disabled={disabled}
            size="large"
            className="filter-btn"
            icon={<SearchOutlined />}
            type="primary"
            onClick={queryFunc}
        >
            Search
        </Button>
    );
}

export default CommonButton;
