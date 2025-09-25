import { Form, Input } from 'antd';

/**
 * Reusable password field for login forms.
 * Props: name, placeholder, rules, dependencies
 */
function LoginPassword({ name, placeholder, rules, dependencies }) {
    return (
        <Form.Item name={name} rules={rules} dependencies={dependencies}>
            <Input.Password className="login-input-field-customize" placeholder={placeholder} />
        </Form.Item>
    );
}

export default LoginPassword;
