import { Button, Col, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetMaterialQuery } from '../../redux/features/materialManagement/materialManagementApi';

import AddNewMaterial from './AddNewMaterial';
import ViewMaterialTable from './ViewMaterialTable';

function MaterialViewAndAdd() {
    const [category, setCategory] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch, isFetching } = useGetMaterialQuery({
        page,
        limit: 10,
        category,
        name: materialName,
    });

    // add new material modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchData = () => {
        refetch();
    };

    return (
        <>
            <HelmetHeader title="View & Add Material" />

            <AddNewMaterial isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div style={{ margin: '10px 0' }}>
                <Row gutter={[10, 10]}>
                    <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                        <Select
                            placeholder="Category"
                            size="large"
                            style={{
                                width: '100%',
                            }}
                            onChange={(v) => setCategory(v)}
                            options={[
                                {
                                    label: 'Countable',
                                    value: 'countable',
                                },
                                {
                                    label: 'Toolkit',
                                    value: 'toolkit',
                                },
                            ]}
                        />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                        <Input
                            value={materialName}
                            placeholder="Material Name"
                            size="large"
                            style={{ width: '100%' }}
                            onChange={(e) => setMaterialName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Space>
                            <Button
                                disabled={isLoading || isFetching}
                                loading={isLoading || isFetching}
                                onClick={() => searchData()}
                                size="large"
                            >
                                Search
                            </Button>
                            {/* <Button size="large" onClick={() => setIsModalOpen((prev) => !prev)}>
                                ADD NEW MATERIAL
                            </Button> */}
                        </Space>
                    </Col>
                </Row>
            </div>
            <ViewMaterialTable data={data} getLoading={isLoading || isFetching} setPage={setPage} />
        </>
    );
}

export default MaterialViewAndAdd;
