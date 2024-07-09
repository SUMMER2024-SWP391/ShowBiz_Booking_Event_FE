import { Event } from './event.type'
import { User } from './users.type'

export type Ticket = {
  _id: string
  event_id: string
  visitor_id: string
  status_check_in: boolean
  otp_check_in: string
  event: Event
  user_profile: User
}
