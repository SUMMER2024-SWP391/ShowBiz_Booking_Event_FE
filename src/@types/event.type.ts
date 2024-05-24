export interface Event {
  eventId: string
  event_name: string
  capacity: number
  ticket: string
  description: string
  typeEvent: string
  dateEvent: Date
  time_start: string
  timeEnd: string
  address: string
  imageUrl: string
  eventOperatorId: string
  eventOperatorName: string
  status: string
  calendarId: string
}

export type EventList = Pick<
  Event,
  | 'eventId'
  | 'eventOperatorName'
  | 'eventOperatorId'
  | 'capacity'
  | 'event_name'
  | 'imageUrl'
  | 'dateEvent'
  | 'ticket'
  | 'timeEnd'
  | 'time_start'
  | 'address'
>
