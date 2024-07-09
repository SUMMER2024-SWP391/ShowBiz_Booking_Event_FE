import { Link, NavLink, useNavigate } from 'react-router-dom'

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
export default function HeaderEO({ ...props }: Props) {
  

  return (
    <div className='w-full'>
      <header
        {...props}
        className={`${props.className} w-full h-[100px] flex flex-row justify-around items-center md:w-full`}
      >
            <li>
              <NavLink to='/event-operator/create'>
                <Heading as='h6' className=' hover:text-white-A700'>
                  Create Event
                </Heading>
              </NavLink>
            </li>
            <li>
              <Link to='/event-operator'>
                <Heading as='h6' className='hover:text-white-A700'>
                  My Event
                </Heading>
              </Link>
            </li>
            <li>
              <a href='#'>
                <Heading as='h6' className='hover:text-white-A700'>
                  Setting
                </Heading>
              </a>
            </li>
            <li>
              <a href='#'>
                <Heading as='h6' className='hover:text-white-A700'>
                  Events
                </Heading>
              </a>
            </li>
         
        
      </header>
    </div>
  )
}
