import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import EventLogo from '../../assets/images/eventlogo.jpg'
import { EnvironmentOutlined } from '@ant-design/icons'
import LogoEventOperator from '../../assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
interface Props {
  className?: string
  id: string
  time?: string
  nameEvent?: string
  event_operator_name?: string
  address?: string
  imageUrl?: string
}

export default function EventList({
  id,
  time = '9:30 AM',
  nameEvent = 'Saigon Talk #8: Feelink cảm xúc',
  event_operator_name = 'CLB CSG Event',
  address = 'FPT University',
  imageUrl = EventLogo,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-center pt-4 pb-[26px] px-7 sm:pb-6 border-white-A700 border border-solid bg-blue_gray-900_03 flex-1 rounded-[15px]`}
    >
      <div className='flex w-full items-start justify-between gap-5 sm:flex-row'>
        <div className='flex flex-col items-start justify-end h-full'>
          <Heading size='lg' as='p' className='!text-blue_gray-400'>
            {time}
          </Heading>
          <Heading size='2xl' as='h5' className='!font-monterat'>
            {nameEvent}
          </Heading>
          <div className='mt-[18px] flex gap-1.5'>
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

          <div className='mt-[18px] flex gap-1.5'>
            <EnvironmentOutlined
              className='h-[18px] w-[18px] self-start'
              style={{ color: '#8E8F90' }}
            />
            <Heading
              size='lg'
              as='p'
              className='self-end !font-monterat !text-blue_gray-400_01'
            >
              {address}
            </Heading>
          </div>
        </div>
        <div>
          <div>
            <Img
              src={imageUrl}
              alt='banner-event'
              className='mt-[7px] w-[135px] h-[135px] rounded-[15px] object-cover justify-end'
            />
          </div>
          <div className='flex justify-center items-center'>
            <Button className=' text-white-A700 bg-black-900 mr-2'>
              Register
            </Button>
            <Link
              to={`/events/${id}`}
              className=' text-white-A700 bg-black-900 h-8 w-[80px] flex justify-center items-center rounded-[5px] p-2 text-sm border border-[#e5e7eb] hover:bg-white-A700 hover:text-[#4096ff]
              hover:border-[#e5e7eb]'
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
