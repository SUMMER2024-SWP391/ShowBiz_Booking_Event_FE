import { CalendarOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { Button, Heading, Text } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

export const Events = () => {
  return (
    <>
      <div className='w-full bg-gray-900 pb-[376px] md:pb-5'>
        <div className='flex flex-col items-center gap-14 sm:gap-7'>
          <div className='flex flex-col items-center self-stretch'>
            <Header className='bg-gradient' />
          </div>
          <div className='container-xs pl-[89px] pr-[70px] md:p-5 md:px-5'>
            <div className='flex flex-col gap-[73px] md:gap-[54px] sm:gap-9'>
              <div className='w-[96%] md:w-full'>
                <div className='flex flex-col'>
                  <div className='container-xs relative mt-[-3px] flex flex-col items-start pl-[174px] pr-[633px] md:p-5 md:px-5'>
                    <Heading size='4xl' as='h1'>
                      Event Operator
                    </Heading>
                  </div>
                  <div role='tablist' className='tabs tabs-bordered'>
                    <a
                      role='tab'
                      className='tab tab-active'
                      href='/eventoperator/Events'
                    >
                      Events
                    </a>
                    <a role='tab' className='tab '>
                      People
                    </a>
                    <a role='tab' className='tab'>
                      Newsletters
                    </a>
                    <a role='tab' className='tab'>
                      Insights
                    </a>
                    <a role='tab' className='tab'>
                      Setting
                    </a>
                  </div>
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
                      <CalendarOutlined
                        style={{ fontSize: '300px' }}
                        className='mt-[80px]'
                      />
                      <Heading as='h1' size='2xl'>
                        No Upcomming Events
                      </Heading>
                      <Text as='p' className=' !font-normal'>
                        You have no upcoming events. Why not create one?
                      </Text>
                      <Button
                        color='blue_gray_900'
                        size='3xl'
                        className='mt-[49px] mb-[400px] min-w-[300px] rounded-[10px] font-euclid font-bold sm:px-5'
                      >
                        Create an Event
                      </Button>
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
