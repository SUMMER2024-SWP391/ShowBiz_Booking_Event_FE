import EventList from './pages/EventList/EventList'
import { useRoutes } from 'react-router-dom'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <EventList />
    }
  ])
  return routeElements
}

export default useRouteElements
