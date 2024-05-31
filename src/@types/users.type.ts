import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  _id: string
  user_name: string
  email?: string
  status: UserVerifyStatus
  password?: string
  phone_number?: string
  dateOfBirth?: string
  points?: string
  createdAt?: string
  updatedAt?: string
  role: UserRole
}
