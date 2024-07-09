import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Event } from 'src/@types/event.type'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import HandleRegisterEvent from 'src/Components/HandleRegisterEvent/HandleRegisterEvent'
import { Text } from 'src/Components'

export default function EventDetailPage() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventApi.getEventById(id as string)
  })
  const event = data?.data.data.event as Event

  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-gradient_vistor'>
      <Header className='' />
      {event && (
        <EventDetail
          event={event}
          renderProps={
            <>
              <HandleRegisterEvent event={event} />

              <Text
                size='s'
                as='p'
                className='!text-white-A700 ml-1.5 mt-[30px] md:ml-0'
              >
                About Event
              </Text>
              <div className='flex flex-col items-start'>
                <div className='mt-4 ml-6 h-px self-stretch bg-white-A700_99 md:ml-0' />
                <Text
                  size='md'
                  as='p'
                  className='mt-[17px] w-[98%] leading-4 md:w-full !font-medium !font-monterat'
                >
                  <>{event.description}</>
                </Text>
                <div className='mt-9 flex flex-col items-start gap-2 self-stretch '>
                  <Text size='s' as='p' className='!text-white-A700'>
                    {`Location ${event.location}`}
                  </Text>
                  <div className='ml-6 h-px self-stretch bg-white-A700_99 md:ml-0' />
                </div>
              </div>
            </>
          }
        />
      )}
      <Footer className='' />
    </div>
  )
}
