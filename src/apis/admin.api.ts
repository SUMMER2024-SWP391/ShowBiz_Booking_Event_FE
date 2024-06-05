import { UserList } from 'src/@types/users.type'
import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'
import { CreateEventOperatorSchema } from 'src/utils/rules'

export const adminApi = {
  getUserList: () =>
    http.get<SuccessResponse<{ users: UserList[] }>>('/admins/'),
  deleteUser: (id: string) =>
    http.delete<SuccessResponse<null>>(`/admins/${id}`),
  createEventOperator: (body: CreateEventOperatorSchema) =>
    http.post('/admins/', body)
}
