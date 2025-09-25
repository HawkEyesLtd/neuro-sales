import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    evaLuationData: {},
    penaltyReason: {},
    monthYearSummary: {},
    updatedEvaluationData: {},
    variablePayTotal: 0,
    trAmount: 0,
    tmAmount: 0,
    tradeRelationship: {},
    teamManagement: {},
    initialBaseSalary: 0,
    initialTravelAllowance: 0,
    initialVariablePay: 0,
    initialTotal: 0,
    variableAdjusted: 0,
    payableIncentive: [],
    remarks: '',
    payableTravelAllowance: {},
    payableBaseSalary: {},
    initialData: {},
    initialEvaluationData: {},
};

function updateTradeRelationship(payableIncentive, payload) {
    // Find the "Resource and relationship Management" category
    const resourceManagement = payableIncentive.find(
        (item) => item.category.trim().toLowerCase() === 'resource and relationship management'
    );
    if (!resourceManagement) return;

    // Find the "Trade relationship" criteria
    const tradeRelationship = resourceManagement.assessmentCriteria.find(
        (criteria) => criteria.title.trim().toLowerCase() === 'trade relationship'
    );
    if (!tradeRelationship) return;

    // Update the achievement and earned values
    tradeRelationship.achievement = payload.achievement;
    tradeRelationship.earned = payload.earned;

    // Recalculate the totalPayableAmount for this category
    resourceManagement.totalPayableAmount = resourceManagement.assessmentCriteria.reduce(
        (sum, criteria) => sum + (criteria.earned || 0),
        0
    );
}

function updateTeamManagement(payableIncentive, payload) {
    // Find the "Resource and relationship Management" category
    const resourceManagement = payableIncentive.find(
        (item) => item.category.trim().toLowerCase() === 'resource and relationship management'
    );
    if (!resourceManagement) return;

    // Find the "Team Management" criteria
    const teamManagement = resourceManagement.assessmentCriteria.find(
        (criteria) => criteria.title.trim().toLowerCase() === 'team management'
    );
    if (!teamManagement) return;

    // Update the achievement and earned values
    teamManagement.achievement = payload.achievement;
    teamManagement.earned = payload.earned;

    // Recalculate the totalPayableAmount for this category
    resourceManagement.totalPayableAmount = resourceManagement.assessmentCriteria.reduce(
        (sum, criteria) => sum + (criteria.earned || 0),
        0
    );
}

const evaluationDataSlice = createSlice({
    name: 'evaluationDataSlice',
    initialState,
    reducers: {
        setVariablePayTotal: (state, action) => {
            state.variablePayTotal = action.payload;
        },

        setAdjustTravelAllowance: (state, action) => {
            state.evaLuationData.payableTravelAllowance = action.payload;
        },

        setEvaluationData: (state, action) => {
            state.evaLuationData = action.payload;
            state.initialEvaluationData = action.payload;

            state.payableIncentive = action.payload.payableIncentive || [];
            state.payableTravelAllowance = action.payload.payableTravelAllowance || {};
            state.payableBaseSalary = action.payload.payableBaseSalary || {};
        },
        setBasicPenaltyData: (state, action) => {
            state.evaLuationData.payableBaseSalary = {
                ...state.evaLuationData.payableBaseSalary,
                ...action.payload,
            };
        },
        // setBasicPenaltyData: (state, action) => {
        //     state.evaLuationData.payableBaseSalary = {
        //         ...state.evaLuationData.payableBaseSalary,
        //         penaltyCharge: action.payload.value,
        //         penaltyDays: action.payload.label,
        //         totalBaseSalary: action.payload.total,
        //     };
        // },
        setVariablePayEligibility: (state, action) => {
            state.evaLuationData.variablePayEligibility = action.payload;
        },
        setTotalPayableSalary: (state, action) => {
            state.evaLuationData.totalPayableSalary = action.payload;
        },
        setInitialData: (state, action) => {
            state.initialData = action.payload;
        },
        setTotalPayableIncentive: (state, action) => {
            state.evaLuationData.totalPayableIncentive = action.payload;
        },
        setTrAmount: (state, action) => {
            state.trAmount = action.payload.earned;

            const payableIncentive = state.evaLuationData && state.evaLuationData.payableIncentive;
            if (payableIncentive) {
                updateTradeRelationship(payableIncentive, action.payload);
            }
        },

        setTmAmount: (state, action) => {
            state.tmAmount = action.payload.earned;

            const payableIncentive = state.evaLuationData && state.evaLuationData.payableIncentive;
            if (payableIncentive) {
                updateTeamManagement(payableIncentive, action.payload);
            }
        },

        setTradeRelationship: (state, action) => {
            state.tradeRelationship = action.payload;
        },

        setTeamManagement: (state, action) => {
            state.teamManagement = action.payload;
        },

        setPenaltyReason: (state, action) => {
            state.penaltyReason = action.payload;
        },
        setTotalMobileBill: (state, action) => {
            state.evaLuationData.totalMobileBill = action.payload;
        },
        resetBasicPenaltyData: (state, action) => {
            state.evaLuationData.payableBaseSalary = state.updatedEvaluationData.payableBaseSalary;
        },
        resetPenaltyReason: (state) => {
            state.penaltyReason = {};
        },
        setVariablePayAmount: (state, action) => {
            state.evaLuationData.totalPayableIncentive = action.payload;
        },
        setVariableAdjusted: (state, action) => {
            state.variableAdjusted = action.payload;
        },
        resetCurrentState: (state) => {
            state.evaLuationData = {};
            state.penaltyReason = {};
            state.monthYearSummary = {};
            state.updatedEvaluationData = {};
            state.tradeRelationship = {};
            state.teamManagement = {};
            state.variablePayTotal = 0;
            state.trAmount = 0;
            state.tmAmount = 0;
            state.initialBaseSalary = 0;
            state.initialTravelAllowance = 0;
            state.initialVariablePay = 0;
            state.initialTotal = 0;
            state.variableAdjusted = 0;
            state.payableIncentive = [];
            state.remarks = '';
        },

        setInitialBaseSalary: (state, action) => {
            state.initialBaseSalary = action.payload;
        },
        setInitialTravelAllowance: (state, action) => {
            state.initialTravelAllowance = action.payload;
        },
        setInitialVariablePay: (state, action) => {
            state.initialVariablePay = action.payload;
        },
        setInitialTotal: (state, action) => {
            state.initialTotal = action.payload;
        },
        updatePayableIncentive: (state, action) => {
            const { category, achievement, earned, title } = action.payload;

            // Find the category in payableIncentive array
            const categoryIndex = state.evaLuationData.payableIncentive.findIndex(
                (item) => item.category === category
            );

            if (categoryIndex !== -1) {
                // Find and update the specific criteria
                const criteriaIndex = state.evaLuationData.payableIncentive[
                    categoryIndex
                ].assessmentCriteria.findIndex((criteria) => criteria.title === title);

                if (criteriaIndex !== -1) {
                    state.evaLuationData.payableIncentive[categoryIndex].assessmentCriteria[
                        criteriaIndex
                    ].adjustAchievement = achievement;
                    // state.evaLuationData.payableIncentive[categoryIndex].assessmentCriteria[
                    //     criteriaIndex
                    // ].achievement = achievement;
                    state.evaLuationData.payableIncentive[categoryIndex].assessmentCriteria[
                        criteriaIndex
                    ].earned = earned;

                    // Calculate new total for the category
                    const categoryTotal = state.evaLuationData.payableIncentive[
                        categoryIndex
                    ].assessmentCriteria.reduce((sum, criteria) => sum + (criteria.earned || 0), 0);

                    state.evaLuationData.payableIncentive[categoryIndex].totalPayableAmount =
                        categoryTotal;
                }
            }
        },
        setRemarks: (state, action) => {
            state.remarks = action.payload;
        },

        updatePenaltyAmount: (state, action) => {
            const { totalPayableAmount, earned } = action.payload;
            // Find the category in payableIncentive array
            const categoryIndex = state.evaLuationData.payableIncentive.findIndex(
                (item) => item.category === 'Penalty'
            );

            // Find and update the specific criteria
            const criteriaIndex = state.evaLuationData.payableIncentive[
                categoryIndex
            ].assessmentCriteria.findIndex(
                (criteria) =>
                    criteria.title === 'AI result unchecked (CSD Result)' ||
                    criteria.title === 'Invalid Challenges'
            );

            if (categoryIndex !== -1) {
                state.evaLuationData.payableIncentive[categoryIndex].totalPayableAmount =
                    totalPayableAmount;

                state.evaLuationData.payableIncentive[categoryIndex].assessmentCriteria[
                    criteriaIndex
                ].earned = earned;
            }
        },
    },
});

export default evaluationDataSlice.reducer;
export const {
    setEvaluationData,
    setBasicPenaltyData,
    resetBasicPenaltyData,
    setPenaltyReason,
    resetPenaltyReason,
    setMonthYearSummary,
    resetMonthYearSummary,
    setAllowanceWithPenalty,
    resetAllowanceWithPenalty,
    setTravelAllowance,
    resetTravelAllowance,
    resetAdditionalWorkdays,
    setAdditionalWorkdays,
    setPenaltyDays,
    resetPenaltyDays,
    setVariablePayTotal,
    resetCurrentState,
    setTrAmount,
    setTmAmount,
    setInitialBaseSalary,
    setInitialTravelAllowance,
    setInitialVariablePay,
    setInitialTotal,
    setTeamManagement,
    setTradeRelationship,
    setVariablePayEligibility,
    setVariablePayAmount,
    setTotalPayableSalary,
    setTotalPayableIncentive,
    setVariableAdjusted,
    updatePayableIncentive,
    setRemarks,
    setAdjustTravelAllowance,
    updatePenaltyAmount,
    setTotalMobileBill,
    setInitialData,
} = evaluationDataSlice.actions;
