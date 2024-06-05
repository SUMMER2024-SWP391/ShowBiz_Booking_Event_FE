import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login/Login'
import HomePageVisitor from './pages/HomePage/HomePageVisitor'
import { AppContext } from './context/app.context'
import { useContext } from 'react'
import Profile from './pages/Profile/Profile'
import LoginOauthGoogle from './Components/LoginOauthGoogle/LoginOauthGoogle'
import { EventOperatorHome } from './pages/EventOperatorHome/EventOperatorHome'
import { Events } from './pages/Events/Events'
import EventDetailPage from './pages/EventDetailPage/EventDetail'
import Admin from './pages/Admin/Admin'
import CreateEvent from './pages/CreateEvent/CreateEvent'
import VerifyAccount from './Components/VerifyAccount/VerifyAccount'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: path.verify_account,
      element: <VerifyAccount />
    },
    {
      path: '/',
      index: true,
      element: <HomePageVisitor />
    },
    {
      path: '/admin/*',
      element: <Admin />
    },
    {
      path: '/createEvent',
      element: <CreateEvent />
    },

    {
      path: '/eventoperator',
      element: <EventOperatorHome />
    },
    {
      path: '/eventoperator/Events',
      element: <Events />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: <Profile />
        }
      ]
    },
    {
      path: `/events/:id`,
      element: <EventDetailPage />
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.loginOauthGoogle,
          element: <LoginOauthGoogle />
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
