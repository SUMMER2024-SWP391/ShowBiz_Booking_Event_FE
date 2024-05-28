import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  id: string
  name: string
  email?: string
  status: UserVerifyStatus
  password?: string
  phone?: string
  dateOfBirth?: string
  points?: string
  createdAt?: string
  updatedAt?: string
  role: UserRole
}

export interface EventOperator {
  eventOperatorId: string
  email: string
  password: string
  createAt: Date
  name: string
  role?: UserRole
}
