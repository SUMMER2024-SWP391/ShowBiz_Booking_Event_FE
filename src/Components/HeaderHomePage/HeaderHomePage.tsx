import { Link } from 'react-router-dom'
import LOGO from '../../assets/img/Logo EventBooking (1).png'
import { Img } from '../Img/Img'
import { Heading } from '../Heading/Heading'
import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface Props {
  className?: string
}
export default function Header({ ...props }: Props) {
  return (
    <header
      {...props}
      className={`${props.className} flex flex-row justify-between items-center md:w-full gap-5 `}
    >
      <div className='flex self-start'>
        <Img
          src={LOGO}
          alt='logo'
          className='w-[12%] h-[109px] object-cover md:w-full'
        />
      </div>
      <div className='flex self-center ]'>
        <ul className='flex flex-warp gap-[45px]'>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02'>
                Home
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02'>
                My Event
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02'>
                Calendar
              </Heading>
            </a>
          </li>
          <li>
            <a href='#'>
              <Heading as='h6' className='!text-gray-500_02'>
                Events
              </Heading>
            </a>
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-[19px] mr-5'>
        <a href=''>
          <SearchOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
        </a>
        <a href=''>
          <BellOutlined className='!text-gray-500_02 h-[24px] w-[24px]' />
        </a>
        <Button className='min-w-[69px] rounded-[10px] font-bold bg-blue_gray-900_03 text text-gray-500'>
          Sign In
        </Button>
      </div>
    </header>
  )
}
