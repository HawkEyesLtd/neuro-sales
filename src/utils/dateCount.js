import dayjs from 'dayjs';

// Function to count a specific day in a month
export const countSpecificDayInMonth = (year, month, targetDay) => {
    const firstDay = dayjs().startOf('month').add(1, 'month');
    const lastDay = firstDay.endOf('month');
    let currentDay = firstDay;
    let specificDayCount = 0;

    while (currentDay.isBefore(lastDay) || currentDay.isSame(lastDay, 'day')) {
        if (currentDay.day() === targetDay) {
            specificDayCount++;
        }
        currentDay = currentDay.add(1, 'day');
    }

    return specificDayCount;
};

export const getYearCount = () => {
    const month = dayjs().month();
    if (month === 11) return dayjs().year() + 1;
    return dayjs().year();
};

export const getNextMonth = () => (dayjs().month() + 1 === 12 ? 1 : dayjs().month() + 1);
