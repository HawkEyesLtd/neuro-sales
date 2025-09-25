import { Button } from 'antd';

function ActionButton({ loading, disabled, onClick, children, type = 'default' }) {
    return (
        <Button
            type={type}
            loading={loading}
            disabled={disabled}
            onClick={onClick}
            style={{ width: '100%', borderRadius: '30px' }}
            size="large"
        >
            {children}
        </Button>
    );
}

export default ActionButton;
