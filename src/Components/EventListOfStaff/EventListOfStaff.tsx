import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import EventLogo from '../../assets/images/eventlogo.jpg'
import { EnvironmentOutlined } from '@ant-design/icons'
import LogoEventOperator from '../../assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import React from 'react'
import { Text } from '../Text/Text'
interface Props {
  className?: string
  id?: string
  time_start?: string
  time_end?: string
  nameEvent?: string
  event_operator_name?: string
  address?: string
  imageUrl?: string
  renderProps?: React.ReactNode
  location?: string
  date?: string
  price?: string
  dateTime?: string
}

export default function EventListOfStaff({
  id,
  time_start = '9:30 AM',
  time_end = '11:30 AM',
  nameEvent = 'Saigon Talk #8: Feelink cảm xúc',
  event_operator_name = 'CLB CSG Event',
  address = 'FPT University',
  imageUrl = EventLogo,
  renderProps,
  date = '06/02/2024',
  location,
  dateTime,
  price,
  ...props
}: Props) {
  return (
    <div className='flex flex-row justify-center'>
      <div
        {...props}
        className={`${props.className} h-auto flex  border border-solid items-center px-5 justify-around shadow-2xl rounded-[15px]`}
      >
        <div className='flex items-center justify-between sm:flex-row'>
          <div className='my-2 flex flex-col items-start justify-end '>
            <Heading size='lg' as='p' className=''>
              {time_start} - {time_end}
            </Heading>

            <Heading
              size='xl'
              as='h2'
              className='mt-2 w-[500px] !font-monterat !text-[20px] whitespace-nowrap overflow-hidden text-ellipsis'
            >
              {nameEvent}
            </Heading>
            <div className='mt-[10px] flex gap-1.5'>
              <Img
                src={LogoEventOperator}
                alt='eventOperator'
                className='h-[18px] w-[18px] self-start rounded-md'
              />
              <Heading
                size='lg'
                as='p'
                className='self-end !font-monterat md:ml-0'
              >
                {event_operator_name}
              </Heading>
            </div>

            <div className='mt-[10px] flex gap-1.5'>
              <EnvironmentOutlined className='h-[18px] w-[18px] self-start' />
              <Heading size='lg' as='p' className='self-end !font-monterat '>
                {`${location}, ${address}`}
              </Heading>
            </div>
            <div className='flex'>
              <Heading className='mt-[10px] flex'>
                <Text as='h5' size='md' className=' !font-euclid'>
                  {price == '0' ? 'Free' : `Price : ${price}`}
                </Text>
              </Heading>
            </div>
          </div>
          <div>
            <div className='w-[150px] h-[150px]'>
              <Img
                src={imageUrl}
                alt='banner-event'
                className='mt-5 w-full h-full rounded-[15px] object-cover justify-end'
              />
            </div>
            <div className='flex justify-center items-center mt-5'>
              {renderProps}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
