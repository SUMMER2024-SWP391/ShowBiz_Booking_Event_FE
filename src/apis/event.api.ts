import { getListUserRegisterEvent } from './../@types/event.type'
import { EventStatus } from 'src/@types/enum'
import {
  Event,
  EventList,
  EventListOperator,
  EventListPendingAdmin,
  ListQuestion,
  FormEventRegister,
  EventListUser,
  CreateEvent,
  EventListConfig,
  RegisterSucces
} from 'src/@types/event.type'
import { Ticket } from 'src/@types/ticket.type'
import { User } from 'src/@types/users.type'
import { StatusRegisterEvent, SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const eventApi = {
  getListEvent: (params: EventListConfig) =>
    http.get<
      SuccessResponse<{
        events: EventList[]
        paginate: { total_events: string; sum_page: string }
      }>
    >('/events', {
      params
    }),
  getEventById: (id: string) =>
    http.get<SuccessResponse<{ event: Event }>>(`/events/${id}`),
  getPendingEventListAdmin: () =>
    http.get<SuccessResponse<{ events: EventListPendingAdmin[] }>>(
      '/admins/get-all/pending-list'
    ),
  getAllEventListAdmin: (status: EventStatus | string) =>
    http.get<SuccessResponse<{ events: Event[] }>>(
      `/admins/get-all/event-list?status=${status}`
    ),
  handleStatusEventAdmin: (id: string, status: EventStatus) =>
    http.patch(`/admins/confirm-event/${id}`, { status }),
  getEventListOperator: () =>
    http.get<
      SuccessResponse<{
        events: Array<EventListOperator & { is_has_form_feedback: boolean }>
      }>
    >('/events/list-event/event-operator'),
  registerEvent: (id: string, body: FormEventRegister) =>
    http.post<SuccessResponse<{ url: string } | { register: RegisterSucces }>>(
      `/events/register-event/${id}`,
      body
    ),
  getListQuestion: (id: string) =>
    http.get<SuccessResponse<{ formQuestion: ListQuestion[] }>>(
      `/forms/question/register/${id}/`
    ),
  getListEventUser: () =>
    http.get<SuccessResponse<EventListUser>>('/users/list-register-event'),
  getTicket: (id: string) =>
    http.get<
      SuccessResponse<{
        ticket: {
          register: Ticket
          event: Event
          user_profile: User
          inforForm: { isFeedback: boolean; isHasFormFeedback: boolean }
        }
      }>
    >(`/events/ticket/${id}`),
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
    ),
  getListCheckingStaff: (id: string) =>
    http.get<SuccessResponse<{ result: User[] }>>(
      `/e-operators/event/${id}/list-checking-staff`
    ),
  addCheckingStaff: (body: { email: string; event_id: string }) =>
    http.post<SuccessResponse<{}>>('/e-operators//assign-checking-staff', body),
  unassignCheckingStaff: (event_id: string, user_id: string) =>
    http.delete<SuccessResponse<{}>>(
      `/e-operators/event/${event_id}/unassign-checking-staff/${user_id}`
    ),
  registerNoFormNoPayment: (id: string) =>
    http.post<SuccessResponse<{ register: RegisterSucces }>>(
      `/events/register-event/no-payment-no-form/${id}`
    ),
  registerEventHasFromNoPayment: (id: string, body: FormEventRegister) =>
    http.post<SuccessResponse<{ register: RegisterSucces }>>(
      `/register-event/no-payment/has-form/${id}`,
      body
    ),
  getFormFeedback: (id: string) =>
    http.get<SuccessResponse<{ formQuestion: ListQuestion[] }>>(
      `/forms/get/question/feedback/${id}`
    ),
  cancelEvent: (id: string, registerId: string) =>
    http.post<SuccessResponse<{}>>(
      `events/cancel-event/${id}?registerId=${registerId}`
    ),
  getListEventStaff: () =>
    http.get<SuccessResponse<{ events: EventList[] }>>('events/staff/list'),
  getTicketDetailFailById: (id: string) =>
    http.get<
      SuccessResponse<{
        ticket: { register: Ticket; user: User; event: Event }
      }>
    >(`/register/ticket-detail/${id}`),
  getEventByKeyWord: (keyword: string) =>
    http.get<SuccessResponse<{ events: Event[] }>>(`/events/search/${keyword}`),
  feedbackEvent: (id: string, body: FormEventRegister) =>
    http.post(`/events/feedback-event/${id}`, body),
  removeEventById: (id: string) => http.patch(`/e-operators/event/${id}`),
  getListUserRegisterEvent: (id: string) =>
    http.get<SuccessResponse<getListUserRegisterEvent>>(
      `/register/list-user/registed/${id}`
    ),
  getListUserRegistedEvent: (id: string) =>
    http.get<
      SuccessResponse<
        Array<{
          _id: string
          status_register: StatusRegisterEvent
          user_name: string
        }>
      >
    >(`/e-operators/list-registered-visitor/${id}`)
}

export default eventApi
