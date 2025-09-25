import { Button, Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

function EditProfileModal({ visible, onCancel, onFinish, user }) {
    return (
        <Modal title="Edit Profile" visible={visible} onCancel={onCancel} footer={null}>
            <Form onFinish={onFinish}>
                <Form.Item label="Name" name="name">
                    <Input defaultValue={user?.name} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                >
                    <Input defaultValue={user?.email} />
                </Form.Item>

                {/* <Form.Item
                    tooltip="The Auto-Refreshing Dashboard feature allows you to view up-to-date data without manually reloading or navigating away from the page. Once you access the dashboard page, the data will automatically update at regular intervals without requiring any user interaction. This ensures that you always have the most recent and accurate information readily available. The seamless auto-refreshing process enhances your dashboard experience, making it a convenient and efficient way to stay informed without any additional effort on your part."
                    name="refreshTime"
                    label="Auto-Refreshing Dashboard"
                    hasFeedback
                >
                    <Select defaultValue={user.refreshTime > 0 ? user.refreshTime : 'off'}>
                        <Option value="off">Off</Option>
                        <Option value={1}>1 Min</Option>
                        <Option value={5}>5 Min</Option>
                        <Option value={10}>10 Min</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    tooltip="Session Timeout is a security feature that automatically logs out users after a period of inactivity. This prevents unauthorized access to accounts and data, ensuring user safety. Users need to log in again if their session times out."
                    name="sessionTimeOut"
                    label="Session Timeout"
                    hasFeedback
                >
                    <Select defaultValue={user.sessionTimeOut}>
                        <Option value={1}>1 Min</Option>
                        <Option value={10}>10 Min</Option>
                        <Option value={20}>20 Min</Option>
                        <Option value={30}>30 Min</Option>
                        <Option value={60}>60 Min</Option>
                    </Select>
                </Form.Item> */}

                <Form.Item style={{ margin: '20px 0 0 0', width: '100%', textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditProfileModal;
