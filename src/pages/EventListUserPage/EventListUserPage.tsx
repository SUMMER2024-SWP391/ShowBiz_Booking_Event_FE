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
import HandleFeedbackEventOfUser from 'src/Components/FeedbackEventOfUser/FeedbackEventOfUser'

const EventListUserPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event_list_user'],
    queryFn: () => eventApi.getListEventUser()
  })

  return (
    <>
      <div className='bg-gradient_vistor h-screen'>
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
              data?.data.data.events.length != 0 &&
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
                  const dateEvent = _event.date_event.split('/')
                  const nowDate = [
                    new Date().getDate().toString(),
                    '0' + (new Date().getMonth() + 1).toString(),
                    new Date().getFullYear().toString()
                  ]

                  const isToday =
                    JSON.stringify(dateEvent) <= JSON.stringify(nowDate)

                  const timeEvent = _event.time_end.split(':')
                  const nowTime = [
                    new Date().getHours().toString(),
                    new Date().getMinutes().toString()
                  ]
                  let isValidTime = false
                  if (
                    Number(timeEvent[0]) * 60 +
                      Number(timeEvent[1]) -
                      (Number(nowTime[0]) * 60 + Number(nowTime[1])) <=
                    15
                  ) {
                    //check thời gian hiện tại so với thời gian event có bé hơn 15p ko nếu có thì
                    //hiển thị form feedback
                    isValidTime = true
                  }
                  console.log(isValidTime)
                  if (_event.status_check_in && isToday && isValidTime) {
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
                          event_operator_name={
                            _event.event_operator.event_operator[0].user_name
                          }
                        />
                      </Link>
                    )
                  }
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
                        event_operator_name={
                          _event.event_operator.event_operator[0].user_name
                        }
                      />
                    </Link>
                  )
                })}
            {!isFetching && data?.data.data.events.length == 0 && (
              <h1 className='text-white-A700'>You didn't register any event</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default EventListUserPage
