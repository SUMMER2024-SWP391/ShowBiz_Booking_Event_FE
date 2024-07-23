import { UserRole } from 'src/@types/enum'
import { UserList } from 'src/@types/users.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'
import { CreateEventOperatorSchema } from 'src/utils/rules'

export const adminApi = {
  getUserList: (role: UserRole | string) =>
    http.get<SuccessResponse<{ users: UserList[] }>>(
      `/admins/list/user?role=${role}`
    ),
  deleteUser: (id: string) =>
    http.delete<SuccessResponse<null>>(`/admins/${id}`),
  createEventOperator: (body: CreateEventOperatorSchema) =>
    http.post('/users/register-event-operator', body),
  getStatistical: () =>
    http.get<SuccessResponse<{ data: any }>>('/events/data/statistical')
}
