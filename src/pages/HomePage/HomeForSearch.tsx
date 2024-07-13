import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import useQueryParams from 'src/hooks/useQueryParams'

const HomeForSearch = () => {
  const { keyword } = useQueryParams()
  const { data } = useQuery({
    queryKey: ['search-event', keyword],
    queryFn: () => eventApi.getEventByKeyWord(keyword)
  })
  return (
    <div className='container bg-gradient_vistor'>
      <Header />
      <div className='flex flex-col items-center'>
        {data &&
          data.data.data.events.map((event) => (
            <Link to={`/events/${event._id}`}>
              <div className='flex flex-row justify-center' key={event._id}>
                <EventList
                  className='mt-8'
                  id={event._id}
                  date={event.date_event}
                  time={event.time_start}
                  nameEvent={event.name}
                  event_operator_name={event.event_operator.user_name}
                  address={event.address}
                  imageUrl={event.image}
                  location={event.location}
                  price={event.ticket_price}
                />
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  )
}

export default HomeForSearch
