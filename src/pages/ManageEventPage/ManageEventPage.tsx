import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Event } from 'src/@types/event.type'
import { ManageEventHome } from 'src/Components/ManageEvent/ManageEventHome'

export default function ManagerEventPage() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['student', id],
    queryFn: () => eventApi.getEventById(id as string)
  })
  const event = data?.data.data.event as Event
  return (
    <div className='flex w-full flex-col items-center gap-[61px] '>
      <Header className='' />
      {event && <ManageEventHome event={event} />}
      <Footer className='' />
    </div>
  )
}
