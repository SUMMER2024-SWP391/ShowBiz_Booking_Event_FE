import React from 'react'
import { Heading } from '../Heading/Heading'
import { Event } from 'src/@types/event.type'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Overview } from './Overview'
import { Guest } from './Guest'
import { Registration } from './Registration'
import { Staff } from './Staff'
import UpdateFormFeedback from '../UpdateFormFeedback/UpdateFormFeedback'
import FormFeedback from '../FormFeedback/FormFeedback'
import AssignCheckingStaff from '../AssignCheckingStaff/AssignCheckingStaff'

interface Props {
  event: Event
}
export const ManageEventHome = ({ event }: Props, className: string) => {
  return (
    //name event
    <div className='flex flex-col items-start container-xs'>
      <Heading
        as='h1'
        size='2xl'
        className='flex items-start !text-white-A700 !font-monterat'
      >
        {event.name}
      </Heading>
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
          Staff
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
        <Route
          path='staff'
          element={<AssignCheckingStaff />}
        ></Route>
      </Routes>
    </div>
  )
}
