import { useRoutes } from 'react-router-dom'
import EventList from './Components/EventLists/EventList'

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
