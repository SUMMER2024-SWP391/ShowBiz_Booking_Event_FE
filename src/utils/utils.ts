import dayjs from 'dayjs'
import axios, { AxiosError } from 'axios'
import { RegisterSucces } from 'src/@types/event.type'
import { ErrorResponse } from 'src/@types/utils.type'
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
  const timeEvent = dayjs(
    date_event.split('/').reverse().join('/') + ' ' + time_end
  ).format('YYYY-MM-DD HH:mm')
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  console.log(
    Number(dayjs(timeEvent).minute()) - Number(dayjs(nowDate).minute()) <= 15
  )
  return dayjs(timeEvent).minute() - dayjs(nowDate).minute() <= 15
  // const isToday = compareDate(dateEvent, nowDate) //dang bug cho nay
}

export function isUnAuthorized<T>(error: unknown): error is AxiosError<T> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  )
}

export function isAxiosErrorJWTExpired(
  error: unknown
): error is AxiosError<ErrorResponse<{}>> {
  return (
    isUnAuthorized<ErrorResponse<{}>>(error) &&
    error.response?.data.message === 'Jwt token expired'
  )
}

function compareDate(date1: string[], date2: string[]): boolean {
  const day1 = new Date(Number(date1[2]), Number(date1[1]), Number(date1[0]))
  const day2 = new Date(Number(date2[2]), Number(date2[1]), Number(date2[0]))
  return day1.getTime() <= day2.getTime()
}
