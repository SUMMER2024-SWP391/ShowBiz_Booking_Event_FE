import { Link, NavLink } from 'react-router-dom'

import { Heading } from '../Heading/Heading'

import { AppContext } from 'src/context/app.context'
import { useContext } from 'react'

interface Props {
  className?: string
  name?: string
  _id?: string
}
export default function HeaderVistor({ ...props }: Props) {
  const { isStaff } = useContext(AppContext)
  return (
    <div className='w-full'>
      <header
        {...props}
        className={`${props.className} w-full h-[100px] flex flex-row justify-around items-center md:w-full`}
      >
        <li>
          <NavLink to='/'>
            <Heading as='h6' className='  hover:text-black_dark'>
              Home
            </Heading>
          </NavLink>
        </li>
        <li>
          <Link to='/event-list/users'>
            <Heading as='h6' className=' hover:text-black_dark'>
              My Event
            </Heading>
          </Link>
        </li>
        <li>
          <a href='#'>
            <Heading as='h6' className=' hover:text-black_dark'>
              Calendar
            </Heading>
          </a>
        </li>
        {isStaff ? (
          <li>
            <Link to='/event-list/staff'>
              <Heading as='h6' className=' hover:text-black_dark'>
                Staff
              </Heading>
            </Link>
          </li>
        ) : (
          <></>
        )}
      </header>
    </div>
  )
}
