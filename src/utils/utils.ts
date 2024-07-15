import { Register } from './../Components/EventDetail/Register'
import axios, { AxiosError } from 'axios'
import { RegisterSucces } from 'src/@types/event.type'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

type ResponsePaymentEvent = {
  url: string
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  )
}

export function isAxiosUnauthorized<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  )
}

export type NoNullable<T> = Exclude<T, undefined | null>

export function isResponseNoFormHasPaymentType(
  obj: object
): obj is ResponsePaymentEvent {
  return 'url' in obj && typeof 'url' === 'string'
}

export function isReponseNoPaymentNoForm(obj: unknown): obj is RegisterSucces {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    '_id' in obj &&
    'event_id' in obj &&
    'visitor_id' in obj &&
    'status_check_in' in obj &&
    'otp_check_in' in obj &&
    'time_register' in obj &&
    'status_register' in obj
  )
}

export function isAxiosErrorConflictAndNotPermisson<T>(
  error: unknown
): error is AxiosError<T> {
  return (
    (isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Forbidden) ||
    (isAxiosError(error) && error.response?.status === HttpStatusCode.Conflict)
  )
}

export function isReponseNoPaymentButHaveForm<T>(obj: unknown): obj is T {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'register' in obj &&
    typeof obj.register === 'object' &&
    obj.register !== null
  )
}
export function canCancelEvent(dateEvent: string, timeStart: string): boolean {
  const date = convertToDate(dateEvent)

  const [hours, minutes] = timeStart.split(':').map(Number)
  const eventDate = new Date(date)
  eventDate.setHours(hours, minutes, 0, 0)

  const now = new Date()
  //khoảng cách thời gian hiện tại so với thời gian bắt đầu sự kiện
  const diff = eventDate.getTime() - now.getTime()

  //đổi sang giờ
  const diffInHours = diff / (1000 * 60 * 60)

  return diffInHours >= 48
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number)
  // Month trong Date 0-11 nên trừ 1
  return new Date(year, month - 1, day)
}

export function isValidToFeeback(
  date_event: string,
  time_end: string
): boolean {
  const dateEvent = date_event.split('/')
  const nowDate = [
    new Date().getDate().toString(),
    '0' + (new Date().getMonth() + 1).toString(),
    new Date().getFullYear().toString()
  ]

  const isToday = JSON.stringify(dateEvent) <= JSON.stringify(nowDate)

  const timeEvent = time_end.split(':')
  const nowTime = [
    new Date().getHours().toString(),
    new Date().getMinutes().toString()
  ]
  let isValidTime = false
  if (
    Number(timeEvent[0]) * 60 +
      Number(timeEvent[1]) -
      (Number(nowTime[0]) * 60 + Number(nowTime[1])) <=
    15
  ) {
    //check thời gian hiện tại so với thời gian event có bé hơn 15p ko nếu có thì
    //hiển thị form feedback
    isValidTime = true
  }

  return isToday && isValidTime
}

export function isUnAuthorized<T>(error: unknown): error is AxiosError<T> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  )
}
