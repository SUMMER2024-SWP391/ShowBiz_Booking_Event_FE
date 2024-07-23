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
import EventListUser from './pages/EventListUserPage/EventListUserPage'
import TicketDetail from './pages/TicketDetail/TicketDetail'
import CheckInWithOTP from './Components/CheckInWithOTP/CheckInWithOTP'
import Register from './pages/Register/Register'
import StaffPage from './pages/StaffPage/StaffPage'
import ManagerEventPage from './pages/ManageEventPage/ManageEventPage'
import EventListStaff from './pages/EventListStaff/EventListStaff'
import HomeForSearch from './pages/HomePage/HomeForSearch'
import EventListUserPage from './pages/EventListUserPage/EventListUserPage'
import ChangePassword from './Components/ChangePassword/ChangePassword'

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
      path: '/search',
      element: <HomeForSearch />
    },
    {
      path:'/profile/change_password',
      element: <ChangePassword />
    },
    {
      path: path.verify_account,
      element: <VerifyAccount />
    },
    {
      path: '/register',
      element: <Register />
    },
    // {
    //   path: '/checkin/:id', //event id
    //   element: <CheckInWithOTP />
    // },

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
      path: '/staff/:id',
      element: <StaffPage />
    },

    {
      path: '/recovery',
      element: <Recovery />
    },

    //chua set up  protected routes
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
        },
        {
          path: '/event-operator/manage/:id/*',
          element: <ManagerEventPage />
        },
        {
          path: '/event-list/users',
          element: <EventListUserPage />
        },
        {
          path: '/event-list/staff',
          element: <EventListStaff />
        },
        {
          path: path.profile,
          element: <Profile />
        },
        {
          path: '/ticket/:id',
          element: <TicketDetail />
        },
        {
          path: '/checkin/:id',
          element: <StaffPage />
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
