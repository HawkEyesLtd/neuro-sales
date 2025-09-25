export default function getMonthName(dateString) {
    try {
        // Parse the input date string into a Date object
        const dateObj = new Date(`${dateString}-01`); // Appending '-01' for day part

        // Get the month name from the Date object
        const monthName = dateObj.toLocaleString('default', { month: 'long' });

        return monthName;
    } catch (error) {
        // Handle invalid date format
        return "Invalid date format. Please provide date in 'YYYY-MM' format.";
    }
}
