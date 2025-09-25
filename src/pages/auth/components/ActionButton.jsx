import { Button, Form } from 'antd';

/**
 * Reusable action button for login forms.
 * Props: loading, disabled, style, onClick, children
 */
function ActionButton({ loading, disabled, style, onClick, children }) {
    return (
        <Form.Item>
            <Button
                loading={loading}
                disabled={disabled}
                style={style}
                size="large"
                onClick={onClick}
            >
                {children}
            </Button>
        </Form.Item>
    );
}

export default ActionButton;
