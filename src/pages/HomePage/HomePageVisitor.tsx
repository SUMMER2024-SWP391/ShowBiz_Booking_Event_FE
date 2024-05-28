import { Button, Heading, Img, Text } from 'src/Components'
import Banner from '../../assets/images/banner.png'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { DownOutlined } from '@ant-design/icons'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { EventList as EventListType } from 'src/@types/event.type'

export default function HomePageVisitor() {
  const { data } = useQuery({
    queryKey: ['events'],
    queryFn: () =>
      axios.get<EventListType[]>(
        'https://server-for-fake-data.onrender.com/events'
      )
  })
  console.log(data)
  return (
    <>
      <div className='w-full bg-gray-900 pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='bg-gradient' />
            <div className='relative mt-[-40px] flex h-[469px] w-[82%] items-center justify-center bg-cover bg-no-repeat pb-[216px] pt-[218px] md:h-auto md:w-full md:p-5 md:py-5 '>
              <Img src={Banner} className='rounded-[15px]'></Img>
            </div>
          </div>
          <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
            <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
              <div className='flex items-center justify-center gap-64 md:flex-row'>
                <Heading as='h1' size='4xl' className='!text-white-A700'>
                  Upcoming Events
                </Heading>
                <div className='flex w-[39%] justify-center gap-[22px] self-end md:w-full'>
                  <Button
                    size='xl'
                    shape='round'
                    color='blue_gray_900_07'
                    className='w-full flex-1 gap-2.5 font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Weekdays
                  </Button>
                  <Button
                    size='xl'
                    shape='round'
                    color='blue_gray_900_07'
                    className='w-full flex-1 gap-2.5 font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Event Type
                  </Button>
                  <Button
                    size='xl'
                    shape='round'
                    color='blue_gray_900_07'
                    className='w-full flex-1 gap-2.5 font-bold'
                    rightIcon={<DownOutlined />}
                  >
                    Any Category
                  </Button>
                </div>
              </div>
              <div className='w-[96%] md:w-full'>
                <div className='flex flex-col'>
                  <div className='flex w-[14%] items-end md:w-full'>
                    <div className='mb-1.5 h-[6px] w-[6px] rounded-[3px] border border-solid border-white-A700' />
                    <Heading
                      size='xl'
                      as='h2'
                      className='ml-[9px] !text-white-A700'
                    >
                      Today
                    </Heading>
                    <Text as='p' className='ml-1.5'>
                      Saturday
                    </Text>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <div className='flex flex-row items-start gap-9 md:flex-col'>
                      <div className='mt-3 flex flex-1 flex-col gap-[30px] md:self-stretch'>
                        {/* {[...Array(2)].map((d, index) => (
                          <div className='flex flex-1' key={'homepage' + index}>
                            <EventList />
                          </div>
                        ))} */}
                        {data?.data.map(
                          (event, index) =>
                            index < 10 && (
                              <div
                                className='flex flex-1'
                                key={'homage' + event.event_name}
                              >
                                <EventList
                                  id={event.id}
                                  time={event.time_start}
                                  nameEvent={event.event_name}
                                  event_operator_name={
                                    event.event_operator_name
                                  }
                                  address={event.address}
                                  imageUrl={event.image_url}
                                />
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
