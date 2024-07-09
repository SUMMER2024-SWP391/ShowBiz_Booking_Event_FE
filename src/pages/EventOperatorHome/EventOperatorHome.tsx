import { NavLink, Route, Routes } from 'react-router-dom'
import { Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { Events } from '../Events/Events'
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import EventListOperator from 'src/Components/EventListOperator/EventListOperator'
import FormFeedback from 'src/Components/FormFeedback/FormFeedback'
import UpdateFormFeedback from 'src/Components/UpdateFormFeedback/UpdateFormFeedback'
import AssignCheckingStaff from 'src/Components/AssignCheckingStaff/AssignCheckingStaff'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import EventList from 'src/Components/EventLists/EventList'

export const EventOperatorHome = () => {
  // const { data, isFetching } = useQuery({
  //   queryKey: ['event-list-operator'],
  //   queryFn: () => eventApi.getEventListOperator()
  // })
  return (
    <>
      <div className='w-full bg-blue_gray-900 pb-[376px] md:pb-5 '>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='bg-blue_gray-900' />
          </div>
          <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
            <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
              <div className='w-[100%] md:w-full'>
                <div className='flex flex-col'>
                  <div className='container-xs '>
                    <Heading size='4xl' as='h1' className=''>
                      Events
                    </Heading>
                    {/* {data?.data.data.events.map((event) => (
                      <EventList id={event._id} nameEvent={event.name} location={event.location} ap />
                    ))} */}

                    <div className='mt-10'>
                      <Routes>
                        <Route
                          path='/'
                          element={<EventListOperator />}
                        />
                        {/* khi nào không có event thì mới dùg cái role dưới */}
                        {/* <Route index element={<Events />} /> */}

                        <Route
                          path='update-form/:id'
                          element={<UpdateFormFeedback />}
                        />
                        <Route path='create' element={<CreateEvent />} />
                        <Route
                          path='form-feedback/:id'
                          element={<FormFeedback />}
                        ></Route>
                        <Route
                          path='assign-checking-staff/:id'
                          element={<AssignCheckingStaff />}
                        ></Route>
                      </Routes>
                    </div>
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
