import { EventStatus } from 'src/@types/enum'
import {
  Event,
  EventList,
  EventListOperator,
  EventListPendingAdmin,
  ListQuestion,
  FormEventRegister,
  EventListUser,
  CreateEvent
} from 'src/@types/event.type'
import { EventQuestionType } from 'src/@types/form.type'
import { Ticket } from 'src/@types/ticket.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const eventApi = {
  getListEvent: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>('/events'),
  getEventById: (id: string) =>
    http.get<SuccessResponse<{ event: Event }>>(`/events/${id}`),
  getPendingEventListAdmin: () =>
    http.get<SuccessResponse<{ events: EventListPendingAdmin[] }>>(
      '/admins/get-all/pending-list'
    ),
  getAllEventListAdmin: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>(
      '/admins/get-all/event-list'
    ),
  handleStatusEventAdmin: (id: string, status: EventStatus) =>
    http.patch(`/admins/confirm-event/${id}`, { status }),
  getEventListOperator: () =>
    http.get<SuccessResponse<{ events: EventListOperator[] }>>(
      '/events/list-event/event-operator'
    ),
  registerEvent: (id: string, body: FormEventRegister) =>
    http.post(`/events/register-event/${id}`, body),
  getListQuestion: (id: string, type: EventQuestionType) =>
    http.get<SuccessResponse<{ formQuestion: ListQuestion[] }>>(
      `/forms/question/${id}/${type}`
    ),
  getListEventUser: () =>
    http.get<SuccessResponse<EventListUser>>('/users/list-register-event'),
  getTicket: (id: string) =>
    http.get<SuccessResponse<{ ticket: Ticket }>>(`/events/ticket/${id}`),
  createEvent: (body: CreateEvent) =>
    http.post<SuccessResponse<{}>>('/events/', body),
  checkInEvent: ({
    id,
    body
  }: {
    id?: string
    body: { otp_check_in: string }
  }) =>
    http.post<SuccessResponse<{}>>(
      `/e-operators/checking-staff/check-in/${id}`,
      body
    )
}

export default eventApi
