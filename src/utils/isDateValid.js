import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

// Extend Day.js with the isBetween plugin
dayjs.extend(isBetween);

const isDateValid = (assignedAt, dueAt) => {
    const currentDate = dayjs(); // Current date and time
    return currentDate.isBetween(assignedAt, dueAt, 'second', '[]'); // Inclusive check
};

export default isDateValid;
