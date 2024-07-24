import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import EventListOfStaff from 'src/Components/EventListOfStaff/EventListOfStaff'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

const EventListStaff = () => {
  const { isFetching, data } = useQuery({
    queryKey: ['list-event-staff'],
    queryFn: () => eventApi.getListEventStaff()
  })
  return (
    <div className='containter-xs'>
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
              <Link to={`/checkin/${event._id}`} key={event._id}>
                <EventListOfStaff
                  key={event._id}
                  id={event._id}
                  address={event.address}
                  imageUrl={event.image}
                  location={event.location}
                  date={event.date_event}
                  event_operator_name={event.event_operator.user_name}
                  price={event.ticket_price}
                  nameEvent={event.name}
                  time_start={event.time_start}
                  time_end={event.time_end}
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
