import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  PlusOutlined,
  RightOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Button, Heading, Img,  Text } from 'src/Components'
import subriceIcon from 'src/assets/images/subrice.png'
import logoOperator from 'src/assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import Banner from '../../assets/images/baner.png'
import { DatePicker, TimePicker, Upload } from 'antd'


const CreateEvent = () => {


  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-blue_gray-900'>
      <div className='flex container-xs justify-center'>
        <form className='flex justify-center' noValidate>
          <div className='flex md:flex-col justify-center'>
            <div className='flex w-[41%] flex-row items-start pb-[31px] md:w-full sm:pb-5 justify-center'>
              <div className='w-[59%] mr-[40px]'>
                <Img
                  src={Banner}
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
                            ádasdasd
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
                <div className='mt-[34px] flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <Text size='s' as='p' className='!text-white-A700_cc'>
                    Host by
                  </Text>
                  <div className='self-stretch'>
                    <div className='flex flex-col items-start gap-[11px]'>
                      <div className='ml-5 h-px self-stretch bg-white-A700_5e md:ml-0' />
                      <div className='flex w-[83%] flex-wrap items-start gap-[18px] md:w-full'>
                        <Img className='h-[24px] w-[24px] rounded-[50%] bg-red' />
                        <Heading size='md' as='h1' className='!font-monterat'>
                          Câu Lạc Bộ Truyền Thông Cóc Sài Gòn
                        </Heading>
                        <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                      </div>
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
                      Á hậu Thúy Vân
                    </Text>
                    <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />

                    <Text
                      size='s'
                      as='p'
                      className='!text-white-A700_5e !font-monterat'
                    >
                      Tiến sĩ Tô Nhi A
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
                  <div className='flex justify-between gap-5 self-stretch'>
                    <Heading
                      size='s'
                      as='h1'
                      className='flex items-center justify-center rounded-[10px] bg-gray-800_01 p-[3px] !text-black-900'
                    >
                      <span className='text-white-A700_bf'>Featured in</span>
                      <span className='text-white-A700 ml-2'>
                        Ho Chi Minh City
                      </span>
                    </Heading>
                    <select className='bg-blue_gray-900_01 w-24 text-center max-w-xs rounded-lg text-white-A700'>
                      <option selected>Private</option>
                      <option> Public</option>
                    </select>
                  </div>
                  <input
                    className='mt-5 h-14 font-extrabold text-[30px] bg-blue_gray-900 !text-white-A700 outline-none border-none'
                    placeholder='EventName'
                  />
                  <div className='rounded-[10px] pr-[5px] pl-[23px] pt-[7px] h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <div className='m-3 left-[8%]  w-auto flex items-start justify-between gap-5'>
                      <Text as='p' className='mt-2 !text-blue_gray-100'>
                        Start
                      </Text>
                      <DatePicker />
                      <TimePicker />
                    </div>
                    <div className=' m-3 left-[8%]  w-auto flex items-start justify-between gap-5'>
                      <Text as='p' className='mt-2 !text-blue_gray-100'>
                        End
                      </Text>
                      <DatePicker />
                      <TimePicker />
                    </div>
                  </div>
                  <div className='mt-10 rounded-[10px] pr-[5px] pl-[23px] pt-[7px] h-auto w-full bg-gray-800_01 sm:pl-5'>
                    <div className='flex flex-row items-start'>
                      <EnvironmentOutlined className='mt-1' />
                      <Text
                        as='p'
                        size='xl'
                        className='ml-5 !text-blue_gray-100 !font-bold'
                      >
                        Add Event Location
                      </Text>
                    </div>
                    <input
                      className='ml-9 font-normal !text-blue_gray-100 bg-gray-800_01 outline-none border-none'
                      placeholder='Offline location or virtual link'
                    />
                  </div>
                 <Upload
                    
                    action='/upload.do'
                    listType='picture-card'
                    className='mt-10 self-center text-white-A700'
                  >
                    <button
                      style={{ border: 2, background: 'none' }}
                      type='button'
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload> 
                  
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
     </div>
  )
}

export default CreateEvent
