import { Route, Routes } from 'react-router-dom'
import { Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import EventListOperator from 'src/Components/EventListOperator/EventListOperator'
import FormFeedback from 'src/Components/FormFeedback/FormFeedback'
import UpdateFormFeedback from 'src/Components/UpdateFormFeedback/UpdateFormFeedback'
import AssignCheckingStaff from 'src/Components/AssignCheckingStaff/AssignCheckingStaff'
import ManagerEventPage from '../ManageEventPage/ManageEventPage'

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
                    <div className='mt-10'>
                      <Routes>
                        <Route index element={<EventListOperator />} />
                        {/* khi nào không có event thì mới dùg cái role dưới */}
                        {/* <Route index element={<Events />} /> */}
                        <Route path='manage/:id/' element={<ManagerEventPage/>}/>
                        <Route path='create' element={<CreateEvent />} />
                        
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
