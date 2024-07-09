import { useQuery } from '@tanstack/react-query'
import { Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import authAPI from 'src/apis/auth.api'
import eventApi from 'src/apis/event.api'

const StaffPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['login'],
    queryFn: () => authAPI.login
  })

  return (
    <>
      <div className='bg-gradient_vistor'>
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
                  <Link to={`/ticket/${event.event[0]._id}`} className='mt-10'>
                    <EventList
                      key={_event._id}
                      imageUrl={_event.image}
                      nameEvent={_event.name}
                      location={_event.location}
                      event_operator_name={_eventOperator.user_name}
                      
                    />
                  </Link>
                )
              })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default StaffPage