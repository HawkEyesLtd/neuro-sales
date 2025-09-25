import { Table } from 'antd';

import { sosColumns } from './TableColumns';

function SOSSection({ item }) {
    return (
        <div key={item.name}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>{item.name}</p>
            {item?.box?.map((box) => (
                <div key={box.category}>
                    <p style={{ margin: '10px 0 0 0', fontWeight: 500, fontSize: '14px' }}>
                        Category Name: {box.category}
                    </p>
                    <Table
                        size="small"
                        columns={sosColumns}
                        dataSource={box.sku || []}
                        pagination={false}
                    />
                </div>
            ))}
        </div>
    );
}

export default SOSSection;
