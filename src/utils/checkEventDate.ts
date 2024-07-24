import { parse, isToday, isTomorrow, format } from 'date-fns'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

export function checkEventDate(date_event: string): string {
  const currentDate = dayjs()
  const eventDate = dayjs(date_event, 'DD/MM/YYYY')
  const parsedDate = parse(date_event, 'dd/MM/yyyy', new Date())
  if (isToday(parsedDate)) {
    return 'Today'
  } else if (isTomorrow(parsedDate)) {
    return 'Tomorrow'
  } else {
    return format(parsedDate, 'MMM dd EEEE')
  }
}

export function isValidToRegister(date_event: string, time_start: string): boolean {
  dayjs.extend(isSameOrBefore)
  const currentDate = dayjs()
  const parsedDate = parse(date_event + ' ' + time_start, 'dd/MM/yyyy HH:mm', new Date())
  if (currentDate.isSameOrBefore(parsedDate)) {
    return true
  }
  return false
}
