import { Table } from 'antd';

import TableSkeleton from '../../components/ui/TableSkeleton';

// render custom table tag
function renderTableVal(val, subitem, code) {
    return (
        <span style={{ padding: 0, margin: 0 }}>
            {val}
            {subitem ? <span style={{ display: 'block', fontSize: '11px' }}>{code}</span> : null}
        </span>
    );
}

const columns = [
    {
        title: 'Town',
        dataIndex: 'town',
        key: 'town',
        width: 100,
        fixed: 'left',
        render: (v, rec) => renderTableVal(v, true, rec.townCode),
    },
    {
        title: 'Outlet Name',
        dataIndex: 'outletName',
        key: 'outletName',
        width: 200,
        fixed: 'left',
        render: (v, rec) => renderTableVal(v, true, rec.outletCode),
    },
    {
        title: 'Completed Visit',
        dataIndex: 'completedVisit',
        key: 'completedVisit',
        width: 80,
        fixed: 'left',
    },
    {
        title: 'Compliance Status',
        dataIndex: 'complianceStatus',
        key: 'complianceStatus',
        width: 80,
        fixed: 'left',
    },
    {
        title: 'Compliance',
        children: [
            {
                title: 'Visit-1',
                children: [
                    {
                        title: 'O.C',
                        dataIndex: 'complianceVisit1OC',
                        key: 'complianceVisit1OC',
                        width: 60,
                    },
                    {
                        title: 'V.C',
                        dataIndex: 'complianceVisit1VC',
                        key: 'complianceVisit1VC',
                        width: 60,
                    },
                    {
                        title: 'Shelf Talker',
                        dataIndex: 'complianceVisit1ShelfTalker',
                        key: 'complianceVisit1ShelfTalker',
                        width: 60,
                    },
                ],
            },
            {
                title: 'Visit-2',
                children: [
                    {
                        title: 'O.C',
                        dataIndex: 'complianceVisit2OC',
                        key: 'complianceVisit2OC',
                        width: 60,
                    },
                    {
                        title: 'V.C',
                        dataIndex: 'complianceVisit2VC',
                        key: 'complianceVisit2VC',
                        width: 60,
                    },
                    {
                        title: 'Shelf Talker',
                        dataIndex: 'complianceVisit2ShelfTalker',
                        key: 'complianceVisit2ShelfTalker',
                        width: 60,
                    },
                ],
            },
            {
                title: 'Visit-3',
                children: [
                    {
                        title: 'O.C',
                        dataIndex: 'complianceVisit3OC',
                        key: 'complianceVisit3OC',
                        width: 60,
                    },
                    {
                        title: 'V.C',
                        dataIndex: 'complianceVisit3VC',
                        key: 'complianceVisit3VC',
                        width: 60,
                    },
                    {
                        title: 'Shelf Talker',
                        dataIndex: 'complianceVisit3ShelfTalker',
                        key: 'complianceVisit3ShelfTalker',
                        width: 60,
                    },
                ],
            },
            {
                title: 'Visit-4',
                children: [
                    {
                        title: 'O.C',
                        dataIndex: 'complianceVisit4OC',
                        key: 'complianceVisit4OC',
                        width: 60,
                    },
                    {
                        title: 'V.C',
                        dataIndex: 'complianceVisit4VC',
                        key: 'complianceVisit4VC',
                        width: 60,
                    },
                    {
                        title: 'Shelf Talker',
                        dataIndex: 'complianceVisit4ShelfTalker',
                        key: 'complianceVisit4ShelfTalker',
                        width: 60,
                    },
                ],
            },
            {
                title: 'Visit-5',
                children: [
                    {
                        title: 'O.C',
                        dataIndex: 'complianceVisit5OC',
                        key: 'complianceVisit5OC',
                        width: 60,
                    },
                    {
                        title: 'V.C',
                        dataIndex: 'complianceVisit5VC',
                        key: 'complianceVisit5VC',
                        width: 60,
                    },
                    {
                        title: 'Shelf Talker',
                        dataIndex: 'complianceVisit5ShelfTalker',
                        key: 'complianceVisit5ShelfTalker',
                        width: 60,
                    },
                ],
            },
        ],
    },
    {
        title: 'Visited By',
        children: [
            {
                title: 'Visit-1',
                children: [
                    {
                        title: 'FF Name',
                        dataIndex: 'visit1User',
                        key: 'visit1User',
                        width: 60,
                        render: (v, rec) => renderTableVal(v, true, rec.visit1UserCode),
                    },
                ],
            },
            {
                title: 'Visit-2',
                children: [
                    {
                        title: 'FF Name',
                        dataIndex: 'visit2User',
                        key: 'visit2User',
                        width: 60,
                        render: (v, rec) => renderTableVal(v, true, rec.visit2UserCode),
                    },
                ],
            },
            {
                title: 'Visit-3',
                children: [
                    {
                        title: 'FF Name',
                        dataIndex: 'visit3User',
                        key: 'visit3User',
                        width: 60,
                        render: (v, rec) => renderTableVal(v, true, rec.visit3UserCode),
                    },
                ],
            },
            {
                title: 'Visit-4',
                children: [
                    {
                        title: 'FF Name',
                        dataIndex: 'visit4User',
                        key: 'visit4User',
                        width: 60,
                        render: (v, rec) => renderTableVal(v, true, rec.visit4UserCode),
                    },
                ],
            },
            {
                title: 'Visit-5',
                children: [
                    {
                        title: 'FF Name',
                        dataIndex: 'visit5User',
                        key: 'visit5User',
                        width: 60,
                        render: (v, rec) => renderTableVal(v, true, rec.visit5UserCode),
                    },
                ],
            },
        ],
    },
];
const obj = {
    0: 'region',
    1: 'area',
    2: 'territory',
    3: 'town',
    4: 'townCode',
    5: 'outletName',
    6: 'outletCode',
    7: 'slab',
    8: 'channel',
    9: 'completedVisit',
    10: 'complianceStatus',
    11: 'complianceVisit1OC',
    12: 'complianceVisit1VC',
    13: 'complianceVisit1ShelfTalker',
    14: 'complianceVisit2OC',
    15: 'complianceVisit2VC',
    16: 'complianceVisit2ShelfTalker',
    17: 'complianceVisit3OC',
    18: 'complianceVisit3VC',
    19: 'complianceVisit3ShelfTalker',
    20: 'complianceVisit4OC',
    21: 'complianceVisit4VC',
    22: 'complianceVisit4ShelfTalker',
    23: 'complianceVisit5OC',
    24: 'complianceVisit5VC',
    25: 'complianceVisit5ShelfTalker',
    26: 'visit1User',
    27: 'visit1UserCode',
    28: 'visit2User',
    29: 'visit2UserCode',
    30: 'visit3User',
    31: 'visit3UserCode',
    32: 'visit4User',
    33: 'visit4UserCode',
    34: 'visit5User',
    35: 'visit5UserCode',
};

export default function ReportTableQpds({ data, loading }) {
    const finalData = data?.map((x) => x.reduce((acc, c, i) => ({ ...acc, [obj[i]]: c }), {}));
    return (
        <div style={{ borderRadius: '10px' }}>
            <div className="box-heading">QPDS</div>

            <div style={{ padding: '10px', width: '100%' }}>
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={finalData}
                        bordered
                        size="small"
                        scroll={{
                            x: 'calc(1200px + 50%)',
                        }}
                    />
                )}
            </div>
        </div>
    );
}
