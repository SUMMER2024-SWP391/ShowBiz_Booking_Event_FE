import { useRoutes } from 'react-router-dom'
import EventList from './Components/EventLists/EventList'
import path from './constants/path'
import Register from './pages/Register/Register'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

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
      path: path.adminDashboard,
      element: <AdminDashboard />
    }
  ])
  return routeElements
}

export default useRouteElements
