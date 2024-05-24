import { EventList } from 'src/@types/event.type'
import http from 'src/utils/http'

const eventApi = {
  getListEvent() {
    return http.get<EventList[]>('/events')
  }
}

export default eventApi
