import { Button, Form, Input, Select, message } from 'antd';

import HelmetHeader from '../../components/HelmetHeader';
import {
    useAddTerritoryMutation,
    useGetAreaListQuery,
    useGetRegionListQuery,
} from '../../redux/features/dataManagement/dataManagementApi';

const { Option } = Select;

function AddTerritory() {
    // get dropdown data
    const { data: regionList } = useGetRegionListQuery();
    const { data: areaList } = useGetAreaListQuery();

    // territory add api hook
    const [addTerritory, { isLoading: addLoading }] = useAddTerritoryMutation();

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const result = await addTerritory({
                name: values.territory,
                regionId: values.territoryRegion,
                areaId: values.territoryArea,
            }).unwrap();
            message.success('Territory added successfully');
            form.resetFields();
        } catch (error) {
            message.error(error.data.message);
        }
    };
    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Add Territory" />

            <div
                style={{
                    borderRadius: '10px',
                    marginTop: '20px',
                }}
            >
                <div className="box-heading">Add Territory</div>
                <Form
                    style={{ background: 'white', padding: '10px' }}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="territoryRegion"
                        label="Cluster"
                        rules={[
                            {
                                required: true,
                                message: 'Missing region',
                            },
                        ]}
                    >
                        <Select
                            style={{ maxWidth: '400px' }}
                            placeholder="Cluster"
                            size="large"
                            options={regionList?.data?.data?.map((x) => ({
                                label: x.name,

                                value: x._id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="territoryArea"
                        label="Area"
                        rules={[
                            {
                                required: true,
                                message: 'Missing area',
                            },
                        ]}
                    >
                        <Select
                            style={{ maxWidth: '400px' }}
                            placeholder="Area"
                            size="large"
                            options={areaList?.data?.data?.map((x) => ({
                                label: x.name,

                                value: x._id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="territory"
                        label="Territory"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            style={{ maxWidth: '400px' }}
                            size="large"
                            placeholder="Territory Name"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={addLoading}
                            loading={addLoading}
                            type="primary"
                            htmlType="submit"
                        >
                            Add Territory
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default AddTerritory;
