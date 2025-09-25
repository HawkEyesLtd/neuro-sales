import { EditOutlined } from '@ant-design/icons';
import { Button, Pagination, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';

import { useDeleteMaterialMutation } from '../../redux/features/materialManagement/materialManagementApi';

import EditMaterialModal from './EditMaterialModal';

const { Column, ColumnGroup } = Table;

function ViewMaterialTable({ data, getLoading, setPage }) {
    // edit modal hook
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    // get material data

    // delete hook
    const [deleteMaterial, { isLoading }] = useDeleteMaterialMutation();

    // delete material (delete executed via Popconfirm onConfirm)
    const deleteMaterialFunction = (id) => {
        deleteMaterial(id);
    };

    const pageChange = (e) => {
        setPage(e);
    };

    return (
        <>
            <EditMaterialModal
                data={editData}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <div style={{ borderRadius: '10px' }}>
                <div className="box-heading">Material Details</div>

                <div style={{ padding: '10px', width: '100%' }}>
                    <Table
                        loading={getLoading}
                        pagination={false}
                        rowKey="_id"
                        size="small"
                        scroll={{
                            x: 500,
                        }}
                        // loading={loginLoading}
                        dataSource={data?.data}
                    >
                        <Column
                            title="Serial No"
                            dataIndex="serialNo"
                            key="serialNo"
                            sorter={(a, b) => a.serialNo - b.serialNo}
                        />
                        <Column title="Material Name" dataIndex="name" key="name" />
                        <Column title="Material Category" dataIndex="category" key="category" />
                        <Column
                            title="Action"
                            key="action"
                            align="right"
                            render={(_, record) => (
                                <Space size={2}>
                                    <Space>
                                        <Button
                                            size="small"
                                            icon={<EditOutlined />}
                                            type="primary"
                                            shape="circle"
                                            onClick={() => {
                                                setEditData({
                                                    category: record.materialType,
                                                    name: record.materialName,
                                                });
                                                setIsModalOpen((prev) => !prev);
                                            }}
                                        />
                                        <Popconfirm
                                            title="Confirm to submit"
                                            description="Are you sure to do this."
                                            onConfirm={() => deleteMaterialFunction(record._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                size="small"
                                                type="primary"
                                                danger
                                                shape="circle"
                                            />
                                        </Popconfirm>
                                    </Space>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        padding: '10px 0',
                    }}
                >
                    <Pagination
                        showSizeChanger={false}
                        showQuickJumper
                        onChange={pageChange}
                        pageSize={10}
                        current={data?.meta?.page || 1}
                        defaultCurrent={1}
                        total={data?.meta?.total || 0}
                    />
                </div>
            </div>
        </>
    );
}

export default ViewMaterialTable;
