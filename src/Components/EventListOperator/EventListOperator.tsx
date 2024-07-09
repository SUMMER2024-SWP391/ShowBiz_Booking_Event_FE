import { useQuery } from '@tanstack/react-query'
import TableEventListOperator from '../TableEventListOperator/TableEventListOperator'
import eventApi from 'src/apis/event.api'
import { Button, Skeleton } from 'antd'
import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import { EnvironmentOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { Text } from '../Text/Text'

const EventListOperator = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-operator'],
    queryFn: () => eventApi.getEventListOperator()
  })
  console.log(data?.data.data.events.map((event) => event))

  return (
    <>
      {data?.data.data.events.map((event) => (
        <div className={`w-full h-auto flex items-center  `}>
          <div className='w-[30%]'>{event.date_event}</div>
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
                <Heading size='lg' as='p' className='self-end !font-monterat '>
                  {`${event.location}, Trường Đại Học FPT HCM`}
                </Heading>
              </div>
              <div className='mt-[10px] flex gap-1.5'>
                <UserOutlined className='h-[18px] w-[18px] self-start ' />
                <Heading size='lg' as='p' className='self-end !font-monterat '>
                  {`${event.capacity }`}
                </Heading>
              </div>
              <Button className='mt-[10px] flex items-center justify-around'>
                <Text size='md' as='p' className='!text-black-900'>Manager Event</Text>
                <RightOutlined />
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
