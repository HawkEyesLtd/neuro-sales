import { Col, Row, Table } from 'antd';

import formatAccuracy from '../util/formatAccuracy';

function CategoryShelfAIResult({ data = [] }) {
    const columns = [
        {
            title: 'SKUs Name',
            dataIndex: 'name',
            key: 'name',
            render: (arr, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.name}
                    </span>
                ),
            }),
        },
        {
            title: 'Planned Qty',
            dataIndex: 'plannedQty',
            key: 'plannedQty',
            align: 'center',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.plannedQty}
                    </span>
                ),
            }),
        },
        {
            title: 'Visible Qty.',
            dataIndex: 'detectedQty',
            key: 'detectedQty',
            align: 'center',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {val.detectedQty}
                    </span>
                ),
            }),
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            align: 'center',
            render: (_, val, idx) => ({
                props: {
                    style:
                        idx !== val.arrLen - 2
                            ? {
                                  border: 'none',
                                  padding: '2px 8px',
                                  fontSize: '12px',
                              }
                            : { padding: '2px 8px', fontSize: '12px' },
                },
                children: (
                    <span
                        style={
                            val.name === 'Total'
                                ? { fontWeight: 600, border: 'none', fontSize: '12px' }
                                : { fontSize: '12px' }
                        }
                    >
                        {formatAccuracy(val?.accuracy, null, 2)}
                    </span>
                ),
            }),
        },
    ];

    return (
        <div className="ai-table-containe">
            {data?.map(({ planogram }, i) => (
                <Row gutter={[5, 5]} key={Math.random() * 10 + 1 + i}>
                    {planogram?.map(
                        (
                            {
                                name,
                                sku,
                                totalPlannedQty,
                                totalDetectedQty,
                                exclusivity,
                                planogramAdherence = '',
                                passed,
                                variantWiseCompliance,
                                compliance,
                                slab: slabName,
                                challengeRemarks,
                            },
                            index
                        ) => {
                            const aiData =
                                sku?.length > 0
                                    ? sku
                                          ?.map((skus) => ({
                                              ...skus,
                                              arrLen: Number(sku.length + 1 || 0),
                                          }))
                                          .concat({
                                              name: 'Total',
                                              plannedQty: totalPlannedQty,
                                              detectedQty: totalDetectedQty,
                                          })
                                    : [];

                            return (
                                <Col key={sku[index]?.name}>
                                    <div className="bg-[#F6F3F8] border-2 border-gray-300 rounded-lg p-2">
                                        <h3 className="text-lg">
                                            <strong className="font-semibold">
                                                Display Name:{' '}
                                            </strong>
                                            {name} {slabName ? `(${slabName})` : null}
                                        </h3>

                                        <Row
                                            gutter={[10]}
                                            wrap
                                            style={{
                                                fontSize: '16px',
                                                lineHeight: '15px',
                                            }}
                                        >
                                            <Col lg={12} md={24} sm={24}>
                                                <h4>
                                                    <strong className="font-semibold">
                                                        Challenge Remarks:{' '}
                                                    </strong>
                                                    {challengeRemarks}
                                                </h4>
                                                <h4>
                                                    <strong className="font-semibold">
                                                        Overall Compliance:{' '}
                                                    </strong>
                                                    {compliance + '%'}
                                                </h4>
                                                <h4>
                                                    <strong className="font-semibold">
                                                        Variant Wise Compliance:{' '}
                                                    </strong>
                                                    {variantWiseCompliance + '%'}
                                                </h4>
                                            </Col>
                                            <Col lg={12} md={24} sm={24} className="pb-2">
                                                <h4>
                                                    <strong className="font-semibold ">
                                                        Status:{' '}
                                                    </strong>
                                                    {passed ? (
                                                        <span className="text-green-500">
                                                            Passed
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500">Failed</span>
                                                    )}
                                                </h4>
                                                <h4>
                                                    <strong className="font-semibold">
                                                        Planogram Adherence:{' '}
                                                    </strong>
                                                    <span
                                                        style={{
                                                            color:
                                                                planogramAdherence === 'Yes' ||
                                                                planogramAdherence === 'No'
                                                                    ? 'green'
                                                                    : undefined,
                                                        }}
                                                    >
                                                        {planogramAdherence}
                                                    </span>
                                                </h4>
                                                <h4>
                                                    <strong className="font-semibold">
                                                        Exclusivity:{' '}
                                                    </strong>
                                                    {exclusivity}
                                                </h4>
                                            </Col>
                                        </Row>

                                        <div>
                                            <Table
                                                size="small"
                                                columns={columns}
                                                dataSource={aiData || []}
                                                pagination={false}
                                                key={Math.random() * 10 + 1}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            );
                        }
                    )}
                </Row>
            ))}
        </div>
    );
}

export default CategoryShelfAIResult;
