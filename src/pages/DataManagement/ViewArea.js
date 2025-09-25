import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import HelmetHeader from '../../components/HelmetHeader';
import { useGetTownDataQuery } from '../../redux/features/dataManagement/dataManagementApi';

function ViewArea() {
    const { data, isLoading } = useGetTownDataQuery();

    // Function to remove duplicates based on a specified property
    function removeDuplicates(array, property) {
        return array?.filter(
            (obj, index, self) => index === self.findIndex((o) => o[property] === obj[property])
        );
    }

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
            <HelmetHeader title="View Area" />

            <div style={{ marginTop: '10px' }}>
                <div>
                    <div className="box-heading">Area List</div>
                    <Table
                        loading={isLoading}
                        rowKey="_id"
                        pagination={{
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        size="small"
                        scroll={{ x: 800 }}
                        dataSource={removeDuplicates(data?.data?.data, 'area')?.map((x, i) => ({
                            ...x,
                            areaId: i + 1,
                        }))}
                    >
                        <Column
                            sorter={(a, b) => a.areaId - b.areaId}
                            title="Area ID"
                            dataIndex="areaId"
                            key="areaId"
                        />
                        <Column
                            {...getColumnSearchProps('region')}
                            title="Cluster"
                            dataIndex="region"
                            key="region"
                        />
                        <Column
                            {...getColumnSearchProps('area')}
                            title="Area"
                            dataIndex="area"
                            key="area"
                        />
                        <Column
                            title="Action"
                            key="action"
                            align="right"
                            render={(_, record) => (
                                <Space size={2}>
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

export default ViewArea;
