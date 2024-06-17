import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login/Login'
import HomePageVisitor from './pages/HomePage/HomePageVisitor'
import { AppContext } from './context/app.context'
import { useContext } from 'react'
import Profile from './pages/Profile/Profile'
import LoginOauthGoogle from './Components/LoginOauthGoogle/LoginOauthGoogle'
import { EventOperatorHome } from './pages/EventOperatorHome/EventOperatorHome'
import EventDetailPage from './pages/EventDetailPage/EventDetailPage'
import Admin from './pages/AdminPage/AdminPage'
import VerifyAccount from './Components/VerifyAccount/VerifyAccount'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Recovery from './pages/Recovery/Recovery'

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
      path: '/forgot-password',
      element: <ForgotPassword />
    },

    {
      path: '/recovery',
      element: <Recovery />
    },
    {
      path: path.profile,
      element: <Profile />
    },
    //chua set up protected routes
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        //admin
        {
          path: '/admin/*',
          element: <Admin />
        },
        //event operator

        {
          path: '/event-operator/*',
          element: <EventOperatorHome />
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
