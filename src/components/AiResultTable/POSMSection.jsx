import { Table } from 'antd';

import { posmColumns } from './TableColumns';

function POSMSection({ item }) {
    return (
        <div key={item.name}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>{item.name}</p>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
                AI Accuracy: {item?.accuracy?.toFixed(2) || 0}%
            </p>
            <Table
                rowKey="name"
                size="small"
                columns={posmColumns}
                dataSource={
                    item.material
                        ?.map((x) => ({ ...x }))
                        .concat({
                            name: 'Total',
                            qty: item.totalUsedQty || 0,
                            detectedQty: item.totalDetectedQty || 0,
                            accuracy: Math.round(item.accuracy || 0),
                        }) || []
                }
                pagination={false}
            />
        </div>
    );
}

export default POSMSection;
