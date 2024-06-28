import { SuccessResponse } from 'src/@types/utils.type'
import http from 'src/utils/http'

const paymentAPI = {
  pay: (id: string) =>
    http.post<SuccessResponse<{ url: string }>>(`/zalo/payment/${id}`)
}

export default paymentAPI
