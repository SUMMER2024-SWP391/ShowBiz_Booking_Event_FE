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
import DOMPurify from 'dompurify'
interface Props {
  event: Event
  renderProps?: ReactNode
}

const EventDetail = ({ event, renderProps }: Props, className: string) => {
  const time = event.date_event.split('/')
  const [dayStr, monthStr, yearStr] = time.map((item) => item.trim())
  const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`)

  return (
    <div
      className={`${className} mt-5 flex container-xl flex-row justify-between`}
    >
      <div className='flex md:flex-col'>
        <div className='flex w-[41%] flex-row items-start pb-[31px] md:w-full sm:pb-5'>
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
                    <Text size='xs' as='p' className='!font-medium !'>
                      Presented by
                    </Text>
                    <Text size='s' as='p'>
                      <span className='font-semibold'>
                        {event.event_operator.user_name}
                      </span>
                    </Text>
                  </div>
                  <RightOutlined className='mt-4 ' />
                  <Img
                    src={subriceIcon}
                    alt='subriceicon'
                    className='h-[49px] w-[14%] ml-9 object-cover'
                  />
                </div>
                <div className='flex gap-[15px]'>
                  <InstagramOutlined className='h-[16px] w-[16px] ' />
                  <YoutubeOutlined className='h-[16px] w-[16px] ' />
                  <FacebookOutlined className='h-[16px] w-[16px] ' />
                </div>
              </div>
            </div>
            <div className='mt-11 flex flex-col items-start gap-[11px] self-stretch pb-2.5'>
              <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                <Heading size='md' as='h6' className=''>
                  Speacker
                </Heading>
                <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
              </div>
              <div className='flex w-[77%] flex-col gap-3.5 md:w-full'>
                <Text size='md' as='p' className=' !font-monterat'>
                  {event.speaker_name}
                </Text>
                <div className='flex gap-[15px]'>
                  <InstagramOutlined className='h-[16px] w-[16px]  ' />
                  <YoutubeOutlined className='h-[16px] w-[16px] ' />
                  <FacebookOutlined className='h-[16px] w-[16px] ' />
                </div>
                <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <Heading size='md' as='h6' className=''>
                    Sponser
                  </Heading>
                  <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
                </div>
                <Text size='s' as='p' className=' !font-monterat'>
                  {event.sponsor_name}
                </Text>
                <div className='flex gap-[15px]'>
                  <InstagramOutlined className='h-[16px] w-[16px] ' />
                  <YoutubeOutlined className='h-[16px] w-[16px] ' />
                  <FacebookOutlined className='h-[16px] w-[16px] ' />
                </div>
              </div>
            </div>
            <Text size='s' as='p' className='mt-[19px] cursor-pointer'>
              Contact the Host
            </Text>
            <Text size='s' as='p' className='mt-[19px] cursor-pointer'>
              Report Event
            </Text>
          </div>
          <div className='flex w-[49%] flex-coll gap-2 md:w-full'>
            <div className='flex flex-col items-start'>
              <Heading
                size='s'
                as='h1'
                className='flex items-center justify-center bg-orange-600 bg-[#51606E] border  rounded-[10px] bg- p-[3px] '
              >
                <span className='text-white-A700 p-1'>Featured in</span>
                <span className='text-[#F4F5F6] p-1'>Ho Chi Minh City</span>
              </Heading>
              <Heading
                size='4xl'
                as='h3'
                className='mt-[20px]  w-full !font-monterat leading-[39px]'
              >
                {/* SaiGon Talk kỳ 8: Feelink - Feel Cảm Xúc, Link Sự Nghiệp */}
                {event.name}
              </Heading>
              <div className='mt-5 flex items-center gap-[21px]'>
                <div className='flex flex-col items-center gap-[3px] rounded-md border border-solid border-black_dark  pb-0.5 shadow-sm'>
                  <div className='flex w-[40px] justify-center rounded-tl-md rounded-tr-md border border-solid  bg-[#51606E] px-[3px] pb-0.5 pt-[3px]'>
                    <Heading size='xs' as='h4' className='!font-monterat !text-white-A700 '>
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
                  <Heading size='lg' as='h5' className=''>
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
                <div className='mt-[22px] flex items-center gap-[21px] rounded-md border border-solid border-black_dark  pb-0.5 shadow-sm'>
                  <Button
                    size='2xl'
                    variant='outline'
                    shape='round'
                    className='w-[40px] h-[33px] border !rounded-md'
                  >
                    <EnvironmentOutlined className='' />
                  </Button>
                </div>
                <div className='flex flex-col items-start mt-[22px] gap-[5px] self-start'>
                  <Heading size='lg' as='h6' className=''>
                    Address
                  </Heading>
                  <Text size='md' as='p' className='!font-monterat'>
                    {/* Thành phố Thủ Đức, Thành Phố Hồ Chí Minh */}
                    {event.address}
                  </Text>
                </div>
              </div>
              {renderProps}
              <Text
                size='lg'
                as='p'
                className=' !font-bold ml-1.5 mt-[30px] md:ml-0'
              >
                About Event
              </Text>
              <div className='flex flex-col items-start'>
                <div className='mt-4 ml-6 h-px self-stretch bg-black_supper_light opacity-50 md:ml-0' />
                <Text
                  size='md'
                  as='p'
                  className='mt-[17px] w-[98%] leading-4 md:w-full !font-medium !font-monterat'
                >
                  <div
                    className=''
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(event.description) //loại bỏ javascript khỏi đây
                    }}
                  ></div>
                </Text>
                <div className='mt-9 flex flex-col items-start gap-2 self-stretch '>
                  <Text size='lg' as='p' className=' !font-bold'>
                    {`Location ${event.location}`}
                  </Text>
                  <div className='ml-6 h-px self-stretch bg-black_supper_light opacity-50 md:ml-0' />
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305243!2d106.80730807603385!3d10.841132857994813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720796162009!5m2!1svi!2s'
                    width='700'
                    height='200'
                    style={{
                      border: 0,
                      borderRadius: '15px',
                      marginTop: '10px'
                    }}
                    allowFullScreen={true}
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
