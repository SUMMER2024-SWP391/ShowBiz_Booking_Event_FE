import { useQuery } from '@tanstack/react-query'
import TableEventListOperator from '../TableEventListOperator/TableEventListOperator'
import eventApi from 'src/apis/event.api'
import { Button, Skeleton } from 'antd'
import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import { parse, format, compareAsc } from 'date-fns'
import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  RightOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Text } from '../Text/Text'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkEventDate } from 'src/utils/checkEventDate'
import { EventStatus } from 'src/@types/enum'

const EventListOperator = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-operator'],
    queryFn: () => eventApi.getEventListOperator()
  })
  const filterDate = parse('01/01/2024', 'dd/MM/yyyy', new Date())
  return (
    <>
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
        .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate)) // Sort events by date in increasing order

        .map((event) => (
          <div className={`flex flex-row items-center justify-between `}>
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
                      <div className='w-[150px] h-[150px]'>
                        <Img
                          src={event.image}
                          alt='banner-event'
                          className=' w-full h-full rounded-[15px] object-cover justify-end'
                        />
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
