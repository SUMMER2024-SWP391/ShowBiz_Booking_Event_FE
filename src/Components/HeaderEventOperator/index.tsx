import { Link, NavLink } from 'react-router-dom'

import { Heading } from '../Heading/Heading'

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
            <Heading as='h6' className=' hover:text-black_supper_light'>
              Create Event
            </Heading>
          </NavLink>
        </li>
        <li>
          <Link to='/event-operator'>
            <Heading as='h6' className='hover:text-black_supper_light'>
              My Event
            </Heading>
          </Link>
        </li>
      </header>
    </div>
  )
}
