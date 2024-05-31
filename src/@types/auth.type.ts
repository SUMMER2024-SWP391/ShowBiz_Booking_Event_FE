import { User } from './users.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  token: {
    accessToken: string
    refreshToken: string
    expiresInOfAccessToken: number
  }
  user: Pick<User, '_id' | 'user_name' | 'role' | 'status'>
}>
