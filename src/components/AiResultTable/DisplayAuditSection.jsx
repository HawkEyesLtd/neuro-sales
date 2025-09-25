import { Col, Row, Table } from 'antd';

import { mainColumns } from './TableColumns';

function SKUTable({ sku }) {
    const aiData = sku?.sku
        ?.map((skus) => ({
            ...skus,
            arrLen: Number(sku.sku.length + 1 || 0),
        }))
        .concat({
            name: 'Total',
            plannedQty: sku.totalPlannedQty,
            detectedQty: sku.totalDetectedQty,
        });

    return (
        <Col sm={24} md={12} lg={8} key={sku.name}>
            <p style={{ margin: '10px 0 0 0', fontWeight: 500, fontSize: '14px' }}>
                {sku.name} Overall compliance: {sku?.compliance?.toFixed(2) || 0}%
            </p>
            <p style={{ margin: '10px 0 0 0', fontWeight: 500, fontSize: '14px' }}>
                {sku.name} Variant Wise Compliance: {sku?.variantWiseCompliance?.toFixed(2) || 0}%
            </p>
            <Table
                size="small"
                columns={mainColumns}
                dataSource={aiData || []}
                pagination={false}
            />
        </Col>
    );
}

function DisplayAuditSection({ item }) {
    return (
        <div style={{ marginTop: '10px' }} key={item.name}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>
                {item.name === 'DA' ? 'Display Audit' : item.name}
            </p>
            <Row gutter={[10, 10]}>
                {item?.planogram?.map((sku) => (
                    <SKUTable key={sku.name} sku={sku} />
                ))}
            </Row>
        </div>
    );
}

export default DisplayAuditSection;
