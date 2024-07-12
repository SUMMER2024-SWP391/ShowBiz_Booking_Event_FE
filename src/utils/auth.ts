import { User } from 'src/@types/users.type'

export const setTokenToLS = (
  access_token: string,
  refresh_token: string
): void => {
  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLocalStorage = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('isStaff')
}

export const getAccessTokenFromLS = (): string =>
  localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = (): string =>
  localStorage.getItem('refresh_token') || ''

export const getProfileFormLS = (): User | null => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const setProfileToLS = (profile: User): void => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getIsStaffFormLs = (): string => {
  const isStaff = localStorage.getItem('isStaff')
  return isStaff ? JSON.parse(isStaff) : ''
}

export const setIsStaffToLS = (isStaff: boolean): void => {
  localStorage.setItem('isStaff', JSON.stringify(isStaff))
}

export const setEventIdToLS = (eventId: string): void => {
  localStorage.setItem('eventId', eventId)
}

export const getEventIdFromLS = (): string =>
  localStorage.getItem('eventId') || ''

export const clearEventIdFromLS = (): void => {
  localStorage.removeItem('eventId')
}
