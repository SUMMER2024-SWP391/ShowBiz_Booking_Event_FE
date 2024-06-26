import { Link, useNavigate } from 'react-router-dom'

import { Heading } from '../Heading/Heading'
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { AppContext } from 'src/context/app.context'
import { useContext } from 'react'
import path from 'src/constants/path'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { UserRole } from 'src/@types/enum'
import AvatarProfile from '../AvatarProfile/AvatarProfile'

interface Props {
  className?: string
  name?: string
  _id?: string
}
export default function Header({ ...props }: Props) {
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } =
    useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: (refresh_token: string) => authAPI.logout({ refresh_token }),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate(refresh_token)
    navigate('/')
  }

  return (
    <div className='w-full'>
      <header
        {...props}
        className={`${props.className} w-full h-[100px] flex flex-row justify-around items-center md:w-full`}
      >
        <Heading as='h1' size='2xl' className=''>
          eventbok.
        </Heading>

        <div className='w-[500px] flex justify-center'>
          <ul className='w-full flex justify-around'>
            {isAuthenticated && profile?.role == UserRole.Admin && (
              <li>
                <Link to='/admin'>
                  <Heading
                    as='h6'
                    className='!text-gray-500_02 hover:text-cyan-50'
                  >
                    Dashboard
                  </Heading>
                </Link>
              </li>
            )}
            {isAuthenticated && profile?.role == UserRole.EventOperator && (
              <Link to='/event-operator'>
                <Heading
                  as='h6'
                  className='!text-gray-500_02 hover:text-cyan-50'
                >
                  Event Operator
                </Heading>
              </Link>
            )}
            <li>
              <a href='/'>
                <Heading as='h6' className=' hover:text-cyan-50'>
                  Home
                </Heading>
              </a>
            </li>
            <li>
              <Link to='/event-list/users'>
                <Heading
                  as='h6'
                  className='!text-gray-500_02 hover:text-cyan-50'
                >
                  My Event
                </Heading>
              </Link>
            </li>
            <li>
              <a href='#'>
                <Heading
                  as='h6'
                  className='!text-gray-500_02 hover:text-cyan-50'
                >
                  Calendar
                </Heading>
              </a>
            </li>
            <li>
              <a href='#'>
                <Heading
                  as='h6'
                  className='!text-gray-500_02 hover:text-cyan-50'
                >
                  Events
                </Heading>
              </a>
            </li>
          </ul>
        </div>
        <div className='flex justify-around items-center'>
          <a href=''>
            <SearchOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
          </a>
          <a href=''>
            <BellOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
          </a>
          {!isAuthenticated ? (
            <Link
              to={path.login}
              className='w-20 h-8 rounded-[10px] font-bold bg-blue_gray-900_03 text 
             text-gray-500 flex justify-center items-center hover:text-white-A700_bf
             hover:border-[#e5e7eb]'
            >
              Log In
            </Link>
          ) : (
            <AvatarProfile onClick={handleLogout} />
            // <Button
            //   className='min-w-[69px] rounded-[10px] font-bold bg-blue_gray-900_03 text text-gray-500'
            //   onClick={handleLogout}
            // >
            //   Logout
            // </Button>
          )}
        </div>
      </header>
    </div>
  )
}
