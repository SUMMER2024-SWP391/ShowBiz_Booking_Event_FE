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
