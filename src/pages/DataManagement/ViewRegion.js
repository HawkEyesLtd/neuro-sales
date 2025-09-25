import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetRegionListQuery } from '../../redux/features/dataManagement/dataManagementApi';

function ViewRegion() {
    const { data, isLoading } = useGetRegionListQuery();
    // search highligh
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="View Cluster" />

            <div style={{ marginTop: '10px' }}>
                <div>
                    <div className="box-heading">Cluster List</div>

                    <Table
                        loading={isLoading}
                        rowKey="_id"
                        pagination={{
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        size="small"
                        scroll={{ x: 800 }}
                        dataSource={data?.data?.data?.map((x, i) => ({ ...x }))}
                    >
                        <Column
                            sorter={(a, b) => a.regionId - b.regionId}
                            title="Cluster ID"
                            dataIndex="regionId"
                            key="regionId"
                        />
                        <Column
                            {...getColumnSearchProps('name')}
                            title="Cluster"
                            dataIndex="name"
                            key="name"
                        />
                        <Column
                            title="Action"
                            key="action"
                            align="right"
                            render={(_, record) => (
                                <Space size={2}>
                                    {/* <Button
                            size="small"
                            icon={<EditOutlined />}
                            type="primary"
                            danger
                            shape="circle"
                        /> */}
                                    <Button
                                        size="small"
                                        icon={<DeleteOutlined />}
                                        type="primary"
                                        danger
                                        shape="circle"
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </>
    );
}

export default ViewRegion;
