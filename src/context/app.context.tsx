import { createContext, useState } from 'react'
import { Event } from 'src/@types/event.type'
import { User } from 'src/@types/users.type'

import { getAccessTokenFromLS, getProfileFormLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setListEvent: React.Dispatch<React.SetStateAction<Event | null>>
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setListEvent: () => null,
  setIsAuthenticated: () => null,
  profile: getProfileFormLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [listEvent, setListEvent] = useState([])
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setListEvent,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
