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
  time?: string
  nameEvent?: string
  event_operator_name?: string
  address?: string
  imageUrl?: string
  renderProps?: React.ReactNode
  location?: string
  date?: string
  price?: string
}

export default function EventList({
  id,
  time = '9:30 AM',
  nameEvent = 'Saigon Talk #8: Feelink cảm xúc',
  event_operator_name = 'CLB CSG Event',
  address = 'FPT University',
  imageUrl = EventLogo,
  renderProps,
  date = '06/02/2024',
  location,
  price,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className}  flex-1 flex items-center px-5 justify-between border-white-A700 border-opacity-50 border border-solid bg-blue_gray-900_03 rounded-[15px]`}
    >
      <div className='flex w-full items-center justify-between gap-5 sm:flex-row'>
        <div className='flex flex-col items-start justify-end h-full'>
          <Heading size='lg' as='p' className='mt-3 !text-blue_gray-400'>
            {time} | {date}
          </Heading>

          <Heading size='xl' as='h5' className='mt-3 !font-monterat'>
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
              className='self-end !font-monterat !text-blue_gray-400_01 md:ml-0'
            >
              {event_operator_name}
            </Heading>
          </div>

          <div className='mt-[10px] flex gap-1.5'>
            <EnvironmentOutlined
              className='h-[18px] w-[18px] self-start'
              style={{ color: '#8E8F90' }}
            />
            <Heading
              size='lg'
              as='p'
              className='self-end !font-monterat !text-blue_gray-400_01'
            >
              {`${location}, ${address}`}
            </Heading>
          </div>
          <div className='flex'>
            <Heading className='mt-[10px] flex'>
              <Text as='h5' size='md' className='!text-white-A700_bf !font-euclid'>
                Price : {`${price}`}
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
  )
}
