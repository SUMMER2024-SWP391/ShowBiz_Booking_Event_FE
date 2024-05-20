import { Heading } from '../Heading/Heading'
import { Img } from '../Img/Img'
import EventLogo from '../../assets/images/eventlogo.jpg'
import { EnvironmentOutlined } from '@ant-design/icons'
import LogoEventOperator from '../../assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
interface Props {
  className?: string
  time?: string
  nameEvent?: string
  eventOperator?: string
  address?: string
}

export default function EventList({
  time = '9:30 AM',
  nameEvent = 'Saigon Talk #8: Feelink cảm xúc',
  eventOperator = 'CLB CSG Event',
  address = 'FPT University',
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-center pt-4 pb-[26px] px-7 sm:pb-6 border-white-A700 border border-solid bg-blue_gray-900_03 flex-1 rounded-[15px]`}
    >
      <div className='flex w-full items-start justify-between gap-5 sm:flex-row'>
        <div className='flex flex-col items-start'>
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
              {eventOperator}
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
        <Img
          src={EventLogo}
          alt='banner-event'
          className='mt-[7px] w-[135px] h-[135px] rounded-[15px] object-cover justify-end'
        />
      </div>
    </div>
  )
}