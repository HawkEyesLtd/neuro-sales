import { Button, InputNumber, message, Popconfirm, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import {
    resetDataManagementFilter,
    setTown,
} from '../../redux/features/filter/dataManagementFilterSlice';
import { setGlobalLoading, setReFetchFilter } from '../../redux/features/loaderSlice';
import {
    useGetPendingMaterialMutation,
    useReceiveMaterialMutation,
} from '../../redux/features/materialManagement/materialManagementApi';
import { resetReceiveMaterialFilter } from '../../redux/features/materialManagement/receiveMaterialFilterSlice';
import { showErrorFromApi, showSuccessFromApi } from '../../utils/apiMessage';

const { Column, ColumnGroup } = Table;

function ReceivedMaterial() {
    const dispatch = useDispatch();

    const { dhCode } = useSelector((state) => state.receiveMaterialFilter);

    // filter data
    const { circle, region, area, territory, town } = useSelector((state) => state.dataManagement);

    // input data
    const [receiveItem, setReceiveItem] = useState([]);

    // get pending request
    const [getPendingMaterial, { data, isLoading }] = useGetPendingMaterialMutation();

    const [transformData, setTransformData] = useState([]);

    // response data normalize
    useEffect(() => {
        if (data?.data?.length) {
            setTransformData(
                data?.data
                    ?.map((item) =>
                        item.data.map((x) => ({
                            ...x,
                        }))
                    )
                    .flat()
            );
        }
    }, [data]);

    function getBodyData(dhcode) {
        const bodyData = {};
        if (town?.length) {
            bodyData.townId = town[town.length - 1].value;
        }
        if (dhcode) {
            bodyData.dhCode = dhcode;
        }
        return bodyData;
    }

    // pending data fetch request function
    const fetchPendingData = () => {
        if (town.length || dhCode) {
            getPendingMaterial({
                ...getBodyData(dhCode),
                limit: 1000,
                page: 1,
            });
        } else {
            message.error('Please select a distribution house or type dh code');
        }
    };

    // input data collect function
    const changeFunc = (record, value) => {
        setReceiveItem((prev) => {
            if (prev.find((item) => item.materialId === record.materialId)) {
                return [
                    ...prev.filter((x) => x.materialId !== record.materialId),
                    { materialId: record.materialId, receive: value },
                ].filter((x) => x.receive > 0);
            }
            return [...prev, { materialId: record.materialId, receive: value }].filter(
                (x) => x.receive > 0
            );
        });
    };

    // dh filter single data showing
    useEffect(() => {
        if (town.length > 1) {
            dispatch(setTown([...town.slice(1)]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [town]);

    // confirm material api hook
    const [receiveMaterial, { isLoading: receiveLoading }] = useReceiveMaterialMutation();

    // confirm material function (called from Popconfirm onConfirm)
    const handleConfirmMaterial = async () => {
        try {
            const res = await receiveMaterial({
                id: data?.data[0]?._id.dhId || '',
                data: receiveItem,
            }).unwrap();
            showSuccessFromApi(res, 'Material received successfully');
            setTransformData([]);
            setReceiveItem([]);
            dispatch(resetReceiveMaterialFilter());
        } catch (error) {
            showErrorFromApi(error, 'Something went wrong');
        }
    };

    // data receive and set global loading
    useEffect(() => {
        dispatch(setGlobalLoading(receiveLoading));
    }, [dispatch, receiveLoading]);

    const { reFetchFilter } = useSelector((state) => state.globalLoading);
    // reset existing filter
    useEffect(() => {
        dispatch(setReFetchFilter(!reFetchFilter));
        dispatch(resetDataManagementFilter());
        dispatch(resetReceiveMaterialFilter());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div style={{ margin: '15px' }}>
            <HelmetHeader title="Receive Material" />
            <div style={{ marginBottom: '10px' }}>
                <Filter
                    loading={isLoading}
                    queryFunc={fetchPendingData}
                    pathname="/receive-material"
                    selectAllDisable
                />
            </div>

            <div className="box-heading">Receive Material</div>

            <div
                style={{
                    padding: '10px',
                    marginTop: '8px',
                    boxShadow: '0 0 5px 0 #d6d0d0',
                    borderRadius: '10px',
                }}
            >
                <div style={{ display: 'flex', gap: 15 }}>
                    <p style={{ fontSize: '16px' }}>
                        <span style={{ fontWeight: 500 }}>DH Name: </span>
                        {transformData?.length ? data?.data[0]?.dh : ''}
                    </p>
                    <p style={{ fontSize: '16px' }}>
                        <span style={{ fontWeight: 500 }}>DH Code: </span>
                        {transformData?.length ? data?.data[0]?.dhcode : ''}
                    </p>
                </div>

                <Table
                    rowKey="_id"
                    loading={isLoading}
                    scroll={{ x: 800 }}
                    pagination={false}
                    size="small"
                    dataSource={
                        transformData
                            ?.sort((a, b) => (a.name < b.name ? -1 : 1))
                            .sort((a, b) => b.category.length - a.category.length) || []
                    }
                >
                    <Column
                        title="Last Allocate Time"
                        dataIndex="allocatedAt"
                        key="allocatedAt"
                        render={(e) => dayjs(e).format('DD/MM/YYYY hh:mm:ss A')}
                    />
                    <Column title="Category" dataIndex="category" key="category" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="In Hand Qty" dataIndex="quantity" key="quantity" />
                    <Column title="Pending Qty" dataIndex="pendingQuantity" key="pendingQuantity" />
                    <Column
                        title="Receive Qty"
                        key="receive"
                        align="right"
                        render={(_, record) => (
                            <Space>
                                {record.pendingQuantity > 0 ? (
                                    <InputNumber
                                        onChange={(e) => changeFunc(record, e)}
                                        size="large"
                                        min={1}
                                        max={record.pendingQuantity}
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
                    {receiveItem?.length ? (
                        <Popconfirm
                            title="Confirm to Received Materials"
                            description="Are you sure to do this."
                            onConfirm={handleConfirmMaterial}
                            okText="Yes"
                            cancelText="No"
                            onCancel={() => message.warning('Cancelled!')}
                        >
                            <Button
                                disabled={receiveLoading}
                                loading={receiveLoading}
                                className="common-bg"
                                size="large"
                            >
                                Confirm
                            </Button>
                        </Popconfirm>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default ReceivedMaterial;
