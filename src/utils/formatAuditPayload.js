// Helper function to convert to camelCase
export const toCamelCase = (str) =>
    str
        .toLowerCase()
        .split(' ')
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');

// Helper function to convert camelCase to normal sentence
export const fromCamelCase = (str) =>
    str
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter

// Format for final submission (removes empty arrays)
export const formatAuditPayload = (data, executionId) => {
    const result = { executionId };

    data.forEach((categoryObj) => {
        const [categoryName] = Object.keys(categoryObj);
        // const camelCaseKey = toCamelCase(categoryName);

        const items = categoryObj[categoryName]
            .filter((item) => item.status !== null)
            .map((item) => ({
                name: item.name,
                status: item.status,
                remarks: item.remarks?.length ? item.remarks[0] : null,
            }));

        // Only add to result if there are items with status
        if (items.length > 0) {
            result[categoryName] = items;
        }
    });

    return result;
};

// Validate compliance data
export const validateAuditPayload = (data) => {
    const errors = [];

    if (!data || !Array.isArray(data) || data.length === 0) {
        errors.push('No audit data available. Please add categories and items for audit.');
        return errors;
    }

    data.forEach((categoryObj) => {
        const [categoryName] = Object.keys(categoryObj);
        const items = categoryObj[categoryName];

        if (!categoryName) {
            errors.push('Category name is required for audit.');
            return;
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            errors.push(`Category "${categoryName}" has no items. Please add items for audit.`);
            return;
        }

        items.forEach((item) => {
            if (!item.name) {
                errors.push(`Item name is required in category "${categoryName}".`);
                return;
            }

            const missingFields = [];
            if (item.status === null || item.status === undefined) {
                missingFields.push('Pass/Fail');
            }
            if (!item.remarks || !item.remarks.length) {
                missingFields.push('Remarks');
            }

            if (missingFields.length > 0) {
                errors.push(
                    `For: ${categoryName}, Item: ${item.name}, require fields: ${missingFields.join(', ')}.`
                );
            }
        });
    });

    return errors;
};
