import { SuccessResponse } from 'src/@types/utils.type'
import {
  ProfileUpdate,
  UserProfile
} from 'src/Components/ProfileComponent/ProfileComponent'
import { FormUpdateUser } from 'src/Components/UpdateProfile/UpdateProfile'
import { FormData } from 'src/pages/Login/Login'
import http from 'src/utils/http'
import { RegisterSchema } from 'src/utils/rules'

export type ResetPassword = {
  forgot_password_token: string
  password: string
  confirm_password: string
}

export type ChangePasswordBody = {
  old_password: string
  password: string
  confirm_password: string
}
const authAPI = {
  login: (body: FormData) => http.post('/users/login', body),
  logout: (body: { refresh_token: string }) => http.post('/users/logout', body),
  forgotPassword: (body: { email: string }) =>
    http.post('/users/forgot-password', body),
  resetPassword: (body: ResetPassword) =>
    http.post('/users/reset-password', body),
  getMe: () => http.get<SuccessResponse<UserProfile>>('/users/me'),
  getProfileToUpdate: () =>
    http.get<SuccessResponse<ProfileUpdate>>('/users/me'),
  updateProfile: (body: FormUpdateUser) =>
    http.patch<SuccessResponse<UserProfile>>('/users/me', body),
  changePassword: (body: ChangePasswordBody) =>
    http.post('/users/change-password', body),
  register: (body: Omit<RegisterSchema, 'confirm_password'>) =>
    http.post<SuccessResponse<{}>>('/users/register', body)
}

export default authAPI
