import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login/Login'
import HomePageVisitor from './pages/HomePage/HomePageVisitor'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <HomePageVisitor />
    },
    {
      path: path.register,
      element: <Login />
    }
  ])
  return routeElements
}

export default useRouteElements
