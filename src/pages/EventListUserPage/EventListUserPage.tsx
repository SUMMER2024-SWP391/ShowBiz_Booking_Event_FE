import { useQuery } from '@tanstack/react-query'
import { Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import EventUserList from 'src/Components/EventListUser/EventListUser'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import eventApi from 'src/apis/event.api'
import { omit, pick } from 'lodash'
import { StatusRegisterEvent } from 'src/@types/utils.type'
import { compareAsc, parse } from 'date-fns'

const EventListUserPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event_list_user'],
    queryFn: () => eventApi.getListEventUser()
  })
  console.log(
    data?.data.data.events
      .map((event) => {
        const eventDetail = event.event[0]
        return {
          ...eventDetail,
          event_id: eventDetail._id,
          event_operator: pick(event, ['event_operator']),
          ...omit(event, ['event', 'event_operator'])
        }
      })
      .map((event) => ({
        ...event,
        parsedDate: parse(event.date_event, 'dd/MM/yyyy', new Date())
      }))
      .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate))
      .map((event) => event)
  )
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
              data?.data.data.events
                .map((event) => {
                  const eventDetail = event.event[0]
                  return {
                    ...eventDetail,
                    event_id: eventDetail._id,
                    event_operator: pick(event, ['event_operator']),
                    ...omit(event, ['event', 'event_operator'])
                  }
                })
                .map((event) => ({
                  ...event,
                  parsedDate: parse(event.date_event, 'dd/MM/yyyy', new Date())
                }))
                .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate))
                .map((_event) => {
                  if (_event.status_register == StatusRegisterEvent.SUCCESS) {
                    return (
                      <Link
                        key={_event._id}
                        to={`/events/${_event.event_id}`}
                        className='mt-10'
                      >
                        <EventUserList
                          key={_event._id}
                          imageUrl={_event.image}
                          nameEvent={_event.name}
                          location={_event.location}
                          // event_operator_name={_eventOperator.user_name}
                          date={_event.date_event}
                          time={_event.time_start}
                          price={_event.ticket_price}
                        />
                      </Link>
                    )
                  }
                })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default EventListUserPage
