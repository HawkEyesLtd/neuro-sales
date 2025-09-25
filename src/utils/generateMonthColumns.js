// Function to generate dynamic columns based on lastThreeMonthsSalary inside each record
const generateMonthColumns = (dt) => {
    // Find a record that has lastThreeMonthsSalary to extract months
    const sampleRecord = dt?.find((item) => item.lastThreeMonthsSalary?.length);
    if (!sampleRecord) return [];

    return sampleRecord.lastThreeMonthsSalary.map((salary) => ({
        title: salary.month, // Dynamic column title from the month
        dataIndex: 'lastThreeMonthsSalary', // Ensure we point to the correct field
        key: salary.month.toLowerCase(),
        align: 'center',
        render: (salaries) => {
            const salaryObj = salaries?.find((s) => s.month === salary.month);
            return salaryObj?.totalPayableSalary ?? null; // Show salary if available
        },
    }));
};

export default generateMonthColumns;
