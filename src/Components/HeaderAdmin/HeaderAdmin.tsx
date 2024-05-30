import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Heading } from '../Heading/Heading'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import authAPI from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import LOGO from '../../assets/img/Logo EventBooking (1).png'
import { Img } from '../Img/Img'
import { Button } from 'antd'
import path from 'src/constants/path'

interface Props {
  className?: string
}

const HeaderAdmin = ({ ...props }: Props) => {
  const { setIsAuthenticated, isAuthenticated, setProfile } =
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
  }

  return (
    <header
      {...props}
      className={`${props.className} flex flex-row justify-between items-center md:w-full gap-5 `}
    >
      <div className='flex self-start'>
        <Img
          src={LOGO}
          alt='logo'
          className='w-[12%] h-[109px] object-cover md:w-full'
        />
      </div>
      <div className='flex self-center ]'>
        <ul className='flex flex-warp gap-[45px]'>
          <li>
            <a href='/'>
              <Heading as='h6' className='!text-gray-500_02 hover:text-cyan-50'>
                Manage Event
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02 hover:text-cyan-50'>
                Visitor
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02 hover:text-cyan-50'>
                Event operator
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02 hover:text-cyan-50'>
                More
              </Heading>
            </a>
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-[19px] mr-5'>
        <a href=''>
          <SearchOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
        </a>
        <a href=''>
          <BellOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
        </a>
        {!isAuthenticated ? (
          <Link
            to={path.login}
            className='w-20 h-8 rounded-[10px] font-bold bg-blue_gray-900_03 text border border-[#e5e7eb]
             text-gray-500 flex justify-center items-center hover:bg-white-A700 hover:text-[#4096ff]
             hover:border-[#e5e7eb]'
          >
            Sign Up
          </Link>
        ) : (
          <Button
            className='min-w-[69px] rounded-[10px] font-bold bg-blue_gray-900_03 text text-gray-500'
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  )
}

export default HeaderAdmin
