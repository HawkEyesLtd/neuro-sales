import { Button } from 'antd';

function FilterButton({ icon, title, fn, loading }) {
    return (
        <Button
            onClick={fn}
            disabled={loading}
            loading={loading}
            size="large"
            className="filter-btn"
            icon={icon}
            type="primary"
            // style={{ background: '#FFC63A', color: '#fff' }}
        >
            {title}
        </Button>
    );
}

export default FilterButton;
