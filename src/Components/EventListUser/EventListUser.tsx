import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import EventLogo from '../../assets/images/eventlogo.jpg'
import { EnvironmentOutlined } from '@ant-design/icons'
import LogoEventOperator from '../../assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import React from 'react'
import { Text } from '../Text/Text'
import { StatusRegisterEvent } from 'src/@types/utils.type'
import { Link } from 'react-router-dom'
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
  status_register?: StatusRegisterEvent
}
const formatPriceToVND = (price: any) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
export default function EventUserList({
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
  status_register,
  ...props
}: Props) {
  return (
    <Link key={id} to={`/events/${id}`} className='mt-10'>
      <div
        {...props}
        className={`${props.className} w-[900px] h-auto flex items-center px-5 justify-around  shadow-2xl rounded-[15px]`}
      >
        <div className='flex items-center justify-between sm:flex-row'>
          <div className='my-2 flex flex-col items-start justify-end '>
            <Heading size='lg' as='p' className=''>
              {time} | {date}
            </Heading>

            <Heading
              size='xl'
              as='h5'
              className='w-[700px] !font-monterat !text-white-A700 whitespace-nowrap overflow-hidden text-ellipsis'
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

            <div className='mt-[10px] flex flex-row items-center justify-center'>
              <EnvironmentOutlined className='h-[18px] w-[18px] self-start ' />
              <Heading size='lg' as='p' className='self-end !font-monterat '>
                {`${location}, FPT University`}
              </Heading>
            </div>
            <div className='flex'>
              <Heading className='mt-[10px] flex'>
                <Text
                  as='h5'
                  size='md'
                  className='!text-white-A700_bf !font-euclid'
                >
                  {price == '0' ? 'Free' : ` ${formatPriceToVND(price)}`}
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
    </Link>
  )
}
