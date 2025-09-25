import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Popconfirm, Row, Space, Table, message } from 'antd';
import dayjs from 'dayjs';

import { useUpdateStatusMutation } from '../../redux/features/dffWholesale/dffWholesaleApi';

import StockByCategoryTable from './StockByCategoryTable';

const { Column, ColumnGroup } = Table;

function OutletSummaryItem({ data }) {
    const {
        _id,
        isVerified,
        user: { name: ffName, userType: ffLevel, usercode: ffCode },
        town: { name: townName },
        outlet: { name: outletName, outletcode: outletCode, channel, contactNo },
        route: { name: routeName },
        stockByCategory,
        callType,
        passed,
        passedByMs,
        accuracy,
        compliance,
        variantWiseCompliance,
        reasonForNoExecution,
        withinRadius,
        executionStartAt,
        scheduleDate,
        lat,
        lon,
        isAiReady,
        remarks,
        image,
        job,
    } = data;

    function convertDataToObjectArray(doc) {
        const result = [];

        for (const key in doc) {
            if (Object.hasOwnProperty.call(doc, key)) {
                result.push({ title: key, items: doc[key] });
            }
        }
        return result;
    }

    const convertedData = convertDataToObjectArray(stockByCategory);

    const [updateStatus, { isLoading: updateLoading }] = useUpdateStatusMutation();

    const evaluationExecution = async (status) => {
        try {
            const res = await updateStatus({
                status,
                id: _id,
            }).unwrap();
            message.success(res?.data?.message);
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    return (
        <div className="execution-item">
            <Row
                gap={[5, 5]}
                justify="space-between"
                style={!isVerified ? { background: '#C50B00' } : {}}
                className={
                    !isVerified ? 'execution-item-error execution-item-card' : 'execution-item-card'
                }
            >
                <Col lg={6} md={12} sm={24}>
                    <p className="ex-item-point">
                        <span style={{ fontWeight: '500' }}>FF Name: </span>
                        {ffName}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">FF Code: </span>
                        {ffCode}
                    </p>
                    {/* <p className="ex-item-point">
                        <span className="ex-item-point-b">FF Level: </span>
                        {ffLevel}
                    </p> */}
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Town: </span>
                        {townName}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Outlet Code: </span>
                        {outletCode}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Outlet Name: </span>
                        {outletName}
                    </p>
                </Col>

                <Col lg={6} md={12} sm={24}>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Channel: </span>
                        {channel}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Outlet Mobile: </span>
                        {contactNo}
                    </p>
                    <p className="ex-item-point" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                        <span className="ex-item-point-b">Route: </span>
                        {routeName}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Category: </span>
                        {Object.keys(stockByCategory || {}).join(', ')}
                    </p>
                </Col>

                <Col lg={6} md={12} sm={24}>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Call Start Time: </span>
                        {dayjs(executionStartAt).format('DD/MM/YYYY hh:mm:ss a')}
                    </p>
                    <p className="ex-item-point">
                        <span className="ex-item-point-b">Reason for Error: </span>
                        {!withinRadius ? 'Geo tag error' : ''}
                    </p>
                </Col>

                <Col lg={6} md={12} sm={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {!isVerified ? (
                        <div className="survey-last-section">
                            <Space direction="vertical">
                                <Popconfirm
                                    title="Verify"
                                    description="Are you sure to verify?"
                                    onConfirm={() => evaluationExecution('Verified')}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{
                                        loading: updateLoading,
                                    }}
                                >
                                    <Button>Verify</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title="Reassign"
                                    description="Are you sure to reassign?"
                                    onConfirm={() => evaluationExecution('Reassigned')}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{
                                        loading: updateLoading,
                                    }}
                                >
                                    <Button>Reassign</Button>
                                </Popconfirm>
                            </Space>
                        </div>
                    ) : null}
                </Col>
            </Row>

            <Collapse
                bordered={false}
                ghost
                style={{ background: 'transparent' }}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                items={[
                    {
                        key: '1',
                        label: 'Expand Report',
                        children: (
                            <Row gutter={[10, 10]}>
                                {convertedData?.length ? (
                                    <>
                                        {convertedData?.map((x) => (
                                            <Col key={x.title}>
                                                <StockByCategoryTable
                                                    title={x.title}
                                                    data={x.items}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                ) : null}
                            </Row>
                        ),
                        style: {
                            borderRadius: '5px',
                            border: 'none',
                        },
                    },
                ]}
            />
        </div>
    );
}

export default OutletSummaryItem;
