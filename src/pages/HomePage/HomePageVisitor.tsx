import { Button, Heading, Img, Text } from 'src/Components'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { ArrowRightOutlined, DownOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
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
      <div className='w-full bg-white-A700 pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='container-xs'>
            <div className='flex flex-col mt-5'>
              <div className='flex flex-row items-center justify-between  '>
                <Heading as='h1' size='4xl' className=''>
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
              {data?.data.data.events
                .map((event) => ({
                  ...event,
                  parsedDate: parse(event.date_event, 'dd/MM/yyyy', new Date()) // Parse and attach the parsed date for sorting
                }))
                .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate)) // Sort events by date in increasing order

                .map((event) => (
                  <div className={`w-full h-auto flex items-center  `}>
                    <div className='w-[30%]'>
                      <Heading>
                        {format(
                          parse(event.date_event, 'dd/MM/yyyy', new Date()),
                          'MMM dd EEEE'
                        )}
                      </Heading>
                    </div>
                    <div className='w-[70%] bg-blue_gray-900_01 flex items-center px-5 mt-5 justify-between sm:flex-row shadow-2xl rounded-[15px] '>
                      <div className=' my-5 flex flex-col items-baseline justify-center '>
                        {/* time */}
                        <Text size='lg' as='p' className=''>
                          {event.time_start} - {event.time_end}
                        </Text>
                        <Heading
                          size='xl'
                          as='h4'
                          className='mt-3 w-[500px] !font-monterat !text-white-A700 whitespace-nowrap overflow-hidden text-ellipsis'
                        >
                          {event.name}
                        </Heading>

                        <div className='mt-[10px] flex gap-1.5'>
                          <EnvironmentOutlined className='h-[18px] w-[18px] self-start ' />
                          <Heading
                            size='lg'
                            as='p'
                            className='self-end !font-monterat '
                          >
                            {`${event.location}, Trường Đại Học FPT HCM`}
                          </Heading>
                        </div>
                        <div className='mt-[10px] flex gap-1.5'>
                          <UserOutlined className='h-[18px] w-[18px] self-start ' />
                          <Heading
                            size='lg'
                            as='p'
                            className='self-end !font-monterat '
                          >
                            {`${event.capacity}`}
                          </Heading>
                        </div>
                        <Button className='mt-[10px] flex items-center gap-1.5'>
                          <Link to={`/event-operator/manage/${event._id}/`}>
                            <Text size='md' as='p' className='!text-black-900'>
                              Manager Event
                            </Text>
                          </Link>
                          <ArrowRightOutlined />
                        </Button>
                      </div>
                      <div>
                        <div className='my-5 w-[150px] h-[150px]'>
                          <Img
                            src={event.image}
                            alt='banner-event'
                            className=' w-full h-full rounded-[15px] object-cover justify-end'
                          />
                        </div>
                      </div>
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
          </div>
        </div>
      </div>
    </>
  )
}
