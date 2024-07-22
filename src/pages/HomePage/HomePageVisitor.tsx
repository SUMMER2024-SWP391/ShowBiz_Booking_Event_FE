import { Button, Heading, Img, Text } from 'src/Components'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import {
  ArrowRightOutlined,
  DownOutlined,
  EnvironmentOutlined,
  UserOutlined
} from '@ant-design/icons'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import Pagination from 'src/Components/Pagination/Pagination'
import { EventListConfig } from 'src/@types/event.type'
import useQueryParams from 'src/hooks/useQueryParams'
import { parse, format, compareAsc } from 'date-fns'
import { checkEventDate } from 'src/utils/checkEventDate'

export type QueryConfig = {
  [key in keyof EventListConfig]: string
}

export default function HomePageVisitor() {
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
  console.log(data?.data.data.events)
  return (
    <>
      <div className='w-full pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='' />
          </div>
          <div className='container-xs'>
            <div className='flex flex-col mt-5'>
              <div className='flex flex-row items-center justify-between  '>
                <Heading as='h1' size='4xl' className=''>
                  Upcoming Events
                </Heading>
              </div>
              <div className='flex flex-col'>
                {data?.data.data.events
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
                  {data && (
                    <Pagination
                      pageSize={data.data.data.paginate.sum_page}
                      queryConfig={queryConfig}
                    />
                  )}
              </div>

              {/* <div className='mt-10 md:w-full'>
                <div className='flex flex-col'>
                  <div className='flex flex-col '>
                    <div className='flex flex-row items-start md:flex-col'>
                      <div className='flex flex-col md:self-stretch'>
                        {data?.data.data.events
                          .map((event) => ({
                            ...event,
                            parsedDate: parse(
                              event.date_event,
                              'dd/MM/yyyy',
                              new Date()
                            ) // Parse and attach the parsed date for sorting
                          }))
                          .sort((a, b) =>
                            compareAsc(a.parsedDate, b.parsedDate)
                          )
                          .map((event) => (
                            
                            <Link to={`/events/${event._id}`} key={event._id}>
                              <div
                                className='flex flex-row justify-center'
                                key={event._id}
                              >
                                <EventList
                                  className='mt-8'
                                  id={event._id}
                                  date={event.date_event}
                                  time={event.time_start}
                                  nameEvent={event.name}
                                  event_operator_name={
                                    event.event_operator.user_name
                                  }
                                  address={event.address}
                                  imageUrl={event.image}
                                  location={event.location}
                                  price={event.ticket_price}
                                />
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
