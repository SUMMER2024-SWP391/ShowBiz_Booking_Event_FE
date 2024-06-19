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

  console.log(data)
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
            data?.data.data.events.map((event) => (
              <EventList
                key={event._id}
                imageUrl={event.event[0].image}
                nameEvent={event.event[0].name}
                location={event.event[0].location}
                event_operator_name={event.event_operator[0].user_name}
                className='mb-6'
                renderProps={
                  <Button
                    className='text-white-A700 bg-black-900 h-8 w-[80px] flex justify-center items-center rounded-[5px] p-2 text-sm border border-[#e5e7eb] hover:bg-white-A700 hover:text-[#4096ff]
    hover:border-[#e5e7eb]'
                  >
                    <Link to={`/ticket/${event.event[0]._id}`}>
                      Ticket detail
                    </Link>
                  </Button>
                }
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EventListUser
