import { Button, Image, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import HelmetHeader from '../../components/HelmetHeader';
import { useGetAiPosmListMutation } from '../../redux/features/AiPosmList/aiPosmListApi';
import { resetPosmAiListFilter } from '../../redux/features/AiPosmList/aiPosmListFilterSlice';

function AiPosmList() {
    const dispatch = useDispatch();
    // filter hook
    const { ownerName, sovCount, ctg } = useSelector((state) => state.aiPosmListFilter);

    const [getAiPosmList, { data, isLoading }] = useGetAiPosmListMutation();
    useEffect(() => {
        getAiPosmList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const headers = [
        { label: 'Owner Name', key: 'company' },
        { label: 'POSM', key: 'name' },
        { label: 'POSM Category', key: 'category' },
        { label: 'AI Report Mode', key: 'isCount' },
        { label: 'SOV Mode', key: 'sovMode' },
    ];
    const doc = data?.data?.map(({ company, name, category, isCount, sovMode }) => ({
        company,
        name,
        category,
        isCount: isCount ? 'Count' : 'Yes/No',
        sovMode: sovMode ? 'Yes' : 'No',
    }));

    function getBodyData(oName, sovC, cat) {
        const bodyData = {};
        if (oName) {
            bodyData.company = oName;
        }
        if (sovC) {
            bodyData.sovMode = sovC;
        }
        if (cat) {
            bodyData.category = cat;
        }
        return bodyData;
    }

    // search posm data
    const searchData = () => {
        getAiPosmList({
            ...getBodyData(ownerName, sovCount, ctg),
        });
    };

    // reset existing filter
    useEffect(() => {
        dispatch(resetPosmAiListFilter());
    }, [dispatch]);

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="AI POSM List" />

            <div style={{ margin: '16px 0' }}>
                <Filter loading={isLoading} queryFunc={searchData} pathname="/aiPosmList" />
            </div>

            <div style={{ textAlign: 'right', padding: '5px' }}>
                <Button>
                    <CSVLink filename="AI-VM-List.csv" data={doc || []} headers={headers}>
                        Download
                    </CSVLink>
                </Button>
            </div>
            <Table
                rowKey="_id"
                loading={isLoading}
                dataSource={data?.data || []}
                scroll={{ x: 800 }}
            >
                <Column title="Owner Name" dataIndex="company" key="company" />
                <Column title="POSM" dataIndex="name" key="name" />
                <Column title="Visible Material Category" dataIndex="category" key="category" />
                <Column
                    title="AI Report Mode"
                    dataIndex="isCount"
                    key="isCount"
                    render={(_, record) => (record.isCount ? 'Count' : 'Yes/No')}
                />
                <Column
                    title="SOV Mode"
                    dataIndex="sovMode"
                    key="sovMode"
                    render={(_, record) => (record.sovMode ? 'Yes' : 'No')}
                />
                <Column
                    title="Sample Picture"
                    dataIndex="samplePicture"
                    key="samplePicture"
                    render={(_, record) => <Image width={80} src={record?.image?.original} />}
                />
            </Table>
        </>
    );
}

export default AiPosmList;
