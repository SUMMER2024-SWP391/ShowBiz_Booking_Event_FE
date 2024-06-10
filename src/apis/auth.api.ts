import { FormData } from 'src/pages/Login/Login'
import http from 'src/utils/http'

export type ResetPassword = {
  forgot_password_token: string
  password: string
  confirm_password: string
}

const authAPI = {
  login: (body: FormData) => http.post('/users/login', body),
  logout: (body: { refresh_token: string }) => http.post('/users/logout', body),
  forgotPassword: (body: { email: string }) =>
    http.post('/users/forgot-password', body),
  resetPassword: (body: ResetPassword) =>
    http.post('/users/reset-password', body)
}

export default authAPI
