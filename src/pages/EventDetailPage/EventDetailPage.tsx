import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import HandleRegisterEvent from 'src/Components/HandleRegisterEvent/HandleRegisterEvent'
import { isValidToRegister } from 'src/utils/checkEventDate'
import { Button, Heading } from 'src/Components'

export default function EventDetailPage() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventApi.getEventById(id as string)
  })
  console.log(
    data &&
      isValidToRegister(
        data?.data.data.event.date_event as string,
        data?.data.data.event.time_start as string
      )
  )
  return (
    <div className='flex w-full flex-col items-center '>
      <Header className='' />
      {data &&
        !isValidToRegister(
          data.data.data.event.date_event,
          data.data.data.event.time_start
        ) && (
          <EventDetail
            event={data.data.data.event}
            renderProps={<HandleRegisterEvent event={data.data.data.event} />}
          />
        )}

      {data &&
        isValidToRegister(
          data.data.data.event.date_event,
          data.data.data.event.time_start
        ) && (
          <EventDetail
            event={data.data.data.event}
            renderProps={
              <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-pink-normail pb-[26px] shadow-md sm:pb-5'>
                <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
                  <Heading size='s' as='p' className='!font-semibold'>
                    Notification
                  </Heading>
                </div>
                <Button
                  size='lg'
                  shape='round'
                  className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 !bg-[#F5222D] text-white-A700'
                  disabled
                >
                  This event was end
                </Button>
              </div>
            }
          />
        )}

      <Footer className='' />
    </div>
  )
}
