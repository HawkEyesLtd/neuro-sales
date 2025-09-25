import { Button, Form, Input, Select, message } from 'antd';

import HelmetHeader from '../../components/HelmetHeader';
import { useAddRegionMutation } from '../../redux/features/dataManagement/dataManagementApi';

const { Option } = Select;

function AddRegion() {
    // add region api hook
    const [addRegion, { isSuccess, isLoading: addLoading }] = useAddRegionMutation();

    // form
    const [form] = Form.useForm();

    // submit function
    const onFinish = async (values) => {
        try {
            const result = await addRegion({
                name: values.region,
            }).unwrap();
            message.success('Cluster added successfully');
            form.resetFields();
        } catch (error) {
            message.error(error.data.message);
        }
    };
    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Add Cluster" />

            <div
                style={{
                    borderRadius: '10px',
                    marginTop: '20px',
                }}
            >
                <div className="box-heading">Add Cluster</div>
                <Form
                    style={{ background: 'white', padding: '10px' }}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="region"
                        label="Cluster Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            style={{ maxWidth: '400px' }}
                            size="large"
                            placeholder="Cluster Name"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={addLoading}
                            loading={addLoading}
                            type="primary"
                            htmlType="submit"
                        >
                            Add Cluster
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default AddRegion;
