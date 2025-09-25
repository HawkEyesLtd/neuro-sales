import { Form, Input } from 'antd';

/**
 * Reusable textarea field for login forms.
 * Props: name, placeholder, rules
 */
function LoginTextArea({ name, placeholder, rules }) {
    return (
        <Form.Item name={name} rules={rules}>
            <Input.TextArea className="login-input-field-customize" placeholder={placeholder} />
        </Form.Item>
    );
}

export default LoginTextArea;
