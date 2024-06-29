import { useQuery } from '@tanstack/react-query'
import { Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import eventApi from 'src/apis/event.api'

const EventListUser = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event_list_user'],
    queryFn: () => eventApi.getListEventUser()
  })

  return (
    <>
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
          {!isFetching &&
            data?.data.data.events.map((event) => {
              const _event = event.event[0]
              const _eventOperator = event.event_operator[0]
              console.log(event)
              return (
                <Link to={`/ticket/${event.event[0]._id}`}>
                  <EventList
                    key={_event._id}
                    imageUrl={_event.image}
                    nameEvent={_event.name}
                    location={_event.location}
                    event_operator_name={_eventOperator.user_name}
                    className='mb-6 w-[800px] !bg-blue_gray-900'
                  />
                </Link>
              )
            })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EventListUser
