import React from 'react'
import { Heading } from '../Heading/Heading'
import { Event } from 'src/@types/event.type'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { Overview } from './Overview'
import { Guest } from './Guest'
import { Registration } from './Registration'
import AssignCheckingStaff from '../AssignCheckingStaff/AssignCheckingStaff'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import CheckInWithOTP from '../CheckInWithOTP/CheckInWithOTP'
import FormFeedback  from '../FormFeedback/FormFeedback'

interface Props {
  event: Event
}
export const ManageEventHome = ({ event }: Props) => {
  return (
    //name event
    <div className='flex flex-col  container-xs'>
      <div className='flex flex-row items-center justify-between'>
        <Heading
          as='h1'
          size='2xl'
          className='flex items-start !text-white-A700 !font-monterat'
        >
          {event.name}
        </Heading>
        <Link to={`http://localhost:3000/events/${event._id}`} className='flex flex-row items-center px-2 py-1 rounded-xl bg-blue_gray-900 hover:bg-blue_gray-900_01 '>
          <p className='!text-[14px] text-white-A700_bf'>Event Page</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            viewBox='0 0 24 24'
            className='w-4 h-4 ml-2 '
          >
            <path d='M7 17 17 7M7 7h10v10'></path>
          </svg>  
        </Link>
      </div>

      <div role='tablist' className='tabs tabs-bordered w-full mt-10 '>
        <NavLink role='tab' className='tab tab-active !text-white-A700' to=''>
          Overview
        </NavLink>
        <NavLink role='tab' className='tab !text-white-A700' to='guest'>
          Guest
        </NavLink>
        <NavLink to='registration' className='tab !text-white-A700'>
          Registration
        </NavLink>
        <NavLink role='tab' className='tab !text-white-A700' to='staff'>
          List Staff
        </NavLink>
        <NavLink role='tab' className='tab !text-white-A700' to='form-feedback'>
          Form Feedback
        </NavLink>
        <NavLink role='tab' className='tab !text-white-A700' to='update-form'>
          More
        </NavLink>
      </div>
      <Routes>
        <Route path='/' element={<Overview event={event} />} />
        <Route path='guest' element={<Guest />} />
        <Route path='registration' element={<Registration />} />
        {/* <Route path='update-form' element={<UpdateFormFeedback />} /> */}
        <Route path='form-feedback' element={<FormFeedback />}></Route>
        <Route path='staff' element={<AssignCheckingStaff />}></Route>
        <Route path='checkin' element={<CheckInWithOTP />}></Route>

      </Routes>
    </div>
  )
}
