import { Button, Heading, Img, Text } from 'src/Components'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { DownOutlined } from '@ant-design/icons'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import Pagination from 'src/Components/Pagination/Pagination'
import { EventListConfig } from 'src/@types/event.type'
import useQueryParams from 'src/hooks/useQueryParams'
import { parse, format, compareAsc } from 'date-fns'

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

  return (
    <>
      <div className='w-full bg-gradient_vistor pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='' />
            {/* <div className=' flex h-[100%] w-[80%] items-center justify-center bg-cover    '>
              <Img src={Banner} className='rounded-[15px]'></Img>
            </div> */}
          </div>
          <div className='container-xs'>
            <div className='flex flex-col mt-5'>
              <div className='flex flex-row items-center justify-between  '>
                <Heading as='h1' size='4xl' className='!text-white-A700'>
                  Upcoming Events
                </Heading>

                <div className='w-[500px] flex justify-between'>
                  <Button
                    size='lg'
                    shape='round'
                    color='pink_normail'
                    className='font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Weekdays
                  </Button>
                  <Button
                    size='lg'
                    shape='round'
                    color='pink_normail'
                    className='font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Event Type
                  </Button>
                  <Button
                    size='lg'
                    shape='round'
                    color='pink_normail'
                    className='font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Any Category
                  </Button>
                </div>
              </div>
              <div className='mt-10 md:w-full'>
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
                    {data && (
                      <Pagination
                        pageSize={data.data.data.paginate.sum_page}
                        queryConfig={queryConfig}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
