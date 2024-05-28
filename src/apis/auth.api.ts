import { FormData } from 'src/pages/Login/Login'
import http from 'src/utils/http'

const authAPI = {
  login: (body: FormData) => http.post('/users/login', body),
  logout: (body: { refresh_token: string }) => http.post('/users/logout', body)
}

export default authAPI
