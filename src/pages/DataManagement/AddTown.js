import { Button, Form, Input, InputNumber, Select, message } from 'antd';

import HelmetHeader from '../../components/HelmetHeader';
import {
    useAddTownMutation,
    useGetAreaListQuery,
    useGetRegionListQuery,
    useGetTerritoryListQuery,
} from '../../redux/features/dataManagement/dataManagementApi';

const { Option } = Select;

function AddTown() {
    // get dropdown data
    const { data: regionList } = useGetRegionListQuery();
    const { data: areaList } = useGetAreaListQuery();
    const { data: territoryList } = useGetTerritoryListQuery();

    // add dh api hook
    const [addTown, { isLoading: addLoading }] = useAddTownMutation();

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const result = await addTown({
                name: values.town,
                regionId: values.region,
                areaId: values.area,
                territoryId: values.territory,
                towncode: values.townCode,
                lat: values.lat,
                lon: values.lon,
            }).unwrap();
            message.success('Town added successfully');
            form.resetFields();
        } catch (error) {
            message.error('Failed!');
        }
    };
    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Add Town" />

            <div
                style={{
                    borderRadius: '10px',
                    marginTop: '20px',
                }}
            >
                <div className="box-heading">Add Town</div>
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
                            style={{ maxWidth: '400px' }}
                            placeholder="Cluster Name"
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
                                message: 'Missing area',
                            },
                        ]}
                    >
                        <Select
                            style={{ maxWidth: '400px' }}
                            placeholder="Area Name"
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
                                message: 'Missing territory',
                            },
                        ]}
                    >
                        <Select
                            style={{ maxWidth: '400px' }}
                            placeholder="Territory Name"
                            size="large"
                            options={territoryList?.data?.data?.map((x) => ({
                                label: x.name,

                                value: x._id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        name="town"
                        label="Town Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input style={{ maxWidth: '400px' }} size="large" placeholder="Town Name" />
                    </Form.Item>

                    <Form.Item
                        name="townCode"
                        label="Town Code"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input style={{ maxWidth: '400px' }} size="large" placeholder="Town Code" />
                    </Form.Item>

                    <Form.Item
                        name="lat"
                        label="Town latitude"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ minWidth: '400px' }}
                            size="large"
                            placeholder="Town latitude"
                        />
                    </Form.Item>

                    <Form.Item
                        name="lon"
                        label="Town longitude"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ minWidth: '400px' }}
                            size="large"
                            placeholder="Town longitude"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            disabled={addLoading}
                            loading={addLoading}
                            type="primary"
                            htmlType="submit"
                        >
                            Add Town
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default AddTown;
