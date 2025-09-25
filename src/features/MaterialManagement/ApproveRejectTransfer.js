import { Button, message, Popconfirm, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetSingleDhQuery } from '../../redux/features/dataManagement/dataManagementApi';
import { setGlobalLoading } from '../../redux/features/loaderSlice';
import {
    useApproveOrRejectMutation,
    useGetDhListQuery,
    useGetPendingMaterialListQuery,
} from '../../redux/features/materialManagement/materialManagementApi';
import { showErrorFromApi, showSuccessFromApi } from '../../utils/apiMessage';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

function ApproveRejectTransfer() {
    const dispatch = useDispatch();

    // get dh list
    const { data, isLoading } = useGetDhListQuery();

    const [dhId, setDhId] = useState('');
    const [skip, setSkip] = useState(false);

    // get single dh information
    const { data: singleData, refetch: singleRefetch } = useGetSingleDhQuery(
        { id: dhId },
        { skip }
    );

    const {
        data: pendingData,
        isLoading: pendingLoading,
        refetch,
    } = useGetPendingMaterialListQuery(
        {
            id: dhId,
        },
        { skip }
    );

    useEffect(() => {
        if (dhId) {
            setSkip(false);
            refetch();
            singleRefetch();
        }
    }, [refetch, singleRefetch, dhId]);

    const [approveOrReject, { isLoading: actionLoading }] = useApproveOrRejectMutation();

    // approve or reject (called from Popconfirm onConfirm)
    const handleApproveOrReject = async (id, status) => {
        try {
            const res = await approveOrReject({ transferId: [id], status }).unwrap();
            showSuccessFromApi(res, 'Successfully complete', 10);
        } catch (error) {
            showErrorFromApi(error, 'Something went wrong');
        }
    };

    // data receive and set global loading
    useEffect(() => {
        const loading = pendingLoading || actionLoading;
        dispatch(setGlobalLoading(loading));
    }, [dispatch, pendingLoading, actionLoading]);

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    return (
        <div style={{ margin: '15px' }}>
            <HelmetHeader title="Transfer Request" />

            <div
                style={{
                    padding: '10px',
                    marginTop: '8px',
                    boxShadow: '0 0 5px 0 #d6d0d0',
                    borderRadius: '10px',
                }}
            >
                <p style={{ fontSize: '16px', fontWeight: 500 }}>Approve/Reject Transfer Request</p>

                <div style={{ marginBottom: '10px' }}>
                    <Space>
                        <div>
                            <label htmlFor="dh" className="required-label">
                                TO DH Name
                            </label>
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                <Select
                                    allowClear
                                    showSearch
                                    size="large"
                                    id="dh"
                                    placeholder="Select a DH"
                                    style={{ minWidth: '220px' }}
                                    options={data?.data}
                                    value={dhId || null}
                                    onChange={(e) => {
                                        setDhId(e);
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    searchValue={search}
                                    onSearch={onSearch}
                                />
                                <p style={{ margin: 0 }}>{dhId && singleData?.data?.dhCode}</p>
                            </div>
                        </div>
                    </Space>
                </div>

                <Table
                    rowKey="id"
                    scroll={{ x: 800 }}
                    pagination={false}
                    size="small"
                    dataSource={pendingData?.data || []}
                >
                    <Column
                        title="Timestamp"
                        dataIndex="createdAt"
                        key="createdAt"
                        render={(_, record) =>
                            dayjs(record.createdAt).format('DD/MM/YYYY hh:mm:ss A')
                        }
                    />
                    <Column
                        title="Form DH"
                        dataIndex="formDh"
                        key="formDh"
                        render={(_, record) => record.senderDh.name}
                    />
                    <Column
                        title="Receiver DH"
                        dataIndex="formDh"
                        key="formDh"
                        render={(_, record) => record.receiverDh.name}
                    />
                    <Column
                        title="Material Name"
                        dataIndex="materialName"
                        key="materialName"
                        render={(_, record) => record.material.name}
                    />
                    <Column
                        title="Category"
                        dataIndex="category"
                        key="category"
                        render={(_, record) => record.material.category}
                    />
                    <Column title="Quantity" dataIndex="quantity" key="quantity" />
                    <Column
                        title="Action"
                        key="id"
                        render={(_, record) => (
                            <Space>
                                <Popconfirm
                                    title={`Confirm to Approve`}
                                    description="Are you sure to do this."
                                    onConfirm={() => handleApproveOrReject(record.id, 'approved')}
                                    okText="Yes"
                                    cancelText="No"
                                    onCancel={() => message.warning('Cancelled!')}
                                >
                                    <Button disabled={actionLoading} type="primary">
                                        Approve
                                    </Button>
                                </Popconfirm>

                                <Popconfirm
                                    title={`Confirm to Decline`}
                                    description="Are you sure to do this."
                                    onConfirm={() => handleApproveOrReject(record.id, 'declined')}
                                    okText="Yes"
                                    cancelText="No"
                                    onCancel={() => message.warning('Cancelled!')}
                                >
                                    <Button disabled={actionLoading} danger>
                                        Reject
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
}

export default ApproveRejectTransfer;
