import { Table, Typography } from 'antd';
import { useState } from 'react';

import InventoryFilter from './components/InventoryFilter';

const { Title } = Typography;

export default function DHCreditLifting() {
    const [loading, setLoading] = useState(false);

    // Mock data for DH Credit Lifting Status matching the screenshot
    const data = [
        {
            key: 'RAJ-39-09705',
            outletCode: 'RAJ-39-09705',
            outletName: 'Fraim Store',
            creditTaken: 10000,
            orderQty: 2000,
            remainCredit: 8000,
        },
        {
            key: 'RAJ-39-5631',
            outletCode: 'RAJ-39-5631',
            outletName: 'Uzzal Store',
            creditTaken: 12000,
            orderQty: 3500,
            remainCredit: 8500,
        },
        {
            key: 'RAJ-39-18149',
            outletCode: 'RAJ-39-18149',
            outletName: 'Sohidul Store',
            creditTaken: 8000,
            orderQty: 2200,
            remainCredit: 5800,
        },
        {
            key: 'RAJ-39-18154',
            outletCode: 'RAJ-39-18154',
            outletName: 'Uzzal Store',
            creditTaken: 15000,
            orderQty: 5000,
            remainCredit: 10000,
        },
        {
            key: 'RAJ-39-09697',
            outletCode: 'RAJ-39-09697',
            outletName: 'Rubel Store',
            creditTaken: 7500,
            orderQty: 1500,
            remainCredit: 6000,
        },
        {
            key: 'RAJ-39-18201',
            outletCode: 'RAJ-39-18201',
            outletName: 'Zamal Store',
            creditTaken: 18000,
            orderQty: 6500,
            remainCredit: 11500,
        },
        {
            key: 'RAJ-39-20865',
            outletCode: 'RAJ-39-20865',
            outletName: 'Nirob Store',
            creditTaken: 9000,
            orderQty: 4100,
            remainCredit: 4900,
        },
        {
            key: 'RAJ-39-06510',
            outletCode: 'RAJ-39-06510',
            outletName: 'Anonna Store',
            creditTaken: 11500,
            orderQty: 3000,
            remainCredit: 8500,
        },
        {
            key: 'RAJ-39-15800',
            outletCode: 'RAJ-39-15800',
            outletName: 'Alamin Pan Vandar',
            creditTaken: 5000,
            orderQty: 1800,
            remainCredit: 3200,
        },
        {
            key: 'RAJ-39-20968',
            outletCode: 'RAJ-39-20968',
            outletName: 'Rufsan Store',
            creditTaken: 13000,
            orderQty: 7200,
            remainCredit: 5800,
        },
        {
            key: 'RAJ-39-07503',
            outletCode: 'RAJ-39-07503',
            outletName: 'Rasel Store',
            creditTaken: 10500,
            orderQty: 2500,
            remainCredit: 8000,
        },
        {
            key: 'RAJ-78-28758',
            outletCode: 'RAJ-78-28758',
            outletName: 'Achiya Store',
            creditTaken: 16000,
            orderQty: 8000,
            remainCredit: 8000,
        },
        {
            key: 'RAJ-39-07553',
            outletCode: 'RAJ-39-07553',
            outletName: 'Mukter Store',
            creditTaken: 8500,
            orderQty: 3300,
            remainCredit: 5200,
        },
        {
            key: 'RAJ-39-07648',
            outletCode: 'RAJ-39-07648',
            outletName: 'Akhil Store',
            creditTaken: 14000,
            orderQty: 4000,
            remainCredit: 10000,
        },
        {
            key: 'RAJ-39-07657',
            outletCode: 'RAJ-39-07657',
            outletName: 'Ronjon Anjon Store',
            creditTaken: 12500,
            orderQty: 5500,
            remainCredit: 7000,
        },
        {
            key: 'RAJ-78-28780',
            outletCode: 'RAJ-78-28780',
            outletName: 'Ma Babar Doya Store',
            creditTaken: 20000,
            orderQty: 9500,
            remainCredit: 10500,
        },
        {
            key: 'RAJ-39-07645',
            outletCode: 'RAJ-39-07645',
            outletName: 'Proshanto Store',
            creditTaken: 6650,
            orderQty: 2800,
            remainCredit: 3200,
        },
        {
            key: 'RAJ-78-28781',
            outletCode: 'RAJ-78-28781',
            outletName: 'Ripun Store',
            creditTaken: 17000,
            orderQty: 7050,
            remainCredit: 10000,
        },
        {
            key: 'RAJ-39-07665',
            outletCode: 'RAJ-39-07665',
            outletName: 'Molla Store',
            creditTaken: 9500,
            orderQty: 4500,
            remainCredit: 5000,
        },
    ];

    const columns = [
        {
            title: 'Outlet Code',
            dataIndex: 'outletCode',
            key: 'outletCode',
            width: 150,
        },
        {
            title: 'Outlet Name',
            dataIndex: 'outletName',
            key: 'outletName',
            width: 200,
        },
        {
            title: 'Credit Taken',
            dataIndex: 'creditTaken',
            key: 'creditTaken',
            width: 120,
            render: (value) => value?.toLocaleString(),
        },
        {
            title: 'Order Qty',
            dataIndex: 'orderQty',
            key: 'orderQty',
            width: 120,
            render: (value) => value?.toLocaleString(),
        },
        {
            title: 'Remain Credit',
            dataIndex: 'remainCredit',
            key: 'remainCredit',
            width: 120,
            render: (value) => value?.toLocaleString(),
        },
    ];

    const handleFilter = (_filters) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <Title level={3} className="mb-4">
                    DH Credit Lifting Status
                </Title>
            </div>

            <InventoryFilter
                onFilter={handleFilter}
                loading={loading}
                showAddButton={false}
                showSearch={true}
                showStatus={false}
                showDateRange={true}
            />

            <div className="bg-white rounded-lg shadow-sm">
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{
                        current: 1,
                        pageSize: 20,
                        total: data.length,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                    scroll={{ x: 800 }}
                    size="small"
                />
            </div>
        </div>
    );
}
