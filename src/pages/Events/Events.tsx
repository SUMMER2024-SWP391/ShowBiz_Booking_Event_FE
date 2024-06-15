import { CalendarOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, Heading, Text } from 'src/Components'

export const Events = () => {
  return (
    <div className='flex w-[87%] md:w-full'>
      <div className='flex w-full flex-col items-center'>
        <div className='mt-[23px] flex items-center justify-between gap-5 self-stretch'>
          <div className='flex items-center gap-[9px]'>
            <Heading as='h2'>Events</Heading>
            <PlusCircleOutlined className='h-[37px] w-[37px]' />
          </div>
          <div className='flex w-[23%] items-start gap-6 self-end rounded-[5px] bg-gray-900'>
            <Button
              color='gray_800_02'
              size='lg'
              shape='round'
              className='min-w-[88px] font-medium'
            >
              Upcoming
            </Button>
            <Text
              as='p'
              className='mt-[5px] !font-medium !text-blue_gray-400_01'
            >
              Past
            </Text>
          </div>
        </div>
        <CalendarOutlined style={{ fontSize: '300px' }} className='mt-[80px]' />
        <Heading as='h1' size='2xl'>
          No Upcomming Events
        </Heading>
        <Text as='p' className=' !font-normal'>
          You have no upcoming events. Why not create one?
        </Text>
        <Button
          color='blue_gray_900'
          size='3xl'
          className='mt-[49px] mb400px] min-w-[300px] rounded-[10px] font-euclid font-bold sm:px-5 hover:bg-white-A700 hover:text-black-900 hover:border-white-A700 border-2 border-gray-400_02'
        >
          <Link to='/event-operator/create'>Create an Event</Link>
          
        </Button>
      </div>
    </div>
  )
}
