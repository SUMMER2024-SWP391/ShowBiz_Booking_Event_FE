import path from './constants/path'
import EventList from './pages/EventList/EventList'
import { useRoutes } from 'react-router-dom'
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
