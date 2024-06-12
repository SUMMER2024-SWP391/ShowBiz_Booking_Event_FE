import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  _id: string
  user_name: string
  email: string
  status: UserVerifyStatus
  password: string
  phone_number: string
  date_of_birth: string
  point: string
  createdAt: string
  updatedAt: string
  role: UserRole
}

export type UserList = Pick<
  User,
  '_id' | 'user_name' | 'email' | 'role' | 'status'
>

export type ProfileUpdate = {
  user_name: string
  email: string
  phone_number: string
  date_of_birth: string
}
