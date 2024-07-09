import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  RightOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Button, Heading, Img, Text } from 'src/Components'
import subriceIcon from 'src/assets/images/subrice.png'
import logoOperator from 'src/assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import { Event } from 'src/@types/event.type'
import { ReactNode } from 'react'

interface Props {
  event: Event
  renderProps?: ReactNode
}

const EventDetail = ({ event, renderProps }: Props, className: string) => {
  const time = event.date_event.split('/')
  const [dayStr, monthStr, yearStr] = time.map((item) => item.trim())
  const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`)

  return (
    <div className={`${className} flex container-xs`}>
      <div className='flex md:flex-col'>
        <div className='flex w-[41%] flex-row items-start pb-[31px] md:w-full sm:pb-5 container-xs'>
          <div className='w-[40%] mr-[40px]'>
            <Img
              src={event.image}
              alt='thumnal_event'
              className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]'
            />
            <div className='flex flex-col'>
              <div className='flex flex-col items-start justify-between gap-5'>
                <div className='flex items-center justify-between gap-[15px]'>
                  <Img
                    src={logoOperator}
                    alt='subriceIcon'
                    className='h-[32px] w-[32px] rounded-[5px] object-cover'
                  />
                  <div className='flex flex-col items-start gap-0.5'>
                    <Text
                      size='xs'
                      as='p'
                      className='!font-medium !text-white-A700_cc'
                    >
                      Presented by
                    </Text>
                    <Text size='s' as='p'>
                      <span className='font-semibold text-white-A700'>
                        {event.event_operator.user_name}
                      </span>
                    </Text>
                  </div>
                  <RightOutlined className='mt-4 text-white-A700_cc' />
                  <Img
                    src={subriceIcon}
                    alt='subriceicon'
                    className='h-[49px] w-[14%] ml-9 object-cover'
                  />
                </div>
                <div className='flex gap-[15px]'>
                  <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                  <YoutubeOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                  <FacebookOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                </div>
              </div>
            </div>
            <div className='mt-11 flex flex-col items-start gap-[11px] self-stretch pb-2.5'>
              <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                <Text size='s' as='p' className='!text-white-A700_cc'>
                  Speacker
                </Text>
                <div className='h-px self-stretch bg-white-A700_5e' />
              </div>
              <div className='flex w-[77%] flex-col gap-3.5 md:w-full'>
                <Text
                  size='s'
                  as='p'
                  className='!text-white-A700_5e !font-monterat'
                >
                  {event.speaker_name}
                </Text>
                <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <Text size='s' as='p' className='!text-white-A700_cc'>
                    Sponser
                  </Text>
                  <div className='h-px self-stretch bg-white-A700_5e' />
                </div>
                <Text
                  size='s'
                  as='p'
                  className='!text-white-A700_5e !font-monterat'
                >
                  {event.sponsor_name}
                </Text>
                <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
              </div>
            </div>
            <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
              Contact the Host
            </Text>
            <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
              Report Event
            </Text>
          </div>
          <div className='flex w-[49%] flex-coll gap-2 md:w-full'>
            <div className='flex flex-col items-start'>
              <Heading
                size='s'
                as='h1'
                className='flex items-center justify-center rounded-[10px] bg-pink-normail p-[3px] '
              >
                <span className='text-pink-light p-1'>Featured in</span>
                <span className='text-white-A700 p-1'>Ho Chi Minh City</span>
              </Heading>
              <Heading
                size='4xl'
                as='h3'
                className='mt-[20px] !text-white-A700 w-full !font-monterat leading-[39px]'
              >
                {/* SaiGon Talk kỳ 8: Feelink - Feel Cảm Xúc, Link Sự Nghiệp */}
                {event.name}
              </Heading>
              <div className='mt-[15px] flex items-center gap-[21px]'>
                <div className='flex flex-col items-center gap-[3px] rounded-md border border-solid border-white-A700 pb-0.5 shadow-sm'>
                  <div className='flex w-[33px] justify-center rounded-tl-md rounded-tr-md border border-solid border-white-A700 bg-pink-normail px-[3px] pb-0.5 pt-[3px]'>
                    <Heading size='xs' as='h4' className='!font-monterat '>
                      {dateObj.toLocaleString('en-US', {
                        month: 'short'
                      })}
                    </Heading>
                  </div>
                  <Text size='md' as='p' className='!font-monterat'>
                    {time[0]}
                  </Text>
                </div>
                <div className='flex flex-col items-start gap-1 self-start'>
                  <Heading size='lg' as='h5' className='!text-white-A700'>
                    {/* Thursday, May 9 */}
                    {event.date_event}
                  </Heading>
                  <Text size='md' as='p' className='!font-monterat'>
                    {/* 5:30 PM - 8:30 PM */}
                    {event.time_start} - {event.time_end}
                  </Text>
                </div>
              </div>
              <div className='flex items-center gap-[21px]'>
                <div className='mt-[22px] flex items-center gap-[21px] rounded-md border border-solid border-white-A700 pb-0.5 shadow-sm'>
                  <Button
                    size='2xl'
                    variant='outline'
                    shape='round'
                    className='w-[33px] h-[33px] !rounded-md'
                  >
                    <EnvironmentOutlined className='text-white-A700_cc' />
                  </Button>
                </div>
                <div className='flex flex-col items-start mt-[22px] gap-[5px] self-start'>
                  <Heading size='lg' as='h6' className='!text-white-A700'>
                    Register to See Address
                  </Heading>
                  <Text size='md' as='p' className='!font-monterat'>
                    {/* Thành phố Thủ Đức, Thành Phố Hồ Chí Minh */}
                    {event.address}
                  </Text>
                </div>
              </div>
              {renderProps}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
