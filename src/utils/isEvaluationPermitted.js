import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

// Extend Day.js with the isBetween plugin
dayjs.extend(isBetween);

export const getButtonVisibility = ({
    approvedAt,
    evaluatedAt,
    reEvaluatedAt,
    assignedAt,
    dueAt,
}) => {
    const currentDate = dayjs();

    // If already approved, hide both buttons
    if (approvedAt) return { showEvaluated: false, showReEvaluated: false };

    // If current date is outside the valid range, hide both buttons
    if (!currentDate.isBetween(assignedAt, dueAt, 'second', '[]')) {
        return { showEvaluated: false, showReEvaluated: false };
    }

    // If both evaluatedAt and reEvaluatedAt are falsy, show only the "Evaluate" button
    if (!evaluatedAt && !reEvaluatedAt) return { showEvaluated: true, showReEvaluated: false };

    // If evaluatedAt is true and reEvaluatedAt is falsy, show only the "Re-Evaluate" button
    if (evaluatedAt && !reEvaluatedAt) return { showEvaluated: false, showReEvaluated: true };

    // If both evaluatedAt and reEvaluatedAt are true, hide both buttons
    return { showEvaluated: false, showReEvaluated: false };
};

export const isTMPermitted = (tm, dueAt, assignedAt) => {
    const currentDate = dayjs();
    return currentDate.isBetween(assignedAt, dueAt, 'second', '[]');
};
