import { Button, Form, Input, Select, message } from 'antd';

import HelmetHeader from '../../components/HelmetHeader';
import {
    useAddAreaMutation,
    useGetRegionListQuery,
} from '../../redux/features/dataManagement/dataManagementApi';

const { Option } = Select;

function AddArea() {
    // get dropdown data
    const { data: regionList } = useGetRegionListQuery();

    // area added api hook
    const [addArea, { isSuccess, isLoading: areaLoading }] = useAddAreaMutation();

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const result = await addArea({
                name: values.area,
                regionId: values.region,
            }).unwrap();
            message.success('Area added successfully');
            form.resetFields();
        } catch (error) {
            message.error(error.data.message);
        }
    };
    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Add Area" />

            <div
                style={{
                    borderRadius: '10px',
                    marginTop: '20px',
                }}
            >
                <div className="box-heading">Add Area</div>
                <Form
                    style={{ background: 'white', padding: '10px' }}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="region"
                        label="Cluster"
                        rules={[
                            {
                                required: true,
                                message: 'Missing region',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Cluster"
                            style={{ maxWidth: '400px' }}
                            size="large"
                            options={regionList?.data?.data?.map((x) => ({
                                label: x.name,

                                value: x._id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="area"
                        label="Area"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input style={{ maxWidth: '400px' }} size="large" placeholder="Area Name" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={areaLoading}
                            loading={areaLoading}
                            type="primary"
                            htmlType="submit"
                        >
                            Add Area
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default AddArea;
