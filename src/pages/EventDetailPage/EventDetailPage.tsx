import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Event } from 'src/@types/event.type'
import EventDetail from 'src/Components/EventDetail/EventDetail'

export default function EventDetailPage() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['student', id],
    queryFn: () => eventApi.getEventById(id as string)
  })
  const event = data?.data.data.event as Event
  console.log(event)

  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-blue_gray-900'>
      <Header className='bg-blue_gray-900' />
      {event && <EventDetail event={event} />}
      <Footer className='bg-blue_gray-900' />
    </div>
  )
}
