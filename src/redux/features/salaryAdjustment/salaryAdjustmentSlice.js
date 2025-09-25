import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userType: 'Supervisor',
    cluster: [],
    area: [],
    territory: [],
    town: [],
    criteria: [],
    categoryAdjustments: {}, // Store category-level adjustments
    categoryWaived: {}, // Store category-wide waived state
    categoryEliminate: {}, // Store category-wide eliminate state
    remarks: '',
};

const salaryAdjustmentSlice = createSlice({
    name: 'salaryAdjustment',
    initialState,
    reducers: {
        setAdjustmentData: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        initializeCriteria: (state, action) => {
            // action.payload: array of criteria objects (from adjustData.js)
            // Always store criteria in the order received
            state.criteria = action.payload.map((c) => ({ ...c }));
        },
        upsertCriterion: (state, action) => {
            const criterion = action.payload;
            // Find index by name and category
            const index = state.criteria.findIndex(
                (c) => c.name === criterion.name && c.category === criterion.category
            );
            if (index !== -1) {
                // Merge updates, never overwrite with undefined
                const existing = state.criteria[index];
                state.criteria[index] = {
                    ...existing,
                    ...Object.fromEntries(
                        Object.entries(criterion).filter(([k, v]) => v !== undefined)
                    ),
                };
            } else {
                // Insert new criterion in the correct order (by category, then by name as in adjustData.js)
                // Find the category index in the current criteria
                const categoryIndexes = state.criteria
                    .map((c, i) => (c.category === criterion.category ? i : -1))
                    .filter((i) => i !== -1);
                const insertAt =
                    categoryIndexes.length > 0
                        ? Math.max(...categoryIndexes) + 1
                        : state.criteria.length;
                state.criteria.splice(insertAt, 0, {
                    name: criterion.name,
                    category: criterion.category,
                    targetOrAchievement: criterion.targetOrAchievement || 0,
                    adjustment: criterion.adjustment || 0,
                    waived: criterion.waived || false,
                    eliminate: criterion.eliminate || false,
                    individualAdjustment: criterion.individualAdjustment || 0,
                });
            }
        },
        setCategoryAdjustment: (state, action) => {
            const { category, adjustment } = action.payload;
            state.categoryAdjustments[category] = adjustment;
            state.criteria.forEach((criterion) => {
                if (criterion.category === category) {
                    const baseValue = criterion.targetOrAchievement;
                    const individualAdjustment = criterion.individualAdjustment || 0;
                    criterion.adjustment = baseValue + individualAdjustment + adjustment;
                }
            });
        },
        setCategoryWaived: (state, action) => {
            const { category, waived } = action.payload;
            state.categoryWaived[category] = waived;
        },
        setCategoryEliminate: (state, action) => {
            const { category, eliminate } = action.payload;
            state.categoryEliminate[category] = eliminate;
        },
        resetSalaryAdjustment: () => initialState,
    },
});

export const {
    setAdjustmentData,
    upsertCriterion,
    setCategoryAdjustment,
    setCategoryWaived,
    setCategoryEliminate,
    resetSalaryAdjustment,
    initializeCriteria,
} = salaryAdjustmentSlice.actions;

export default salaryAdjustmentSlice.reducer;
