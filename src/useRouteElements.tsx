import path from './constants/path'
import EventList from './pages/EventList/EventList'
import { useRoutes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <EventList />
    },
    {
      path: path.register,
      element: <Register />
    },
    {
      path: path.login,
      element: <Login />
    }
  ])
  return routeElements
}

export default useRouteElements
