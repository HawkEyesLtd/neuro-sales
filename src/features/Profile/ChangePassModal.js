import { Button, Form, Input, Modal } from 'antd';

function ChangePassModal({ visible, onCancel, onFinish }) {
    return (
        <Modal title="Change Password" visible={visible} onCancel={onCancel} footer={null}>
            <Form onFinish={onFinish}>
                <Form.Item
                    rules={[{ required: true, message: 'Old Password is required' }]}
                    label="Old Password"
                    name="oldPassword"
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        {
                            max: 64,
                            message: 'Maximum 64 characters',
                        },
                        {
                            pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,64})\S$/gm,
                            message: `Minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={{ margin: '20px 0 0 0', width: '100%', textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ChangePassModal;
