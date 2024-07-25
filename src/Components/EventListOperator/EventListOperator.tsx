import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Button } from 'antd'
import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import { parse, isAfter, isWithinInterval, isBefore } from 'date-fns'
import { ArrowRightOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
import { Text } from '../Text/Text'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkEventDate } from 'src/utils/checkEventDate'
import { EventStatus } from 'src/@types/enum'

const EventListOperator = () => {
  const [currentSelection, setCurrentSelection] = useState('Upcoming')

  const { data } = useQuery({
    queryKey: ['event-list-operator'],
    queryFn: () => eventApi.getEventListOperator()
  })
  const filteredEvent = data?.data.data.events
    .map((event) => ({
      ...event,
      parsedStartDate: parse(`${event.date_event} ${event.time_start}`, 'dd/MM/yyyy HH:mm', new Date()),
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
      <div className='flex flex-row items-center justify-between'>
        <Heading size='4xl' as='h1' className=''>
          Events
        </Heading>
        <div className='self-end'>
          <button
            onClick={() => setCurrentSelection('Upcoming')}
            className={`${
              currentSelection === 'Upcoming' ? 'bg-[#51606E] text-white-A700' : 'bg-white-A700 text-black'
            } px-2 py-1 rounded-l-lg transition-colors duration-300 border border-l-2 `}
          >
            Upcoming
          </button>
          <button
            onClick={() => setCurrentSelection('Past')}
            className={`${
              currentSelection === 'Past' ? 'bg-[#51606E] text-white-A700' : 'bg-white-A700 text-black-900'
            } px-2 py-1 rounded-r-lg transition-colors duration-300 border border-r-2`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredEvent &&
        filteredEvent.map((event) => (
          <div className={`flex flex-row items-center justify-between `} key={event._id}>
            <div className='w-[10%]'>
              <Heading>{event.displayDate}</Heading>
            </div>
            <div className='mt-3 w-[85%] flex items-center'>
              <div className='flex flex-row justify-center'>
                <div className='px-5 h-auto mt-5 justify-around items-center flex flex-row border border-solid shadow-2xl rounded-[15px] '>
                  <div className='flex items-center justify-between sm:flex-row'>
                    <div className=' my-3 flex flex-col items-start justify-end '>
                      {/* time */}
                      <Text size='lg' as='p' className=''>
                        {event.time_start} - {event.time_end}
                      </Text>
                      <Heading
                        size='xl'
                        as='h4'
                        className='mt-2 w-[500px] !font-monterat !text-[20px]  whitespace-nowrap overflow-hidden text-ellipsis'
                      >
                        {event.name}
                      </Heading>

                      <div className='mt-[10px] flex gap-1.5'>
                        <EnvironmentOutlined className='h-[18px] w-[18px] self-start ' />
                        <Heading size='lg' as='p' className='self-end !font-monterat '>
                          {`${event.location}, Trường Đại Học FPT HCM`}
                        </Heading>
                      </div>
                      <div className='mt-[10px] flex gap-1.5'>
                        <UserOutlined className='h-[18px] w-[18px] self-start ' />
                        <Heading size='lg' as='p' className='self-end !font-monterat '>
                          {`${event.capacity}`}
                        </Heading>
                      </div>
                      <div className='mt-[10px]'>
                        {event.status === EventStatus.PENDING ? (
                          <div className='flex justify-between items-center'>
                            <span className='flex w-3 h-3 me-3 bg-blue rounded-full'></span>
                            {event.status}
                          </div>
                        ) : event.status === EventStatus.APPROVED ? (
                          <div className='flex justify-between items-center'>
                            <span className='flex w-3 h-3 me-3 bg-green rounded-full'></span>
                            {event.status}
                          </div>
                        ) : event.status === EventStatus.REJECTED ? (
                          <div className='flex justify-between items-center'>
                            <span className='flex w-3 h-3 me-3 bg-red rounded-full'></span>
                            {event.status}
                          </div>
                        ) : (
                          <div className='flex justify-between items-center'>
                            <span className='flex w-3 h-3 me-3 bg-red rounded-full'></span>
                            {event.status}
                          </div>
                        )}
                      </div>
                      {currentSelection === 'Upcoming' ? (
                        <div className='flex'>
                          <Button className='mt-[10px] flex items-center gap-1.5 mr-2'>
                            <Link to={`/event-operator/manage/${event._id}/overview`}>
                              <Text size='md' as='p' className='!text-black-900'>
                                Manager Event
                              </Text>
                            </Link>
                            <ArrowRightOutlined />
                          </Button>
                          <div className='mt-[10px] px-2 py-1 border shadow-2xl rounded-lg bg-[#0958d9] hover:bg-[#4096ff]'>
                            <Link to={`/event-operator/statistical-answer/${event._id}`}>
                              <Heading size='xl' as='h6' className='!text-white-A700'>
                                Statistical
                              </Heading>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className='flex'>
                          <div className='mt-[10px] px-2 py-1 border shadow-2xl rounded-lg bg-red mr-2'>
                            <Heading size='xl' as='h6' className='!text-white-A700'>
                              Event was end
                            </Heading>
                          </div>
                          <div className='mt-[10px] px-2 py-1 border shadow-2xl rounded-lg bg-[#0958d9] hover:bg-[#4096ff]'>
                            <Link to={`/event-operator/statistical-answer/${event._id}`}>
                              <Heading size='xl' as='h6' className='!text-white-A700'>
                                Statistical
                              </Heading>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className='w-[150px] h-[150px]'>
                        <Img src={event.image} alt='banner-event' className=' w-full h-full rounded-[15px] object-cover justify-end' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default EventListOperator
