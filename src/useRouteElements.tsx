import { useRoutes } from 'react-router-dom'
import EventList from './Components/EventLists/EventList'
import path from './constants/path'
import Register from './pages/Register/Register'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <EventList />
    },
    {
      path: path.register,
      element: <Register />
    }
  ])
  return routeElements
}

export default useRouteElements
