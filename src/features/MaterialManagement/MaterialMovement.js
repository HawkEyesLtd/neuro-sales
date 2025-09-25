import { Button, InputNumber, message, Popconfirm, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetSingleDhQuery } from '../../redux/features/dataManagement/dataManagementApi';
import { setGlobalLoading } from '../../redux/features/loaderSlice';
import {
    useCreateMaterialTransferRequestMutation,
    useGetDhListQuery,
    useGetPendingMaterialMutation,
} from '../../redux/features/materialManagement/materialManagementApi';
import { showErrorFromApi, showSuccessFromApi } from '../../utils/apiMessage';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

function MaterialMovement() {
    const dispatch = useDispatch();

    // get dh list
    const { data, isLoading } = useGetDhListQuery();

    const [formDh, setFormDh] = useState('');
    const [toDh, setToDh] = useState('');

    const [skip, setSkip] = useState(false);

    // get single dh information
    const { data: singleData, refetch } = useGetSingleDhQuery({ id: toDh }, { skip });

    const [getPendingMaterial, { data: stockData, isLoading: stockLoading }] =
        useGetPendingMaterialMutation();

    const [transformData, setTransformData] = useState([]);

    // response data normalize
    useEffect(() => {
        if (stockData?.data?.length) {
            setTransformData(
                stockData?.data
                    ?.map((item) =>
                        item.data.map((x) => ({
                            ...x,
                        }))
                    )
                    .flat()
            );
        }
    }, [stockData]);

    // fetch stock data
    useEffect(() => {
        if (formDh) {
            getPendingMaterial({
                dhId: formDh,
            });
        }
    }, [getPendingMaterial, formDh]);

    // input data
    const [sendItem, setSendItem] = useState([]);

    // input data collect function
    const changeFunc = (record, value) => {
        setSendItem((prev) => {
            if (prev.find((item) => item.materialId === record.materialId)) {
                return [
                    ...prev.filter((x) => x.materialId !== record.materialId),
                    { materialId: record.materialId, quantity: value },
                ].filter((x) => x.quantity > 0);
            }
            return [...prev, { materialId: record.materialId, quantity: value }].filter(
                (x) => x.quantity > 0
            );
        });
    };

    // transfer request api hook
    const [createMaterialTransferRequest, { isLoading: transferLoading }] =
        useCreateMaterialTransferRequestMutation();

    // transfer data (called from Popconfirm onConfirm)
    const handleSendData = async () => {
        try {
            const res = await createMaterialTransferRequest({
                senderDhId: formDh,
                receiverDhId: toDh,
                items: sendItem,
            }).unwrap();
            showSuccessFromApi(res, 'Request send', 10);
            setFormDh('');
            setToDh('');
            setTransformData([]);
            setSendItem([]);
        } catch (error) {
            showErrorFromApi(error, 'Something went wrong');
        }
    };

    // data receive and set global loading
    useEffect(() => {
        const loading = stockLoading || transferLoading;
        dispatch(setGlobalLoading(loading));
    }, [dispatch, stockLoading, transferLoading]);

    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        setSearch(e);
    };

    const [searchTo, setSearchTo] = useState('');
    const onSearchTo = (e) => {
        setSearchTo(e);
    };

    // get single dh when select to dh
    useEffect(() => {
        if (toDh) {
            setSkip(false);
            refetch();
        }
    }, [refetch, toDh]);

    return (
        <div style={{ margin: '15px' }}>
            <HelmetHeader title="Material Movement" />

            <div
                style={{
                    padding: '10px',
                    marginTop: '8px',
                    boxShadow: '0 0 5px 0 #d6d0d0',
                    borderRadius: '10px',
                }}
            >
                <p style={{ fontSize: '16px', fontWeight: 500 }}>Material Movement</p>

                <div style={{ marginBottom: '10px' }}>
                    <Space>
                        <div>
                            <label htmlFor="form-dh" className="required-label">
                                Form DH
                            </label>
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                <Select
                                    allowClear
                                    showSearch
                                    size="large"
                                    id="form-dh"
                                    placeholder="Select form DH"
                                    style={{ minWidth: '220px' }}
                                    options={data?.data}
                                    value={formDh || null}
                                    onChange={(e) => {
                                        setFormDh(e);
                                        setToDh('');
                                        setTransformData([]);
                                    }}
                                    filterOption={(input, option) =>
                                        option.props.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    searchValue={search}
                                    onSearch={onSearch}
                                />
                                <p style={{ margin: 0 }}>{formDh && stockData?.data[0]?.dhcode}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="to-dh" className="required-label">
                                TO DH
                            </label>
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                <Select
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    searchValue={searchTo}
                                    onSearch={onSearchTo}
                                    size="large"
                                    id="to-dh"
                                    placeholder="Select to DH"
                                    style={{ minWidth: '220px' }}
                                    value={toDh || null}
                                    options={
                                        formDh
                                            ? data?.data?.filter(({ value }) => value !== formDh)
                                            : []
                                    }
                                    onChange={(e) => setToDh(e)}
                                    // Add any other props you need for Select Field 2
                                />
                                <p style={{ margin: 0 }}>{singleData?.data?.dhCode}</p>
                            </div>
                        </div>
                    </Space>
                </div>

                <Table
                    rowKey="materialId"
                    scroll={{ x: 800 }}
                    pagination={false}
                    size="small"
                    dataSource={transformData || []}
                >
                    <Column title="Category" dataIndex="category" key="category" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="In Hand Qty" dataIndex="quantity" key="quantity" />
                    <Column
                        title="Transfer Qty"
                        key="receive"
                        align="right"
                        render={(_, record) => (
                            <Space>
                                {record.quantity > 0 ? (
                                    <InputNumber
                                        onChange={(e) => changeFunc(record, e)}
                                        size="large"
                                        min={0}
                                        max={record.quantity}
                                        placeholder="Qty"
                                    />
                                ) : null}
                            </Space>
                        )}
                    />
                </Table>

                <div
                    style={{
                        margin: '0 auto',
                        padding: '10px 0 5px 0',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    {sendItem.length && formDh && toDh ? (
                        <Popconfirm
                            title="Confirm to submit"
                            description="Are you sure to do this."
                            onConfirm={handleSendData}
                            okText="Yes"
                            cancelText="No"
                            onCancel={() => message.warning('Cancelled!')}
                        >
                            <Button
                                disabled={transferLoading}
                                loading={transferLoading}
                                className="common-bg"
                                size="large"
                            >
                                Transfer
                            </Button>
                        </Popconfirm>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default MaterialMovement;
