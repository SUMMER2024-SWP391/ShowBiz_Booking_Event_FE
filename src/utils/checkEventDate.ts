import { parse,  isToday, isTomorrow , format } from 'date-fns';
import dayjs from 'dayjs';

export function checkEventDate(date_event: string): string {
  const currentDate = dayjs();
  const eventDate = dayjs(date_event, 'DD/MM/YYYY');
  const parsedDate = parse(date_event, 'dd/MM/yyyy', new Date());
  if (isToday(parsedDate)) {
    return 'Today';
  } else if (isTomorrow(parsedDate)) {
    return 'Tomorrow';
  } else {
    return format(parsedDate, 'MMM dd EEEE');
  }
}