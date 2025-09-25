import { Button, Form, Input, Modal, Select, message } from 'antd';

import { useAddMaterialMutation } from '../../redux/features/materialManagement/materialManagementApi';

function AddNewMaterial({ isModalOpen, setIsModalOpen }) {
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

    // add material api hook
    const [addMaterial, { isLoading }] = useAddMaterialMutation();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const result = await addMaterial({
                name: values.materialName,
                category: values.category,
            }).unwrap();
            message.success(result?.message);
            form.resetFields();
            handleOk();
        } catch (error) {
            message.error(error.data.message);
        }
    };

    return (
        <Modal
            okText="Create"
            title="Add New Material"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                className="add-user-form"
                style={{ padding: '24px 24px 5px 24px' }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Material Name"
                    name="materialName"
                    rules={[{ required: true, message: 'Please enter material name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a Category' }]}
                >
                    <Select>
                        <Option value="countable">Countable</Option>
                        <Option value="toolkit">Toolkit</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        disabled={isLoading}
                        loading={isLoading}
                        style={{ width: '100%' }}
                        type="primary"
                        htmlType="submit"
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddNewMaterial;
