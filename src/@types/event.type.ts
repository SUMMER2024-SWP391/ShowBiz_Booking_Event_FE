import { User } from './users.type'

export interface Event {
  _id: string
  name: string
  capacity: number
  ticket: string
  description: string
  type_event: string
  date_event: string
  time_start: string
  time_end: string
  address: string
  image: string
  event_operator: Pick<User, '_id' | 'user_name' | 'phone_number' | 'email'>
  status: string
  calendarId: string
  location: string
}

export type EventList = Pick<
  Event,
  | '_id'
  | 'event_operator'
  | 'capacity'
  | 'name'
  | 'image'
  | 'date_event'
  | 'ticket'
  | 'time_end'
  | 'time_start'
  | 'address'
>
