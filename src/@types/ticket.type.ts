import { StatusRegisterEvent } from './utils.type'

export type Ticket = {
  _id: string
  event_id: string
  visitor_id: string
  status_check_in: boolean
  time_register: string
  status_register: StatusRegisterEvent
  otp_check_in: string
}
