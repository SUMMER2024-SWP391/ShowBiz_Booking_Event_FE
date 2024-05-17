export interface User {
  id: string
  name: string
  email: string
  status: string
  password: string
  phone: string
  dateOfBirth: string
  points: string
  createdAt: string
  updatedAt: string
  role: string
}

export interface EventOperator {
  eventOperatorId: string
  email: string
  password: string
  createAt: Date
  name: string
}
