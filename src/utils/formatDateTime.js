import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const formatDateTime = (date) => dayjs(date).format('DD-MM-YYYY, h:mm:ss A');

export const formatDate = (date) => dayjs(date).format('DD-MM-YYYY');

export function convertSecondsToHMS(seconds) {
    const timeDuration = dayjs.duration(seconds, 'seconds');
    const hours = timeDuration.hours();
    const minutes = timeDuration.minutes();
    const secs = Math.round(timeDuration.seconds());

    const totalMinutes = minutes + Math.floor(secs / 60);
    const finalSeconds = secs % 60;
    const totalHours = hours + Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;

    return `${totalHours}:${finalMinutes.toString().padStart(2, '0')}:${finalSeconds.toString().padStart(2, '0')}`;
}
