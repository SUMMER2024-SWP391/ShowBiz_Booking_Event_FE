import { Button, Heading, Img, Text } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Banner from '../../assets/images/banner.png'
import HeaderAdmin from 'src/Components/HeaderAdmin/HeaderAdmin'
import EventList from 'src/Components/EventLists/EventList'
import { Link } from 'react-router-dom'

const DashboardAdmin = () => {
  return (
    <div className='w-full bg-gray-900 pb-[376px] md:pb-5'>
      <div className='flex flex-col items-center gap-14 sm:gap-7'>
        <div className='flex flex-col items-center self-stretch'>
          <HeaderAdmin className='bg-gradient' />
          <div className='relative mt-[-40px] flex h-[469px] w-[82%] items-center justify-center bg-cover bg-no-repeat pb-[216px] pt-[218px] md:h-auto md:w-full md:p-5 md:py-5 '>
            <Img src={Banner} className='rounded-[15px]'></Img>
          </div>
        </div>
        <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
          <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
            <div className='flex items-center justify-center gap-64 md:flex-row'>
              <Heading as='h1' size='4xl' className='!text-white-A700'>
                Manage Event
              </Heading>
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
                      {[...Array(2)].map((_, index) => (
                        <div className='flex flex-1' key={'homepage' + index}>
                          <EventList
                            renderProps={
                              <>
                                <Button
                                  className='text-white-A700 bg-black-900 h-9 w-[80px] flex justify-center items-center rounded-[5px] text-sm border border-[#e5e7eb] hover:bg-white-A700 hover:text-[#4096ff]
              hover:border-[#e5e7eb] mr-2'
                                >
                                  Reject
                                </Button>
                                <Link
                                  to={`/events/${index}`}
                                  className=' text-white-A700 bg-black-900 h-9 w-[80px] flex justify-center items-center rounded-[5px] p-2 text-sm border border-[#e5e7eb] hover:bg-white-A700 hover:text-[#4096ff]
              hover:border-[#e5e7eb]'
                                >
                                  Detail
                                </Link>
                              </>
                            }
                          />
                        </div>
                      ))}
                      {/* {data?.data.map(
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
                                event_operator_name={event.event_operator_name}
                                address={event.address}
                                imageUrl={event.image_url}
                              />
                            </div>
                          )
                      )} */}
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
  )
}

export default DashboardAdmin
