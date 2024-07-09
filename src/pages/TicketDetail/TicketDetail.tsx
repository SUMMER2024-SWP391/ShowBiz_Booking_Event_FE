import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

const TicketDetail = () => {
  const { id } = useParams()
  const { isFetching, data } = useQuery({
    queryKey: ['ticket-detail'],
    queryFn: () => eventApi.getTicket(id as string)
  })
  console.log(data?.data.data.ticket)
  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-gradient_vistor'>
      <Header className='' />
      {isFetching && (
        <>
          <Skeleton />
        </>
      )}
      {data?.data.data.ticket && (
        <EventDetail event={data.data.data.ticket.event} renderProps={<></>} />
      )}
      <Footer className='' />
    </div>
  )
}

export default TicketDetail
