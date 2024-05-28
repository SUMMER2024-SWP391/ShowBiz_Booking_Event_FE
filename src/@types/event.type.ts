export interface Event {
  id: string
  event_name: string
  capacity: number
  ticket: string
  description: string
  type_event: string
  date_event: Date
  time_start: string
  time_end: string
  address: string
  image_url: string
  event_operator_id: string
  event_operator_name: string
  status: string
  calendarId: string
}

export type EventList = Pick<
  Event,
  | 'id'
  | 'event_operator_name'
  | 'event_operator_id'
  | 'capacity'
  | 'event_name'
  | 'image_url'
  | 'date_event'
  | 'ticket'
  | 'time_end'
  | 'time_start'
  | 'address'
>
