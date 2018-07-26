
import moment from 'moment';

const momentDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const isOpen = (hours) => {
    const now = moment();
    const currentDay = momentDays[now.day()];
    const startHour = hours.start[currentDay];
    const endHour = hours.end[currentDay];
    if (startHour === 'closed' || endHour === 'closed') {
        return false;
    } else {
        const startDate = moment(startHour, 'HH:mm');
        const endDate = moment(endHour, 'HH:mm');
        return now.isBetween(startDate, endDate);
    }
}