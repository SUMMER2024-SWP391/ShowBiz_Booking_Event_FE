import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

const EventListStaff = () => {
  const { isFetching, data } = useQuery({
    queryKey: ['list-event-staff'],
    queryFn: () => eventApi.getListEventStaff()
  })
  console.log(data)
  return (
    <div className='containter bg-gradient_vistor'>
      <Header />
      <div className='container flex justify-center items-center'>
        <div className='flex flex-col'>
          {isFetching && (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {data &&
            data.data.data.events.map((event) => (
              <Link to={`/staff/${event._id}`} key={event._id}>
                <EventList
                  key={event._id}
                  id={event._id}
                  address={event.address}
                  imageUrl={event.image}
                  location={event.location}
                  date={event.date_event}
                  event_operator_name={event.event_operator.user_name}
                  price={event.ticket_price}
                  nameEvent={event.name}
                  time={event.time_start}
                  className='mt-8'
                />
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EventListStaff
