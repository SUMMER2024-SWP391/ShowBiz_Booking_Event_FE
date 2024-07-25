import { Route, Routes } from 'react-router-dom'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import EventListOperator from 'src/Components/EventListOperator/EventListOperator'
import ManagerEventPage from '../ManageEventPage/ManageEventPage'
// import ListAnswer from 'src/Components/ListAnswer/ListAnswer'

export const EventOperatorHome = () => {
  // const { data, isFetching } = useQuery({
  //   queryKey: ['event-list-operator'],
  //   queryFn: () => eventApi.getEventListOperator()
  // })
  return (
    <>
      <div className='w-full pb-[376px] md:pb-5 '>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <Header />
          <div className='flex flex-col items-center self-stretch'></div>
          <div className='container-xs'>
            <div className='flex flex-col'>
              <div className='container-xs'>
                <Routes>
                  <Route index element={<EventListOperator />} />
                  {/* khi nào không có event thì mới dùg cái role dưới */}
                  {/* <Route index element={<Events />} /> */}
                  <Route path='manage/:id/' element={<ManagerEventPage />} />
                  <Route path='create' element={<CreateEvent />} />
                  {/* <Route path='statistical-answer/:id' element={<ListAnswer />}></Route> */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
