import { Button, Form, Input, Modal, Select } from 'antd';

function EditMaterialModal({ isModalOpen, setIsModalOpen, data }) {
    const { name, category } = data;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { Option } = Select;

    const onFinish = (values) => {};

    return (
        <Modal
            okText="Edit"
            title="Edit Material"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                className="add-user-form"
                style={{ padding: '24px 24px 5px 24px' }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Material Name"
                    name="materialName"
                    rules={[{ required: true, message: 'Please enter material name' }]}
                >
                    <Input defaultValue={name} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a Category' }]}
                >
                    <Select defaultValue={category}>
                        <Option value="POSM">POSM</Option>
                        <Option value="Toolkit">Toolkit</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditMaterialModal;
