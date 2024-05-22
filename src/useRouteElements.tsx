import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import Register from './pages/Register/Register'
import HomePageVisitor from './pages/HomePage/HomePageVisitor'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <HomePageVisitor />
    },
    {
      path: path.register,
      element: <Register />
    }
  ])
  return routeElements
}

export default useRouteElements
