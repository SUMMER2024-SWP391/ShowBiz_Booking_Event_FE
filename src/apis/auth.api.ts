import { AuthResponse } from 'src/@types/auth.type'
import { FormData } from 'src/pages/Login/Login'
import http from 'src/utils/http'

const authAPI = {
  login: (body: FormData) => http.post<AuthResponse>('/users/login', body),
  logout: (refresh_token: string) =>
    http.post('/users/logout', { refresh_token })
}

export default authAPI
