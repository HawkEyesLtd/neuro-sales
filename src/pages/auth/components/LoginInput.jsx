import { Form, Input } from 'antd';

/**
 * Reusable input field for login forms.
 * Props: name, type, placeholder, rules, dependencies
 */
function LoginInput({ name, type = 'text', placeholder, rules, dependencies }) {
    return (
        <Form.Item name={name} rules={rules} dependencies={dependencies}>
            <Input className="login-input-field-customize" type={type} placeholder={placeholder} />
        </Form.Item>
    );
}

export default LoginInput;
