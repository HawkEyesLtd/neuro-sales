import { createSlice } from '@reduxjs/toolkit';
import { toCamelCase } from '@utils/formatAuditPayload';

const initialState = {
    isModalOpen: false,
    auditFor: null,
    data: [],
};

const complianceSlice = createSlice({
    name: 'compliance',
    initialState,
    reducers: {
        setNewAuditData: (state, action) => {
            const { isModalOpen, auditFor, challenged, isAudited } = action.payload;

            let formattedData;
            if (state.auditFor !== auditFor) {
                if (challenged && challenged.length > 0) {
                    // Transform and filter out empty categories
                    formattedData = challenged
                        .map((challenge) => ({
                            [toCamelCase(challenge.kind)]: challenge.challenge.map((item) => ({
                                name: item,
                                status: null,
                                remarks: null,
                            })),
                        }))
                        .filter((categoryObj) => {
                            const [categoryName] = Object.keys(categoryObj);
                            return categoryObj[categoryName].length > 0;
                        });
                } else if (isAudited) {
                    // Transform the challenged object into required format =
                    // //[{category: [{name: 'item1', status: 'pass', remarks: 'remarks'}]}, {category: [{name: 'item2', status: 'fail', remarks: 'remarks'}]}
                    const formattedCategories = Object.entries(challenged).map(
                        ([category, items]) => ({
                            [category]: items.map((item) => ({
                                name: item.name,
                                status: item.status,
                                remarks: item.remarks,
                            })),
                        })
                    );

                    formattedData = formattedCategories;
                }
            } else {
                formattedData = state.data;
            }

            state.isModalOpen = isModalOpen;
            state.auditFor = auditFor;
            state.data = formattedData;
        },
        setAuditModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        updateComplianceItem: (state, action) => {
            const { category, itemName, updates } = action.payload;

            state.data = state.data.map((categoryObj) => {
                const [currentCategory] = Object.keys(categoryObj);
                if (currentCategory !== category) return categoryObj;

                return {
                    [currentCategory]: categoryObj[currentCategory].map((item) => {
                        const currentItemName = item.name || item;
                        if (currentItemName !== itemName) return item;

                        return {
                            ...item,
                            ...updates,
                        };
                    }),
                };
            });
        },
        resetComplianceData: (state) => {
            state.data = [];
            state.auditFor = null;
            state.isModalOpen = false;
        },
    },
});

export const { setNewAuditData, setAuditModalOpen, updateComplianceItem, resetComplianceData } =
    complianceSlice.actions;

export default complianceSlice.reducer;
