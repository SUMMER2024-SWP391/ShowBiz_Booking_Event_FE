import { Event, EventList } from 'src/@types/event.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const eventApi = {
  getListEvent: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>('/events'),
  getEventById: (id: string) =>
    http.get<SuccessResponse<{ event: Event }>>(`/events/${id}`),
  getPendingEventList: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>(
      '/admins/get-all/pending-list'
    ),
  getAllEventList: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>(
      '/admins/get-all/event-list'
    )
}

export default eventApi
