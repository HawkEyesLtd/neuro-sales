import { Form, Input } from 'antd';

function FormField({ name, label, rules, type = 'text', placeholder, dependencies, isPassword }) {
    const InputComponent = isPassword ? Input.Password : Input;

    return (
        <Form.Item name={name} label={label} rules={rules} dependencies={dependencies}>
            <InputComponent type={type} placeholder={placeholder} />
        </Form.Item>
    );
}

export default FormField;
