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

// All available display items
const allDisplayItems = [
    { name: 'GAL', key: 'gal' },
    { name: 'PONDS', key: 'ponds' },
    { name: 'Hair Care', key: 'hairCare' },
    { name: 'Nutrition', key: 'nutrition' },
    // { name: 'LB LIQUID QPDS', key: 'lbLiquidQpds' },
    { name: 'LUX BODYWASH QPDS', key: 'surfExcel' },
    { name: 'VIM LIQUID DISPLAY', key: 'vimLiquid' },
    // { name: 'SURF EXCEL DISPLAY', key: 'surfExcel' },
    // { name: 'LUX BODYWASH QPDS', key: 'surfExcel' },
    { name: 'ORAL CARE QPDS', key: 'oralCare' },
];

// 'LB LIQUID QPDS',
// 'LUX BODYWASH QPDS',
const generateDynamicObj = (selectedItems) => {
    // Fixed columns (0-10)
    const fixedColumns = [
        'region',
        'area',
        'territory',
        'town',
        'townCode',
        'outletName',
        'outletCode',
        'slab',
        'channel',
        'scheduledVisit',
        'completedVisit', // fixed 0-10 array items for first 4 columns
    ];

    const dynamicObj = {};
    let indexCounter = 0;

    // Add fixed columns (0-10)
    fixedColumns.forEach((column) => {
        dynamicObj[indexCounter] = column;
        indexCounter++;
    });

    // Add status columns for each selected display item
    selectedItems.forEach((item) => {
        dynamicObj[indexCounter] = `${item.key}Status`;
        indexCounter++;
    });

    // For each selected display item visit, add 30 columns (5 visits × 6 fields per visit)
    const visitFields = [
        'OC',
        'VC',
        'ShelfTalker',
        'MaintainHotspot',
        'Exclusivity',
        'PlanogramAdherence',
    ];

    selectedItems.forEach((item) => {
        for (let visitNum = 1; visitNum <= 5; visitNum++) {
            visitFields.forEach((field) => {
                const fieldKey = `${item.key}Visit${visitNum}${field}`;
                dynamicObj[indexCounter] = fieldKey;
                indexCounter++;
            });
        }
    });

    // Add the fixed challenge columns at the end (3 columns per visit × 5 visits = 15 columns)
    for (let visitNum = 1; visitNum <= 5; visitNum++) {
        dynamicObj[indexCounter++] = `visit${visitNum}Challenge`;
        dynamicObj[indexCounter++] = `statusChangeAfterReauditVisit${visitNum}`;
        dynamicObj[indexCounter++] = `remarksVisit${visitNum}`;
    }

    return dynamicObj;
};

const generateDynamicColumns = (selectedItems) => {
    // Base columns (fixed)
    const baseColumns = [
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
            title: 'Schedule Visit',
            dataIndex: 'scheduledVisit',
            key: 'scheduledVisit',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Completed Visit',
            dataIndex: 'completedVisit',
            key: 'completedVisit',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
    ];

    // Status columns for selected items (Passed/Failed)
    const statusColumn = {
        title: 'Compliance Status',
        children: selectedItems.map((item) => ({
            title: item.name,
            dataIndex: `${item.key}Status`,
            key: `${item.key}Status`,
            width: 100,
            align: 'center',
        })),
    };

    // Visit columns for each selected display item (challenges and result)
    const visitColumns = selectedItems.map((item) => ({
        title: `${item.name} Compliance`,
        children: Array.from({ length: 5 }, (_, visitIndex) => ({
            title: `Visit-${visitIndex + 1}`,
            children: [
                {
                    title: 'O.C',
                    dataIndex: `${item.key}Visit${visitIndex + 1}OC`,
                    key: `${item.key}Visit${visitIndex + 1}OC`,
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'V.C',
                    dataIndex: `${item.key}Visit${visitIndex + 1}VC`,
                    key: `${item.key}Visit${visitIndex + 1}VC`,
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'Shelf Talker',
                    dataIndex: `${item.key}Visit${visitIndex + 1}ShelfTalker`,
                    key: `${item.key}Visit${visitIndex + 1}ShelfTalker`,
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'Maintain Hotspot',
                    dataIndex: `${item.key}Visit${visitIndex + 1}MaintainHotspot`,
                    key: `${item.key}Visit${visitIndex + 1}MaintainHotspot`,
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'Exclusivity',
                    dataIndex: `${item.key}Visit${visitIndex + 1}Exclusivity`,
                    key: `${item.key}Visit${visitIndex + 1}Exclusivity`,
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'Planogram Adherence',
                    dataIndex: `${item.key}Visit${visitIndex + 1}PlanogramAdherence`,
                    key: `${item.key}Visit${visitIndex + 1}PlanogramAdherence`,
                    width: 60,
                    align: 'center',
                },
            ],
        })),
    }));

    // Challenge columns (always fixed at the end)
    const challengeColumns = {
        title: 'Challenge',
        children: Array.from({ length: 5 }, (_, visitIndex) => [
            {
                title: `Visit ${visitIndex + 1}`,
                dataIndex: `visit${visitIndex + 1}Challenge`,
                key: `visit${visitIndex + 1}Challenge`,
                width: 100,
            },
            {
                title: 'Status change after reaudit',
                dataIndex: `statusChangeAfterReauditVisit${visitIndex + 1}`,
                key: `statusChangeAfterReauditVisit${visitIndex + 1}`,
                width: 100,
            },
            {
                title: 'Remarks',
                dataIndex: `remarksVisit${visitIndex + 1}`,
                key: `remarksVisit${visitIndex + 1}`,
                width: 100,
            },
        ]).flat(),
    };

    return [...baseColumns, statusColumn, ...visitColumns, challengeColumns];
};

export default function DynamicReportTable({ data, loading, selectedDisplayItems }) {
    const shownItems = selectedDisplayItems.length
        ? selectedDisplayItems
        : [...new Set(allDisplayItems.map((item) => item.name))];

    // Generate dynamic mapping object based on selected display items
    const dynamicObj = generateDynamicObj(
        allDisplayItems?.filter((item) => shownItems?.includes(item.name))
    );

    // Generate dynamic columns based on selected display items
    const columns = generateDynamicColumns(
        allDisplayItems?.filter((item) => shownItems?.includes(item.name))
    );

    // Transform the data using the dynamic mapping
    const finalData = data?.map((row) =>
        row.reduce((acc, cell, i) => ({ ...acc, [dynamicObj[i]]: cell }), {})
    );

    return (
        <div style={{ borderRadius: '10px' }}>
            <div className="box-heading">Interim Report</div>
            <div style={{ padding: '10px', width: '100%' }}>
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <Table
                        sticky
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
