// import { Table } from 'antd';

// import TableSkeleton from '../../ui/TableSkeleton';

// // render custom table tag
// function renderTableVal(val, subitem, code) {
//     return (
//         <span style={{ padding: 0, margin: 0 }}>
//             {val}
//             {subitem ? <span style={{ display: 'block', fontSize: '11px' }}>{code}</span> : null}
//         </span>
//     );
// }

// // Compliance = display
// // All available display items
// const allDisplay = [
//     { name: 'PONDS', key: 'ponds' },
//     { name: 'GAL', key: 'gal' },
//     { name: 'Hair Care', key: 'hairCare' },
//     { name: 'Nutrition', key: 'nutrition' },
//     { name: 'Nutrition Store Lite', key: 'nutritionStoreLite' },
//     { name: 'VIM LIQUID DISPLAY', key: 'vimLiquid' },
//     { name: 'SURF EXCEL DISPLAY', key: 'surfExcel' },
// ];

// // Selected display items - this can be changed based on user selection
// const selectedDisplays = [
//     { name: 'Face Wash', key: 'faceWash' },
//     { name: 'PONDS', key: 'ponds' },
//     { name: 'VIM LIQUID DISPLAY', key: 'vimLiquid' },
// ];

// // Function to generate dynamic column and data mapping
// const generateDynamicConfig = (selectedItems) => {
//     // Fixed columns at the beginning (0-10)
//     const fixedColumnNames = [
//         'region',
//         'area',
//         'territory',
//         'town',
//         'townCode',
//         'outletName',
//         'outletCode',
//         'slab',
//         'channel',
//         'scheduledVisit',
//         'completedVisit',
//     ];

//     const dynamicObj = {};
//     const dynamicColumns = [];
//     let columnIndex = 0;

//     // Add fixed columns (0-10)
//     fixedColumnNames.forEach((name) => {
//         dynamicObj[columnIndex] = name;
//         columnIndex++;
//     });

//     // Add status columns for selected display items
//     selectedItems.forEach((item) => {
//         const statusKey = `${item.key}Status`;
//         dynamicObj[columnIndex] = statusKey;
//         columnIndex++;
//     });

//     // For each selected display item, add 30 columns (5 visits × 6 fields per visit)
//     const visitFieldNames = [
//         'OC',
//         'VC',
//         'ShelfTalker',
//         'MaintainHotspot',
//         'Exclusivity',
//         'PlanogramAdherence',
//     ];

//     selectedItems.forEach((item) => {
//         for (let visitNum = 1; visitNum <= 5; visitNum++) {
//             visitFieldNames.forEach((field) => {
//                 const fieldKey = `${item.key}Visit${visitNum}${field}`;
//                 dynamicObj[columnIndex] = fieldKey;
//                 columnIndex++;
//             });
//         }
//     });

//     // Add challenge columns at the end (15 columns = 5 visits × 3 fields per visit)
//     for (let visitNum = 1; visitNum <= 5; visitNum++) {
//         dynamicObj[columnIndex++] = `visit${visitNum}Challenge`;
//         dynamicObj[columnIndex++] = `statusChangeAfterReauditVisit${visitNum}`;
//         dynamicObj[columnIndex++] = `remarksVisit${visitNum}`;
//     }

//     return dynamicObj;
// };

// // Generate base columns that will be fixed at the beginning
// // const generateBaseColumns = () => [
// //     {
// //         title: 'Town',
// //         dataIndex: 'town',
// //         key: 'town',
// //         width: 100,
// //         fixed: 'left',
// //         render: (v, rec) => renderTableVal(v, true, rec.townCode),
// //     },
// //     {
// //         title: 'Outlet Name',
// //         dataIndex: 'outletName',
// //         key: 'outletName',
// //         width: 200,
// //         fixed: 'left',
// //         render: (v, rec) => renderTableVal(v, true, rec.outletCode),
// //     },
// //     {
// //         title: 'Schedule Visit',
// //         dataIndex: 'scheduledVisit',
// //         key: 'scheduledVisit',
// //         width: 80,
// //         fixed: 'left',
// //     },
// //     {
// //         title: 'Completed Visit',
// //         dataIndex: 'completedVisit',
// //         key: 'completedVisit',
// //         width: 80,
// //         fixed: 'left',
// //     },
// //     {
// //         title: 'Compliance Status',
// //         children: [
// //             {
// //                 title: 'Face Cream',
// //                 dataIndex: 'faceCreamStatus',
// //                 key: 'faceCreamStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Face Wash',
// //                 dataIndex: 'faceWashStatus',
// //                 key: 'faceWashStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'PONDS',
// //                 dataIndex: 'pondsStatus',
// //                 key: 'pondsStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'GAL',
// //                 dataIndex: 'galStatus',
// //                 key: 'galStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Hair Care',
// //                 dataIndex: 'hairCareStatus',
// //                 key: 'hairCareStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Nutrition',
// //                 dataIndex: 'nutritionStatus',
// //                 key: 'nutritionStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'VIM LIQUID DISPLAY',
// //                 dataIndex: 'vimLiquidStatus',
// //                 key: 'vimLiquidStatus',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'SURF EXCEL DISPLAY',
// //                 dataIndex: 'surfExcelStatus',
// //                 key: 'surfExcelStatus',
// //                 width: 100,
// //             },
// //         ],
// //     },
// //     {
// //         title: 'Face Cream Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceCreamVisit1OC',
// //                         key: 'faceCreamVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceCreamVisit1VC',
// //                         key: 'faceCreamVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceCreamVisit1ShelfTalker',
// //                         key: 'faceCreamVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceCreamVisit1MaintainHotspot',
// //                         key: 'faceCreamVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceCreamVisit1Exclusivity',
// //                         key: 'faceCreamVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceCreamVisit1PlanogramAdherence',
// //                         key: 'faceCreamVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceCreamVisit2OC',
// //                         key: 'faceCreamVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceCreamVisit2VC',
// //                         key: 'faceCreamVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceCreamVisit2ShelfTalker',
// //                         key: 'faceCreamVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceCreamVisit2MaintainHotspot',
// //                         key: 'faceCreamVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceCreamVisit2Exclusivity',
// //                         key: 'faceCreamVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceCreamVisit2PlanogramAdherence',
// //                         key: 'faceCreamVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceCreamVisit3OC',
// //                         key: 'faceCreamVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceCreamVisit3VC',
// //                         key: 'faceCreamVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceCreamVisit3ShelfTalker',
// //                         key: 'faceCreamVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceCreamVisit3MaintainHotspot',
// //                         key: 'faceCreamVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceCreamVisit3Exclusivity',
// //                         key: 'faceCreamVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceCreamVisit3PlanogramAdherence',
// //                         key: 'faceCreamVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceCreamVisit4OC',
// //                         key: 'faceCreamVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceCreamVisit4VC',
// //                         key: 'faceCreamVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceCreamVisit4ShelfTalker',
// //                         key: 'faceCreamVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceCreamVisit4MaintainHotspot',
// //                         key: 'faceCreamVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceCreamVisit4Exclusivity',
// //                         key: 'faceCreamVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceCreamVisit4PlanogramAdherence',
// //                         key: 'faceCreamVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-5',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceCreamVisit5OC',
// //                         key: 'faceCreamVisit5OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceCreamVisit5VC',
// //                         key: 'faceCreamVisit5VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceCreamVisit5ShelfTalker',
// //                         key: 'faceCreamVisit5ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceCreamVisit5MaintainHotspot',
// //                         key: 'faceCreamVisit5MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceCreamVisit5Exclusivity',
// //                         key: 'faceCreamVisit5Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceCreamVisit5PlanogramAdherence',
// //                         key: 'faceCreamVisit5PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'Face Wash Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceWashVisit1OC',
// //                         key: 'faceWashVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceWashVisit1VC',
// //                         key: 'faceWashVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceWashVisit1ShelfTalker',
// //                         key: 'faceWashVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceWashVisit1MaintainHotspot',
// //                         key: 'faceWashVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceWashVisit1Exclusivity',
// //                         key: 'faceWashVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceWashVisit1PlanogramAdherence',
// //                         key: 'faceWashVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceWashVisit2OC',
// //                         key: 'faceWashVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceWashVisit2VC',
// //                         key: 'faceWashVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceWashVisit2ShelfTalker',
// //                         key: 'faceWashVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceWashVisit2MaintainHotspot',
// //                         key: 'faceWashVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceWashVisit2Exclusivity',
// //                         key: 'faceWashVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceWashVisit2PlanogramAdherence',
// //                         key: 'faceWashVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceWashVisit3OC',
// //                         key: 'faceWashVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceWashVisit3VC',
// //                         key: 'faceWashVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceWashVisit3ShelfTalker',
// //                         key: 'faceWashVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceWashVisit3MaintainHotspot',
// //                         key: 'faceWashVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceWashVisit3Exclusivity',
// //                         key: 'faceWashVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceWashVisit3PlanogramAdherence',
// //                         key: 'faceWashVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'faceWashVisit4OC',
// //                         key: 'faceWashVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'faceWashVisit4VC',
// //                         key: 'faceWashVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'faceWashVisit4ShelfTalker',
// //                         key: 'faceWashVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'faceWashVisit4MaintainHotspot',
// //                         key: 'faceWashVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'faceWashVisit4Exclusivity',
// //                         key: 'faceWashVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'faceWashVisit4PlanogramAdherence',
// //                         key: 'faceWashVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'PONDS Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'pondsVisit1OC',
// //                         key: 'pondsVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'pondsVisit1VC',
// //                         key: 'pondsVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'pondsVisit1ShelfTalker',
// //                         key: 'pondsVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'pondsVisit1MaintainHotspot',
// //                         key: 'pondsVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'pondsVisit1Exclusivity',
// //                         key: 'pondsVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'pondsVisit1PlanogramAdherence',
// //                         key: 'pondsVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'pondsVisit2OC',
// //                         key: 'pondsVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'pondsVisit2VC',
// //                         key: 'pondsVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'pondsVisit2ShelfTalker',
// //                         key: 'pondsVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'pondsVisit2MaintainHotspot',
// //                         key: 'pondsVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'pondsVisit2Exclusivity',
// //                         key: 'pondsVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'pondsVisit2PlanogramAdherence',
// //                         key: 'pondsVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'pondsVisit3OC',
// //                         key: 'pondsVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'pondsVisit3VC',
// //                         key: 'pondsVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'pondsVisit3ShelfTalker',
// //                         key: 'pondsVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'pondsVisit3MaintainHotspot',
// //                         key: 'pondsVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'pondsVisit3Exclusivity',
// //                         key: 'pondsVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'pondsVisit3PlanogramAdherence',
// //                         key: 'pondsVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'pondsVisit4OC',
// //                         key: 'pondsVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'pondsVisit4VC',
// //                         key: 'pondsVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'pondsVisit4ShelfTalker',
// //                         key: 'pondsVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'pondsVisit4MaintainHotspot',
// //                         key: 'pondsVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'pondsVisit4Exclusivity',
// //                         key: 'pondsVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'pondsVisit4PlanogramAdherence',
// //                         key: 'pondsVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'GAL Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'galVisit1OC',
// //                         key: 'galVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'galVisit1VC',
// //                         key: 'galVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'galVisit1ShelfTalker',
// //                         key: 'galVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'galVisit1MaintainHotspot',
// //                         key: 'galVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'galVisit1Exclusivity',
// //                         key: 'galVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'galVisit1PlanogramAdherence',
// //                         key: 'galVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'galVisit2OC',
// //                         key: 'galVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'galVisit2VC',
// //                         key: 'galVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'galVisit2ShelfTalker',
// //                         key: 'galVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'galVisit2MaintainHotspot',
// //                         key: 'galVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'galVisit2Exclusivity',
// //                         key: 'galVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'galVisit2PlanogramAdherence',
// //                         key: 'galVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'galVisit3OC',
// //                         key: 'galVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'galVisit3VC',
// //                         key: 'galVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'galVisit3ShelfTalker',
// //                         key: 'galVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'galVisit3MaintainHotspot',
// //                         key: 'galVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'galVisit3Exclusivity',
// //                         key: 'galVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'galVisit3PlanogramAdherence',
// //                         key: 'galVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'galVisit4OC',
// //                         key: 'galVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'galVisit4VC',
// //                         key: 'galVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'galVisit4ShelfTalker',
// //                         key: 'galVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'galVisit4MaintainHotspot',
// //                         key: 'galVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'galVisit4Exclusivity',
// //                         key: 'galVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'galVisit4PlanogramAdherence',
// //                         key: 'galVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'Hair Care Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'hairCareVisit1OC',
// //                         key: 'hairCareVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'hairCareVisit1VC',
// //                         key: 'hairCareVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'hairCareVisit1ShelfTalker',
// //                         key: 'hairCareVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'hairCareVisit1MaintainHotspot',
// //                         key: 'hairCareVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'hairCareVisit1Exclusivity',
// //                         key: 'hairCareVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'hairCareVisit1PlanogramAdherence',
// //                         key: 'hairCareVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'hairCareVisit2OC',
// //                         key: 'hairCareVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'hairCareVisit2VC',
// //                         key: 'hairCareVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'hairCareVisit2ShelfTalker',
// //                         key: 'hairCareVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'hairCareVisit2MaintainHotspot',
// //                         key: 'hairCareVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'hairCareVisit2Exclusivity',
// //                         key: 'hairCareVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'hairCareVisit2PlanogramAdherence',
// //                         key: 'hairCareVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'hairCareVisit3OC',
// //                         key: 'hairCareVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'hairCareVisit3VC',
// //                         key: 'hairCareVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'hairCareVisit3ShelfTalker',
// //                         key: 'hairCareVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'hairCareVisit3MaintainHotspot',
// //                         key: 'hairCareVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'hairCareVisit3Exclusivity',
// //                         key: 'hairCareVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'hairCareVisit3PlanogramAdherence',
// //                         key: 'hairCareVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'hairCareVisit4OC',
// //                         key: 'hairCareVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'hairCareVisit4VC',
// //                         key: 'hairCareVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'hairCareVisit4ShelfTalker',
// //                         key: 'hairCareVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'hairCareVisit4MaintainHotspot',
// //                         key: 'hairCareVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'hairCareVisit4Exclusivity',
// //                         key: 'hairCareVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'hairCareVisit4PlanogramAdherence',
// //                         key: 'hairCareVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'Nutrition Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'nutritionVisit1OC',
// //                         key: 'nutritionVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'nutritionVisit1VC',
// //                         key: 'nutritionVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'nutritionVisit1ShelfTalker',
// //                         key: 'nutritionVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'nutritionVisit1MaintainHotspot',
// //                         key: 'nutritionVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'nutritionVisit1Exclusivity',
// //                         key: 'nutritionVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'nutritionVisit1PlanogramAdherence',
// //                         key: 'nutritionVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'nutritionVisit2OC',
// //                         key: 'nutritionVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'nutritionVisit2VC',
// //                         key: 'nutritionVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'nutritionVisit2ShelfTalker',
// //                         key: 'nutritionVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'nutritionVisit2MaintainHotspot',
// //                         key: 'nutritionVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'nutritionVisit2Exclusivity',
// //                         key: 'nutritionVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'nutritionVisit2PlanogramAdherence',
// //                         key: 'nutritionVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'nutritionVisit3OC',
// //                         key: 'nutritionVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'nutritionVisit3VC',
// //                         key: 'nutritionVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'nutritionVisit3ShelfTalker',
// //                         key: 'nutritionVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'nutritionVisit3MaintainHotspot',
// //                         key: 'nutritionVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'nutritionVisit3Exclusivity',
// //                         key: 'nutritionVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'nutritionVisit3PlanogramAdherence',
// //                         key: 'nutritionVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'nutritionVisit4OC',
// //                         key: 'nutritionVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'nutritionVisit4VC',
// //                         key: 'nutritionVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'nutritionVisit4ShelfTalker',
// //                         key: 'nutritionVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'nutritionVisit4MaintainHotspot',
// //                         key: 'nutritionVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'nutritionVisit4Exclusivity',
// //                         key: 'nutritionVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'nutritionVisit4PlanogramAdherence',
// //                         key: 'nutritionVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'VIM LIQUID DISPLAY Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'vimVisit1OC',
// //                         key: 'vimVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'vimVisit1VC',
// //                         key: 'vimVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'vimVisit1ShelfTalker',
// //                         key: 'vimVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'vimVisit1MaintainHotspot',
// //                         key: 'vimVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'vimVisit1Exclusivity',
// //                         key: 'vimVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'vimVisit1PlanogramAdherence',
// //                         key: 'vimVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'vimVisit2OC',
// //                         key: 'vimVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'vimVisit2VC',
// //                         key: 'vimVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'vimVisit2ShelfTalker',
// //                         key: 'vimVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'vimVisit2MaintainHotspot',
// //                         key: 'vimVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'vimVisit2Exclusivity',
// //                         key: 'vimVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'vimVisit2PlanogramAdherence',
// //                         key: 'vimVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'vimVisit3OC',
// //                         key: 'vimVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'vimVisit3VC',
// //                         key: 'vimVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'vimVisit3ShelfTalker',
// //                         key: 'vimVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'vimVisit3MaintainHotspot',
// //                         key: 'vimVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'vimVisit3Exclusivity',
// //                         key: 'vimVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'vimVisit3PlanogramAdherence',
// //                         key: 'vimVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'vimVisit4OC',
// //                         key: 'vimVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'vimVisit4VC',
// //                         key: 'vimVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'vimVisit4ShelfTalker',
// //                         key: 'vimVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'vimVisit4MaintainHotspot',
// //                         key: 'vimVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'vimVisit4Exclusivity',
// //                         key: 'vimVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'vimVisit4PlanogramAdherence',
// //                         key: 'vimVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'SURF EXCEL DISPLAY Compliance',
// //         children: [
// //             {
// //                 title: 'Visit-1',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'surfExcelVisit1OC',
// //                         key: 'surfExcelVisit1OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'surfExcelVisit1VC',
// //                         key: 'surfExcelVisit1VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'surfExcelVisit1ShelfTalker',
// //                         key: 'surfExcelVisit1ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'surfExcelVisit1MaintainHotspot',
// //                         key: 'surfExcelVisit1MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'surfExcelVisit1Exclusivity',
// //                         key: 'surfExcelVisit1Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'surfExcelVisit1PlanogramAdherence',
// //                         key: 'surfExcelVisit1PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-2',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'surfExcelVisit2OC',
// //                         key: 'surfExcelVisit2OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'surfExcelVisit2VC',
// //                         key: 'surfExcelVisit2VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'surfExcelVisit2ShelfTalker',
// //                         key: 'surfExcelVisit2ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'surfExcelVisit2MaintainHotspot',
// //                         key: 'surfExcelVisit2MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'surfExcelVisit2Exclusivity',
// //                         key: 'surfExcelVisit2Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'surfExcelVisit2PlanogramAdherence',
// //                         key: 'surfExcelVisit2PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-3',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'surfExcelVisit3OC',
// //                         key: 'surfExcelVisit3OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'surfExcelVisit3VC',
// //                         key: 'surfExcelVisit3VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'surfExcelVisit3ShelfTalker',
// //                         key: 'surfExcelVisit3ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'surfExcelVisit3MaintainHotspot',
// //                         key: 'surfExcelVisit3MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'surfExcelVisit3Exclusivity',
// //                         key: 'surfExcelVisit3Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'surfExcelVisit3PlanogramAdherence',
// //                         key: 'surfExcelVisit3PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //             {
// //                 title: 'Visit-4',
// //                 children: [
// //                     {
// //                         title: 'O.C',
// //                         dataIndex: 'surfExcelVisit4OC',
// //                         key: 'surfExcelVisit4OC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'V.C',
// //                         dataIndex: 'surfExcelVisit4VC',
// //                         key: 'surfExcelVisit4VC',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Shelf Talker',
// //                         dataIndex: 'surfExcelVisit4ShelfTalker',
// //                         key: 'surfExcelVisit4ShelfTalker',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Maintain Hotspot',
// //                         dataIndex: 'surfExcelVisit4MaintainHotspot',
// //                         key: 'surfExcelVisit4MaintainHotspot',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Exclusivity',
// //                         dataIndex: 'surfExcelVisit4Exclusivity',
// //                         key: 'surfExcelVisit4Exclusivity',
// //                         width: 60,
// //                     },
// //                     {
// //                         title: 'Planogram Adherence',
// //                         dataIndex: 'surfExcelVisit4PlanogramAdherence',
// //                         key: 'surfExcelVisit4PlanogramAdherence',
// //                         width: 60,
// //                     },
// //                 ],
// //             },
// //         ],
// //     },
// //     {
// //         title: 'Challenge',
// //         children: [
// //             {
// //                 title: 'Visit 1',
// //                 dataIndex: 'visit1Challenge',
// //                 key: 'visit1Challenge',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Status change after reaudit',
// //                 dataIndex: 'statusChangeAfterReauditVisit1',
// //                 key: 'statusChangeAfterReauditVisit1',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Remarks',
// //                 dataIndex: 'remarksVisit1',
// //                 key: 'remarksVisit1',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Visit 2',
// //                 dataIndex: 'visit2Challenge',
// //                 key: 'visit2Challenge',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Status change after reaudit',
// //                 dataIndex: 'statusChangeAfterReauditVisit2',
// //                 key: 'statusChangeAfterReauditVisit2',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Remarks',
// //                 dataIndex: 'remarksVisit2',
// //                 key: 'remarksVisit2',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Visit 3',
// //                 dataIndex: 'visit3Challenge',
// //                 key: 'visit3Challenge',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Status change after reaudit',
// //                 dataIndex: 'statusChangeAfterReauditVisit3',
// //                 key: 'statusChangeAfterReauditVisit3',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Remarks',
// //                 dataIndex: 'remarksVisit3',
// //                 key: 'remarksVisit3',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Visit 4',
// //                 dataIndex: 'visit4Challenge',
// //                 key: 'visit4Challenge',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Status change after reaudit',
// //                 dataIndex: 'statusChangeAfterReauditVisit4',
// //                 key: 'statusChangeAfterReauditVisit4',
// //                 width: 100,
// //             },
// //             {
// //                 title: 'Remarks',
// //                 dataIndex: 'remarksVisit4',
// //                 key: 'remarksVisit4',
// //                 width: 100,
// //             },
// //         ],
// //     },
// // ];

// // This object will be dynamically generated based on the selected display items
// // The commented code below shows the structure of the old obj for reference
// /*
// const obj = {
//     0: 'region',
//     1: 'area',
//     2: 'territory',
//     3: 'town',
//     4: 'townCode',
//     5: 'outletName',
//     6: 'outletCode',
//     7: 'slab',
//     8: 'channel',
//     9: 'scheduledVisit',
//     10: 'completedVisit', // fixed 0-10
//     11: 'faceCreamStatus', //
//     12: 'faceWashStatus',
//     13: 'pondsStatus',
//     14: 'galStatus',
//     15: 'hairCareStatus',
//     16: 'nutritionStatus',
//     17: 'vimLiquidStatus',
//     18: 'surfExcelStatus', //

//     19: 'faceCreamVisit1OC', // faceCream display item start here
//     20: 'faceCreamVisit1VC',
//     21: 'faceCreamVisit1ShelfTalker',
//     22: 'faceCreamVisit1MaintainHotspot',
//     23: 'faceCreamVisit1Exclusivity',
//     24: 'faceCreamVisit1PlanogramAdherence',
//     25: 'faceCreamVisit2OC',
//     26: 'faceCreamVisit2VC',
//     27: 'faceCreamVisit2ShelfTalker',
//     28: 'faceCreamVisit2MaintainHotspot',
//     29: 'faceCreamVisit2Exclusivity',
//     30: 'faceCreamVisit2PlanogramAdherence',
//     31: 'faceCreamVisit3OC',
//     32: 'faceCreamVisit3VC',
//     33: 'faceCreamVisit3ShelfTalker',
//     34: 'faceCreamVisit3MaintainHotspot',
//     35: 'faceCreamVisit3Exclusivity',
//     36: 'faceCreamVisit3PlanogramAdherence',
//     37: 'faceCreamVisit4OC',
//     38: 'faceCreamVisit4VC',
//     39: 'faceCreamVisit4ShelfTalker',
//     40: 'faceCreamVisit4MaintainHotspot',
//     41: 'faceCreamVisit4Exclusivity',
//     42: 'faceCreamVisit4PlanogramAdherence',
//     // visit 5 will be added here
//     43: 'faceCreamVisit5OC',
//     44: 'faceCreamVisit5VC',
//     45: 'faceCreamVisit5ShelfTalker',
//     46: 'faceCreamVisit5MaintainHotspot',
//     47: 'faceCreamVisit5Exclusivity',
//     48: 'faceCreamVisit5PlanogramAdherence', // faceCream display item end here

//     // faceWash
//     49: 'faceWashVisit1OC', // faceWash display item start here
//     50: 'faceWashVisit1VC',
//     51: 'faceWashVisit1ShelfTalker',
//     52: 'faceWashVisit1MaintainHotspot',
//     53: 'faceWashVisit1Exclusivity',
//     54: 'faceWashVisit1PlanogramAdherence',
//     55: 'faceWashVisit2OC',
//     56: 'faceWashVisit2VC',
//     57: 'faceWashVisit2ShelfTalker',
//     58: 'faceWashVisit2MaintainHotspot',
//     59: 'faceWashVisit2Exclusivity',
//     60: 'faceWashVisit2PlanogramAdherence',
//     61: 'faceWashVisit3OC',
//     62: 'faceWashVisit3VC',
//     63: 'faceWashVisit3ShelfTalker',
//     64: 'faceWashVisit3MaintainHotspot',
//     65: 'faceWashVisit3Exclusivity',
//     66: 'faceWashVisit3PlanogramAdherence',
//     67: 'faceWashVisit4OC',
//     68: 'faceWashVisit4VC',
//     69: 'faceWashVisit4ShelfTalker',
//     70: 'faceWashVisit4MaintainHotspot',
//     71: 'faceWashVisit4Exclusivity',
//     72: 'faceWashVisit4PlanogramAdherence',
//     // now here will be add 5th visit
//     73: 'faceWashVisit5OC',
//     74: 'faceWashVisit5VC',
//     75: 'faceWashVisit5ShelfTalker',
//     76: 'faceWashVisit5MaintainHotspot',
//     77: 'faceWashVisit5Exclusivity',
//     78: 'faceWashVisit5PlanogramAdherence', // faceWash display item end here
//     // visit 5 end
//     79: 'pondsVisit1OC',
//     80: 'pondsVisit1VC',
//     81: 'pondsVisit1ShelfTalker',
//     82: 'pondsVisit1MaintainHotspot',
//     83: 'pondsVisit2Exclusivity',
//     84: 'pondsVisit2PlanogramAdherence',
//     85: 'pondsVisit3OC',
//     86: 'pondsVisit3VC',
//     87: 'pondsVisit3ShelfTalker',
//     88: 'pondsVisit3MaintainHotspot',
//     89: 'pondsVisit3Exclusivity',
//     90: 'pondsVisit3PlanogramAdherence',
//     91: 'pondsVisit4OC',
//     92: 'pondsVisit4VC',
//     93: 'pondsVisit4ShelfTalker',
//     94: 'pondsVisit4MaintainHotspot',
//     95: 'pondsVisit4Exclusivity',
//     96: 'pondsVisit4PlanogramAdherence',
//     97: 'galVisit1OC',
//     98: 'galVisit1VC',
//     99: 'galVisit1ShelfTalker',
//     100: 'galVisit1MaintainHotspot',
//     101: 'galVisit1Exclusivity',
//     102: 'galVisit1PlanogramAdherence',
//     103: 'galVisit2OC',
//     104: 'galVisit2VC',
//     105: 'galVisit2ShelfTalker',
//     106: 'galVisit2MaintainHotspot',
//     107: 'galVisit2Exclusivity',
//     108: 'galVisit2PlanogramAdherence',
//     109: 'galVisit3OC',
//     110: 'galVisit3VC',
//     111: 'galVisit3ShelfTalker',
//     112: 'galVisit4MaintainHotspot',
//     113: 'galVisit4Exclusivity',
//     114: 'galVisit4PlanogramAdherence',
//     115: 'hairCareVisit1OC',
//     116: 'hairCareVisit1VC',
//     117: 'hairCareVisit1ShelfTalker',
//     118: 'hairCareVisit1MaintainHotspot',
//     119: 'hairCareVisit1Exclusivity',
//     120: 'hairCareVisit1PlanogramAdherence',
//     121: 'hairCareVisit2OC',
//     122: 'hairCareVisit2VC',
//     123: 'hairCareVisit2ShelfTalker',
//     124: 'hairCareVisit2MaintainHotspot',
//     125: 'hairCareVisit2Exclusivity',
//     126: 'hairCareVisit2PlanogramAdherence',
//     127: 'hairCareVisit3OC',
//     128: 'hairCareVisit3VC',
//     129: 'hairCareVisit3ShelfTalker',
//     130: 'hairCareVisit3MaintainHotspot',
//     131: 'hairCareVisit3Exclusivity',
//     132: 'hairCareVisit3PlanogramAdherence',
//     133: 'hairCareVisit4OC',
//     134: 'hairCareVisit4VC',
//     135: 'hairCareVisit4ShelfTalker',
//     136: 'hairCareVisit4MaintainHotspot',
//     137: 'hairCareVisit4Exclusivity',
//     138: 'hairCareVisit4PlanogramAdherence',
//     139: 'nutritionVisit1OC',
//     140: 'nutritionVisit1VC',
//     141: 'nutritionVisit1ShelfTalker',
//     142: 'nutritionVisit1MaintainHotspot',
//     143: 'nutritionVisit1Exclusivity',
//     144: 'nutritionVisit1PlanogramAdherence',
//     145: 'nutritionVisit2OC',
//     146: 'nutritionVisit2VC',
//     147: 'nutritionVisit2ShelfTalker',
//     148: 'nutritionVisit2MaintainHotspot',
//     149: 'nutritionVisit2Exclusivity',
//     150: 'nutritionVisit2PlanogramAdherence',
//     151: 'nutritionVisit3OC',
//     152: 'nutritionVisit3VC',
//     153: 'nutritionVisit3ShelfTalker',
//     154: 'nutritionVisit3MaintainHotspot',
//     155: 'nutritionVisit3Exclusivity',
//     156: 'nutritionVisit3PlanogramAdherence',
//     157: 'nutritionVisit4OC',
//     158: 'nutritionVisit4VC',
//     159: 'nutritionVisit4ShelfTalker',
//     160: 'nutritionVisit4MaintainHotspot',
//     161: 'nutritionVisit4Exclusivity',
//     162: 'nutritionVisit4PlanogramAdherence',
//     163: 'vimVisit1OC',
//     164: 'vimVisit1VC',
//     165: 'vimVisit1ShelfTalker',
//     166: 'vimVisit1MaintainHotspot',
//     167: 'vimVisit1Exclusivity',
//     168: 'vimVisit1PlanogramAdherence',
//     169: 'vimVisit2OC',
//     170: 'vimVisit2VC',
//     171: 'vimVisit2ShelfTalker',
//     172: 'vimVisit2MaintainHotspot',
//     173: 'vimVisit2Exclusivity',
//     174: 'vimVisit2PlanogramAdherence',
//     175: 'vimVisit3OC',
//     176: 'vimVisit3VC',
//     177: 'vimVisit3ShelfTalker',
//     178: 'vimVisit3MaintainHotspot',
//     179: 'vimVisit3Exclusivity',
//     180: 'vimVisit3PlanogramAdherence',
//     181: 'vimVisit4OC',
//     182: 'vimVisit4VC',
//     183: 'vimVisit4ShelfTalker',
//     184: 'vimVisit4MaintainHotspot',
//     185: 'vimVisit4Exclusivity',
//     186: 'vimVisit4PlanogramAdherence',
//     187: 'surfExcelVisit1OC',
//     188: 'surfExcelVisit1VC',
//     189: 'surfExcelVisit1ShelfTalker',
//     190: 'surfExcelVisit1MaintainHotspot',
//     191: 'surfExcelVisit1Exclusivity',
//     192: 'surfExcelVisit1PlanogramAdherence',
//     193: 'surfExcelVisit2OC',
//     194: 'surfExcelVisit2VC',
//     195: 'surfExcelVisit2ShelfTalker',
//     196: 'surfExcelVisit2MaintainHotspot',
//     197: 'surfExcelVisit2Exclusivity',
//     198: 'surfExcelVisit2PlanogramAdherence',
//     199: 'surfExcelVisit3OC',
//     200: 'surfExcelVisit3VC',
//     201: 'surfExcelVisit3ShelfTalker',
//     202: 'surfExcelVisit3MaintainHotspot',
//     203: 'surfExcelVisit3Exclusivity',
//     204: 'surfExcelVisit3PlanogramAdherence',
//     205: 'surfExcelVisit4OC',
//     206: 'surfExcelVisit4VC',
//     207: 'surfExcelVisit4ShelfTalker',
//     208: 'surfExcelVisit4MaintainHotspot',
//     209: 'surfExcelVisit4Exclusivity',
//     210: 'surfExcelVisit4PlanogramAdherence',
//     211: 'visit1Challenge',// last fixed part
//     212: 'statusChangeAfterReauditVisit1',
//     213: 'remarksVisit1',
//     214: 'visit2Challenge',
//     215: 'statusChangeAfterReauditVisit2',
//     216: 'remarksVisit2',
//     217: 'visit3Challenge',
//     218: 'statusChangeAfterReauditVisit3',
//     219: 'remarksVisit3',
//     220: 'visit4Challenge',
//     221: 'statusChangeAfterReauditVisit4',
//     222: 'remarksVisit4',
//     // visit 5 will be added here
//     223: 'visit5Challenge',
//     224: 'statusChangeAfterReauditVisit5',
//     225: 'remarksVisit5',
// };

// */

// export default function ReportTable({ data, loading, selectedDisplayItems = selectedDisplays }) {
//     // Generate the dynamic column mapping
//     const obj = generateDynamicConfig(selectedDisplayItems);

//     // Generate dynamic columns based on selected display items
//     const generateDynamicColumns = () => {
//         // Base fixed columns
//         const baseColumns = [
//             {
//                 title: 'Town',
//                 dataIndex: 'town',
//                 key: 'town',
//                 width: 100,
//                 fixed: 'left',
//                 render: (v, rec) => renderTableVal(v, true, rec.townCode),
//             },
//             {
//                 title: 'Outlet Name',
//                 dataIndex: 'outletName',
//                 key: 'outletName',
//                 width: 200,
//                 fixed: 'left',
//                 render: (v, rec) => renderTableVal(v, true, rec.outletCode),
//             },
//             {
//                 title: 'Schedule Visit',
//                 dataIndex: 'scheduledVisit',
//                 key: 'scheduledVisit',
//                 width: 80,
//                 fixed: 'left',
//             },
//             {
//                 title: 'Completed Visit',
//                 dataIndex: 'completedVisit',
//                 key: 'completedVisit',
//                 width: 80,
//                 fixed: 'left',
//             },
//         ];

//         // Create compliance status columns
//         const complianceStatusColumn = {
//             title: 'Compliance Status',
//             children: selectedDisplayItems.map((item) => ({
//                 title: item.name,
//                 dataIndex: `${item.key}Status`,
//                 key: `${item.key}Status`,
//                 width: 100,
//             })),
//         };

//         // Create compliance detail columns for each selected display item
//         const complianceDetailColumns = selectedDisplayItems.map((item) => {
//             const visitColumns = [];
//             for (let visitNum = 1; visitNum <= 5; visitNum++) {
//                 visitColumns.push({
//                     title: `Visit-${visitNum}`,
//                     children: [
//                         {
//                             title: 'O.C',
//                             dataIndex: `${item.key}Visit${visitNum}OC`,
//                             key: `${item.key}Visit${visitNum}OC`,
//                             width: 60,
//                         },
//                         {
//                             title: 'V.C',
//                             dataIndex: `${item.key}Visit${visitNum}VC`,
//                             key: `${item.key}Visit${visitNum}VC`,
//                             width: 60,
//                         },
//                         {
//                             title: 'Shelf Talker',
//                             dataIndex: `${item.key}Visit${visitNum}ShelfTalker`,
//                             key: `${item.key}Visit${visitNum}ShelfTalker`,
//                             width: 60,
//                         },
//                         {
//                             title: 'Maintain Hotspot',
//                             dataIndex: `${item.key}Visit${visitNum}MaintainHotspot`,
//                             key: `${item.key}Visit${visitNum}MaintainHotspot`,
//                             width: 60,
//                         },
//                         {
//                             title: 'Exclusivity',
//                             dataIndex: `${item.key}Visit${visitNum}Exclusivity`,
//                             key: `${item.key}Visit${visitNum}Exclusivity`,
//                             width: 60,
//                         },
//                         {
//                             title: 'Planogram Adherence',
//                             dataIndex: `${item.key}Visit${visitNum}PlanogramAdherence`,
//                             key: `${item.key}Visit${visitNum}PlanogramAdherence`,
//                             width: 60,
//                         },
//                     ],
//                 });
//             }

//             return {
//                 title: `${item.name} Compliance`,
//                 children: visitColumns,
//             };
//         });

//         // Create challenge columns for all visits
//         const challengeColumns = {
//             title: 'Challenge',
//             children: Array.from({ length: 5 }, (_, i) => i + 1).flatMap((visitNum) => [
//                 {
//                     title: `Visit ${visitNum}`,
//                     dataIndex: `visit${visitNum}Challenge`,
//                     key: `visit${visitNum}Challenge`,
//                     width: 100,
//                 },
//                 {
//                     title: 'Status change after reaudit',
//                     dataIndex: `statusChangeAfterReauditVisit${visitNum}`,
//                     key: `statusChangeAfterReauditVisit${visitNum}`,
//                     width: 100,
//                 },
//                 {
//                     title: 'Remarks',
//                     dataIndex: `remarksVisit${visitNum}`,
//                     key: `remarksVisit${visitNum}`,
//                     width: 100,
//                 },
//             ]),
//         };

//         // Combine all column sections
//         return [
//             ...baseColumns,
//             complianceStatusColumn,
//             ...complianceDetailColumns,
//             challengeColumns,
//         ];
//     };

//     const columns = generateDynamicColumns();
//     const finalData = data?.map((x) => x.reduce((acc, c, i) => ({ ...acc, [obj[i]]: c }), {}));

//     return (
//         <div style={{ borderRadius: '10px' }}>
//             <div className="box-heading">Interim Report</div>

//             <div style={{ padding: '10px', width: '100%' }}>
//                 {loading ? (
//                     <TableSkeleton />
//                 ) : (
//                     <Table
//                         pagination={false}
//                         columns={columns}
//                         dataSource={finalData}
//                         bordered
//                         size="small"
//                         scroll={{
//                             x: 'calc(1200px + 50%)',
//                         }}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }
