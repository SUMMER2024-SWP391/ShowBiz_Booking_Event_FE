import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import eventApi from 'src/apis/event.api'
import { omit, pick } from 'lodash'
import {
  isAfter,
  isBefore,
  isWithinInterval,
  parse
} from 'date-fns'
import { checkEventDate } from 'src/utils/checkEventDate'
import { Heading } from 'src/Components'
import EventList from 'src/Components/EventLists/EventList'
import { useState } from 'react'

const EventListUserPage = () => {
  const [currentSelection, setCurrentSelection] = useState('Upcoming')

  const { data, isFetching } = useQuery({
    queryKey: ['event_list_user'],
    queryFn: () => eventApi.getListEventUser()
  })

  return (
    <>
      <div className=' h-screen'>
        <Header />
        <div className='container-xs '>
          <div className='flex flex-col mt-10'>
            <div className='flex flex-row items-center justify-between  '>
              <Heading as='h1' size='4xl' className=''>
                My Events
              </Heading>
              <div className=''>
                <button
                  onClick={() => setCurrentSelection('Upcoming')}
                  className={`${
                    currentSelection === 'Upcoming'
                      ? 'bg-[#51606E] text-white-A700'
                      : 'bg-white-A700 text-black'
                  } px-2 py-1 rounded-l-lg transition-colors duration-300 border border-l-2 `}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setCurrentSelection('Past')}
                  className={`${
                    currentSelection === 'Past'
                      ? 'bg-[#51606E] text-white-A700'
                      : 'bg-white-A700 text-black-900'
                  } px-2 py-1 rounded-r-lg transition-colors duration-300 border border-r-2`}
                >
                  Past
                </button>
              </div>
            </div>
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
                  parsedStartDate: parse(
                    `${event.date_event} ${event.time_start}`,
                    'dd/MM/yyyy HH:mm',
                    new Date()
                  ),
                  parsedEndDate: parse(
                    `${event.date_event} ${event.time_end}`, // Assuming `time_end` exists
                    'dd/MM/yyyy HH:mm',
                    new Date()
                  ),
                  displayDate: checkEventDate(event.date_event)
                }))
                .filter((event) => {
                  const now = new Date()
                  if (currentSelection === 'Upcoming') {
                    return (
                      isAfter(event.parsedEndDate, now) ||
                      isWithinInterval(now, {
                        start: event.parsedStartDate,
                        end: event.parsedEndDate
                      })
                    )
                  } else {
                    return isBefore(event.parsedEndDate, now)
                  }
                })
                .map((event) => {
                  console.log(event)
                  return (
                    <div
                      className={`w-full h-auto flex items-center justify-between `}
                      key={event.event_id}
                    >
                      <div className='w-[10%]'>
                        <Heading>{event.displayDate}</Heading>
                      </div>
                      <div className='mt-3 w-[80%] flex items-center'>
                        <EventList
                          className='mt-8'
                          id={event.event_id}
                          date={event.date_event}
                          time_start={event.time_start}
                          time_end={event.time_end}
                          nameEvent={event.name}
                          event_operator_name={
                            event.event_operator.event_operator[0].user_name
                          }
                          address={event.address}
                          imageUrl={event.image}
                          location={event.location}
                          price={event.ticket_price}
                        />
                      </div>
                    </div>
                  )
                })}
            <div className=''></div>
            {!isFetching && data?.data.data.events.length == 0 && (
              <h1 className='text-black-900'>You didn't register any event</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default EventListUserPage
