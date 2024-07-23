// ExampleComponent.tsx

import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authAPI from 'src/apis/auth.api'
type Props = {
  classname?: string
  onClick?: () => void
  name?: string
  _id?: string
}
const AvatarProfile = (prop: Props) => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => authAPI.getMe()
  })
  // console.log(data?.data.data.user.user_name)
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }
  return (
    <div className=' flex items-center'>
      <div
        onClick={toggleOpen}
        className={`relative border-b-4 border-transparent py-3 `}
      >
        <div className='flex items-center space-x-2 cursor-pointer'>
          <div className='font-semibold text-[14px]'>
            <div className='cursor-pointer'>
              {data?.data.data.user.user_name}
            </div>
          </div>
          <div className='w-[24px] h-[24px] rounded-full overflow-hidden border-2 dark:border-white border-gray-900'>
            <img
              src='https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        {open && (
          <div className='absolute w- px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5'>
            <ul className='space-y-3 dark:text-white'>
              <li className='font-medium'>
                <Link
                  to='/profile/info'
                  className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent'
                >
                  <div className='mr-3'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  Account
                </Link>
              </li>
              <li className='font-medium'>
                <Link
                  to='/profile/change_password'
                  className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent'
                >
                  <div className='mr-3'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  Setting
                </Link>
              </li>
              <hr className='dark:border-gray-700' />
              <li className='font-medium'>
                <button
                  className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent'
                  onClick={prop.onClick}
                >
                  <div className='mr-3 text-red-600'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                  </div>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AvatarProfile
