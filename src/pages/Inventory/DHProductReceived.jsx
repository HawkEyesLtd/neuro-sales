import { Button, Card, Input, Table, Typography } from 'antd';
import { useState } from 'react';

import InventoryFilter from './components/InventoryFilter';

const { Title } = Typography;

export default function DHProductReceived() {
    const [loading, setLoading] = useState(false);

    // Mock data for the table
    const data = [
        {
            key: '1',
            skuName: 'Meril Vitamin C Soap Bar- Tangerine Orange',
            size: '100gm',
            brand: 'Meril',
            batchNo: '001',
            unitPrice: 63,
            receiveQty: '',
        },
        {
            key: '2',
            skuName: 'Meril Vitamin C Soap Bar- Tangerine Orange',
            size: '150gm',
            brand: 'Meril',
            batchNo: '001',
            unitPrice: 75,
            receiveQty: '',
        },
        {
            key: '3',
            skuName: 'Meril Vitamin C Soap Bar- Lemon & Lime',
            size: '100gm',
            brand: 'Meril',
            batchNo: '001',
            unitPrice: 60,
            receiveQty: '',
        },
        {
            key: '4',
            skuName: 'Meril Vitamin C Soap Bar- Lemon & Lime',
            size: '150gm',
            brand: 'Meril',
            batchNo: '003',
            unitPrice: 52,
            receiveQty: '',
        },
        {
            key: '5',
            skuName: 'Meril Vitamin C Soap Bar- Lemon & Lime',
            size: '75gm',
            brand: 'Meril',
            batchNo: '001',
            unitPrice: 20,
            receiveQty: '',
        },
        {
            key: '6',
            skuName: 'Baby Soap',
            size: '75 gm',
            brand: 'Meril Baby',
            batchNo: '001',
            unitPrice: 85,
            receiveQty: '',
        },
        {
            key: '7',
            skuName: 'Milk Soap',
            size: '150 gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '001',
            unitPrice: 52,
            receiveQty: '',
        },
        {
            key: '8',
            skuName: 'Milk Soap',
            size: '100 gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '003',
            unitPrice: 50,
            receiveQty: '',
        },
        {
            key: '9',
            skuName: 'Milk Soap',
            size: '75 gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '001',
            unitPrice: 46,
            receiveQty: '',
        },
        {
            key: '10',
            skuName: 'Milk Soap',
            size: '25 gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '001',
            unitPrice: 75,
            receiveQty: '',
        },
        {
            key: '11',
            skuName: 'Milk & Rose',
            size: '150gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '001',
            unitPrice: 80,
            receiveQty: '',
        },
        {
            key: '12',
            skuName: 'Milk & Rose',
            size: '100gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '003',
            unitPrice: 60,
            receiveQty: '',
        },
        {
            key: '13',
            skuName: 'Milk & Beli Soap',
            size: '100 gm',
            brand: 'Meril Milk Soap Bar',
            batchNo: '001',
            unitPrice: 37,
            receiveQty: '',
        },
    ];

    const columns = [
        {
            title: 'SKU Name',
            dataIndex: 'skuName',
            key: 'skuName',
            width: 300,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: 80,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            width: 150,
        },
        {
            title: 'Batch No',
            dataIndex: 'batchNo',
            key: 'batchNo',
            width: 80,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 100,
            render: (price) => <span>{price}</span>,
        },
        {
            title: 'Receive Qty',
            dataIndex: 'receiveQty',
            key: 'receiveQty',
            width: 120,
            render: (_, record) => (
                <Input
                    placeholder="Receive Qty"
                    size="small"
                    style={{ width: '100%' }}
                    onChange={(e) => handleQuantityChange(record.key, e.target.value)}
                />
            ),
        },
    ];

    const handleFilter = (_filters) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleAddSKU = () => {
        // Handle add SKU functionality
    };

    const handleQuantityChange = (_key, _value) => {
        // Handle quantity change
    };

    const handleReceive = () => {
        // Handle receive functionality
    };

    return (
        <div>
            <div className="mb-6">
                <Title level={3} className="mb-4">
                    DH Product Receive
                </Title>
            </div>

            <InventoryFilter
                onFilter={handleFilter}
                loading={loading}
                showAddButton={true}
                onAddClick={handleAddSKU}
                addButtonText="Add SKU"
                showSearch={false}
                showStatus={false}
                showDateRange={true}
            />

            <Card className="shadow-sm">
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={false}
                    scroll={{ x: 1000, y: 400 }}
                    size="small"
                />

                <div className="mt-4 text-center">
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleReceive}
                        className="px-12"
                        style={{ backgroundColor: '#4096ff', borderColor: '#4096ff' }}
                    >
                        Receive
                    </Button>
                </div>
            </Card>
        </div>
    );
}
