import http from 'src/utils/http'

const paymentAPI = {
  pay: (id: string) => http.post(`/zalo/payment/${id}`)
}

export default paymentAPI
