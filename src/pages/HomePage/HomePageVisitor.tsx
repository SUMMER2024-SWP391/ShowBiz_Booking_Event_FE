import { Heading } from 'src/Components'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import Pagination from 'src/Components/Pagination/Pagination'
import { EventListConfig } from 'src/@types/event.type'
import useQueryParams from 'src/hooks/useQueryParams'
import {
  parse,
  format,
  compareAsc,
  isAfter,
  isBefore,
  isWithinInterval
} from 'date-fns'
import { checkEventDate } from 'src/utils/checkEventDate'
import { useState } from 'react'

export type QueryConfig = {
  [key in keyof EventListConfig]: string
}

export default function HomePageVisitor() {
  const [currentSelection, setCurrentSelection] = useState('Upcoming')

  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = {
    page: queryParams.page || '1',
    limit: queryParams.limit
  }
  const { data } = useQuery({
    queryKey: ['events', queryConfig],
    queryFn: () => eventApi.getListEvent(queryConfig),
    placeholderData: keepPreviousData
  })
  const filteredEvent = data?.data.data.events
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

  return (
    <>
      <div className='w-full pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='' />
          </div>
          <div className='container-xs'>
            <div className='flex flex-col justify-center mt-5'>
              <div className='flex flex-row items-center justify-between  '>
                <Heading as='h1' size='4xl' className=''>
                  {currentSelection} Events
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
              <div className='flex flex-col'>
                {filteredEvent &&
                  filteredEvent
                    .map((event) => ({
                      ...event,
                      parsedDate: parse(
                        `${event.date_event} ${event.time_start}`,
                        'dd/MM/yyyy HH:mm',
                        new Date()
                      ), // Parse and attach the parsed date for sorting
                      displayDate: checkEventDate(event.date_event)
                    }))
                    // .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate)) // Sort events by date in increasing order

                    .map((event) => (
                      <div
                        className={`w-full h-auto flex items-center justify-between `}
                      >
                        <div className='w-[10%]'>
                          <Heading>{event.displayDate}</Heading>
                        </div>
                        <div className='mt-3 w-[80%] flex items-center'>
                          <EventList
                            className='mt-8'
                            id={event._id}
                            date={event.date_event}
                            time_start={event.time_start}
                            time_end={event.time_end}
                            nameEvent={event.name}
                            event_operator_name={event.event_operator.user_name}
                            address={event.address}
                            imageUrl={event.image}
                            location={event.location}
                            price={event.ticket_price}
                          />
                        </div>
                      </div>
                    ))}

                {/* {data && (
                  <Pagination
                    pageSize={data.data.data.paginate.sum_page}
                    queryConfig={queryConfig}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
