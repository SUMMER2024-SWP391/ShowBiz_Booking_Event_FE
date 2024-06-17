import { NavLink, Route, Routes } from 'react-router-dom'
import { Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { Events } from '../Events/Events'
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import EventListOperator from 'src/Components/EventListOperator/EventListOperator'

export const EventOperatorHome = () => {
  return (
    <>
      <div className='w-full bg-blue_gray-900 pb-[376px] md:pb-5 '>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='bg-blue_gray-900' />
          </div>
          <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
            <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
              <div className='w-[96%] md:w-full'>
                <div className='flex flex-col'>
                  <div className='container-xs relative mt-[-3px] flex flex-col items-start pl-[174px] pr-[633px] md:p-5 md:px-5'>
                    <Heading size='4xl' as='h1' className=''>
                      Event Operator
                    </Heading>
                  </div>
                  <div role='tablist' className='tabs tabs-bordered '>
                    <NavLink
                      role='tab'
                      className='tab tab-active !text-white-A700'
                      to='/event-operator/'
                    >
                      Events
                    </NavLink>
                    <NavLink role='tab' className='tab !text-white-A700' to={''}>
                      People
                    </NavLink>
                    <NavLink to='/event-operator/event-list' className='tab !text-white-A700' >
                      Event List
                    </NavLink>
                    <NavLink role='tab' className='tab !text-white-A700' to={''}>
                      Insights
                    </NavLink>
                    <NavLink role='tab' className='tab !text-white-A700' to={''}>
                      Setting
                    </NavLink>
                  </div>
                  <div className='mt-10'>
                  <Routes>
                    <Route path='event-list' element={<EventListOperator />} />
                    <Route index element={<Events />} />
                    <Route path='create' element={<CreateEvent />} />
                  </Routes>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
