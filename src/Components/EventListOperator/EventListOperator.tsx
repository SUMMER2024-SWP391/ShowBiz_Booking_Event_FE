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
          parsedDate: parse(event.date_event, 'dd/MM/yyyy', new Date()) // Parse and attach the parsed date for sorting
        }))
        .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate)) // Sort events by date in increasing order

        .map((event) => (
          <div className={`flex flex-row items-center justify-between w-full`}>
            <div className='w-[15%]'>
              <Heading>
                {format(
                  parse(event.date_event, 'dd/MM/yyyy', new Date()),
                  'MMM dd'
                )}
              </Heading>
              <Heading>
                {format(
                  parse(event.date_event, 'dd/MM/yyyy', new Date()),
                  'EEEE'
                )}
              </Heading>
            </div>
            <div className='w-[85%] bg-blue_gray-900_01 flex items-center px-3 mt-5 justify-between sm:flex-row shadow-2xl rounded-[15px] '>
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
        ))}
    </>
    // <div>
    //   <div className='overflow-x-auto mt-4'>
    //     <table className='table'>
    //       {/* head */}
    //       <thead>
    //         <tr>
    //           <th>Event Name</th>
    //           <th>Member register</th>
    //           <th>Ticket price</th>
    //           <th>Location</th>
    //           <th>Status</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data?.data.data.events.map((event) => (
    //           <TableEventListOperator event={event} key={event._id} />
    //         ))}
    //         {isFetching && (
    //           <tr>
    //             <td>
    //               <Skeleton />
    //             </td>
    //             <td>
    //               <Skeleton />
    //             </td>
    //             <td>
    //               <Skeleton />
    //             </td>
    //             <td>
    //               <Skeleton />
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  )
}

export default EventListOperator
