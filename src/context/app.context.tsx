import { createContext, useState } from 'react'
import { Event } from 'src/@types/event.type'
import { User } from 'src/@types/users.type'

import {
  getAccessTokenFromLS,
  getIsStaffFormLs,
  getProfileFormLS
} from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  isStaff: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setIsStaff: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  // setListEvent: React.Dispatch<React.SetStateAction<Event | null>>
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  eventId: string
  setEventId: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  isStaff: Boolean(getIsStaffFormLs()),
  // setListEvent: () => null,
  setIsAuthenticated: () => null,
  profile: getProfileFormLS(),
  setProfile: () => null,
  setIsStaff: () => null,
  eventId: '',
  setEventId: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  // const [listEvent, setListEvent] = useState([])
  const [isStaff, setIsStaff] = useState<boolean>(initialAppContext.isStaff)
  const [eventId, setEventId] = useState<string>(initialAppContext.eventId)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        // setListEvent,
        isStaff,
        setIsStaff,
        setProfile,
        eventId,
        setEventId
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
