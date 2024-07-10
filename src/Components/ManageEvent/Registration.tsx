import { Button, Switch } from 'antd'
import React from 'react'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'

export const Registration = () => {
  return (
    <div className='mt-10 m-auto w-[820px] container'>
      <div className=' flex flex-row items-center justify-between'>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              className='w-7'
            >
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M22.75 9c-.69 0-1.25-.56-1.25-1.25V3.2a.2.2 0 0 0-.2-.2H5.723C3.116 3 1.001 5.61 1.001 8.834L1 12.014c0 .336 0 .504.074.608s.286.178.711.327c1.124.394 1.942 1.61 1.942 3.05 0 1.441-.818 2.658-1.942 3.052-.425.149-.638.223-.711.327C1 19.482 1 19.65 1 19.985v3.18C1 26.39 3.113 29 5.722 29H21.3a.2.2 0 0 0 .2-.2v-4.55a1.25 1.25 0 0 1 2.5 0v4.55c0 .11.09.2.2.2h2.078C28.887 29 31 26.39 31 23.166v-3.181c0-.335 0-.503-.074-.607-.073-.104-.286-.178-.711-.327-1.124-.394-1.942-1.61-1.942-3.051 0-1.44.818-2.657 1.942-3.05.425-.15.637-.224.711-.328s.074-.272.074-.607l-.002-3.18C30.999 5.61 28.885 3 26.278 3H24.2a.2.2 0 0 0-.2.2v4.55C24 8.44 23.44 9 22.75 9m-1.25 9.75a1.25 1.25 0 1 0 2.5 0v-5.5a1.25 1.25 0 0 0-2.5 0zm-6.634-.65a1.25 1.25 0 0 1 .035 1.766l-4.04 4.2a1.25 1.25 0 0 1-1.803 0l-1.96-2.04a1.25 1.25 0 0 1 1.803-1.733l.915.953a.2.2 0 0 0 .289 0l2.994-3.113a1.25 1.25 0 0 1 1.767-.034'
              ></path>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>
                Registration
              </Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                Open
              </Text>
            </div>
          </div>
        </Button>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              className='w-7'
            >
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M8 15.875c-.69 0-1.25-.56-1.25-1.25v-4.254c-1.98-.017-3.013-.126-3.323-.838-.366-.84.57-1.848 2.442-3.865l.08-.085c.96-1.035 1.44-1.552 2.05-1.552.611 0 1.092.517 2.053 1.552l.079.085c1.872 2.017 2.808 3.025 2.442 3.865-.31.712-1.344.82-3.323.838v4.254c0 .69-.56 1.25-1.25 1.25m6-13.25a1.25 1.25 0 1 0 0-2.5H2a1.25 1.25 0 0 0 0 2.5z'
              ></path>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>
                Event Capacity
              </Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                50 - Waitlist Off
              </Text>
            </div>
          </div>
        </Button>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-7'
            >
              <g fill='currentColor' fill-rule='evenodd'>
                <path d='M14.925 8.246a.853.853 0 1 0 1.705 0v-1.72c0-.377.305-.682.682-.682h1.677c1.778 0 3.22 1.774 3.22 3.965l.001 2.147c0 .233 0 .35-.051.422s-.2.125-.496.232c-.76.271-1.313 1.095-1.313 2.069 0 .973.553 1.797 1.313 2.069.297.106.445.16.496.231.051.073.051.19.051.422v2.148c0 2.19-1.441 3.965-3.22 3.965h-1.678a.68.68 0 0 1-.682-.682v-1.72a.852.852 0 1 0-1.705 0v1.72a.68.68 0 0 1-.682.682H4.97c-1.779 0-3.22-1.775-3.22-3.965V17.4c0-.233 0-.35.05-.422.052-.072.2-.125.497-.231.76-.272 1.313-1.096 1.313-2.07s-.553-1.797-1.313-2.068c-.297-.107-.445-.16-.496-.232s-.051-.189-.05-.422V9.81c0-2.19 1.442-3.965 3.22-3.965h9.272c.377 0 .682.305.682.682zm0 8.37a.853.853 0 1 0 1.705 0v-3.875a.852.852 0 1 0-1.705 0z'></path>
                <path d='M15.44 2.636a3.64 3.64 0 0 0-3.295.56l-5.842 4.4a.982.982 0 0 1-1.181-1.568l5.842-4.4a5.6 5.6 0 0 1 7.85 1.112l.104.14a3.93 3.93 0 0 1 .178 4.456.982.982 0 1 1-1.66-1.048c.436-.69.4-1.577-.089-2.23l-.104-.14a3.64 3.64 0 0 0-1.803-1.282'></path>
              </g>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>
                Group Registration
              </Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                Off
              </Text>
            </div>
          </div>
        </Button>
      </div>
      <div className='mt-5 flex flex-row justify-between'>
        <Heading size='2xl' className='!text-white-A700'>
          Tickets
        </Heading>
        <Button className='bg-gray-100 flex flex-row items-center gap-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            className='w-3'
          >
            <path
              fill='currentColor'
              fill-rule='evenodd'
              d='M8.5 1.75a.75.75 0 0 0-1.5 0V7H1.75a.75.75 0 0 0 0 1.5H7v5.25a.75.75 0 0 0 1.5 0V8.5h5.25a.75.75 0 0 0 0-1.5H8.5z'
            ></path>
          </svg>
          <p>New Ticket Type</p>
        </Button>
      </div>
      <div className='mt-10'>
        <div className='w-[386px] h-[178px] bg-white-A700 rounded-[15px] p-4 justify-between'>
          <div className='flex flex-row justify-between'>
            <Heading className='!text-black-900'>Standard</Heading>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              viewBox='0 0 24 24'
              className='w-5'
            >
              <circle cx='12' cy='12' r='1'></circle>
              <circle cx='19' cy='12' r='1'></circle>
              <circle cx='5' cy='12' r='1'></circle>
            </svg>
          </div>
          <Text
            as='p'
            size='xl'
            className='mt-5 font-euclid text-[30px] !text-black-900'
          >
            Free
          </Text>
          <div className='mt-5 flex flex-row justify-between'>
            <Text className='!text-black-900 text-[16px]'>
              Require Approval
            </Text>
            <Switch size='small' defaultChecked />
          </div>
          <div className='h-px w-full self-stretch bg-black_supper_light opacity-25' />
          <div className='flex flex-row justify-between mt-2 '>
            <Text className='!text-black-900'>Avaliable</Text>
            <Text className='!text-black-900'>0 Registered</Text>
          </div>
        </div>
      </div>
      <div className='mt-5 h-px w-full self-stretch bg-black_supper_light' />
      <div className='mt-5'>
        <Heading className='text-[25px] !text-white-A700'>
          Registration Questions
        </Heading>
        <Text className='mt-3 !text-gray-100 text-[16px]'>
          We will ask guests the following questions when they register for the
          event.
        </Text>
        <div className='w-[788px] h-[138px] flex flex-col'>
          <div className='mt-3 flex flex-row'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 50 50'
              className='w-6'
            >
              <path
                fill='currentColor'
                d='M7.752 44.553h34.843c4.532 0 6.952-2.4 6.952-6.89V12.765c0-4.492-2.42-6.891-6.952-6.891H7.752C3.22 5.875.8 8.254.8 12.765v24.897c0 4.512 2.42 6.89 6.952 6.89m9.106-19.36c-2.482 0-4.492-2.091-4.492-4.901 0-2.625 2.01-4.82 4.492-4.82 2.502 0 4.49 2.195 4.49 4.82 0 2.81-1.988 4.901-4.49 4.901m13.494-6.624c-.82 0-1.395-.594-1.395-1.374 0-.758.574-1.353 1.395-1.353H40.81c.779 0 1.353.595 1.353 1.353 0 .78-.574 1.374-1.353 1.374zm0 8.04c-.82 0-1.395-.616-1.395-1.395 0-.759.574-1.354 1.395-1.354H40.81c.779 0 1.353.595 1.353 1.354 0 .78-.574 1.394-1.353 1.394zm-21.205 8.1c-.8 0-1.23-.574-1.23-1.333 0-1.907 2.788-6.83 8.94-6.83 6.173 0 8.963 4.923 8.963 6.83 0 .759-.41 1.333-1.23 1.333zm21.205-.103c-.82 0-1.395-.574-1.395-1.353 0-.78.574-1.374 1.395-1.374H40.81c.779 0 1.353.595 1.353 1.374s-.574 1.353-1.353 1.353z'
              ></path>
            </svg>
            <Text className='ml-3 text-[20px] !text-white-A700_bf'>
              Identity
            </Text>
          </div>
          <div className='mt-5 flex flex-row gap-3'>
            <div className='w-[49%] flex flex-col'>
              <div className='flex flex-row items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 80 80'
                  className='w-5'
                >
                  <path
                    fill='currentColor'
                    d='M40.031 39.156c6.813 0 12.594-6.062 12.594-13.906 0-7.656-5.812-13.531-12.594-13.531-6.812 0-12.656 5.969-12.625 13.594 0 7.78 5.782 13.843 12.625 13.843M59.47 68.22c5.156 0 6.937-1.563 6.937-4.438 0-8.031-10.187-19.093-26.406-19.093-16.187 0-26.406 11.062-26.406 19.093 0 2.875 1.781 4.438 6.937 4.438z'
                  ></path>
                </svg>
                <Heading as='h3' size='xl' className='ml-2 !text-white-A700_bf'>
                  Name
                </Heading>
                <Button
                  size='small'
                  className='ml-[200px] bg-gray-100 w-[100px] font-bold'
                >
                  Required
                </Button>
              </div>
              <div className='mt-3 flex flex-row items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 80 80'
                  className='w-5'
                >
                  <path
                    fill='currentColor'
                    d='M40.031 39.156c6.813 0 12.594-6.062 12.594-13.906 0-7.656-5.812-13.531-12.594-13.531-6.812 0-12.656 5.969-12.625 13.594 0 7.78 5.782 13.843 12.625 13.843M59.47 68.22c5.156 0 6.937-1.563 6.937-4.438 0-8.031-10.187-19.093-26.406-19.093-16.187 0-26.406 11.062-26.406 19.093 0 2.875 1.781 4.438 6.937 4.438z'
                  ></path>
                </svg>
                <Heading as='h3' size='xl' className='ml-2 !text-white-A700_bf'>
                  MSSV
                </Heading>
                <Button
                  size='small'
                  className='ml-[200px] bg-gray-100 w-[100px] font-bold'
                >
                  Required
                </Button>
              </div>
              <div className='mt-3 flex flex-row items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  className='w-5'
                >
                  <path
                    fill='currentColor'
                    fill-rule='evenodd'
                    d='M12.5 10V6c0-1.352-.002-2.234-.08-2.893-.075-.627-.198-.854-.306-.985a1.7 1.7 0 0 0-.236-.236c-.13-.108-.358-.232-.985-.306-.214-.025-.394.147-.457.354A1.5 1.5 0 0 1 9 3H7a1.5 1.5 0 0 1-1.436-1.066c-.063-.207-.243-.379-.457-.354-.627.074-.854.198-.985.306a1.7 1.7 0 0 0-.236.236c-.108.13-.232.358-.306.985-.078.66-.08 1.541-.08 2.893v4c0 1.352.002 2.234.08 2.893.074.627.198.854.306.986q.106.129.236.235c.13.108.358.231.985.306.66.078 1.541.08 2.893.08s2.234-.002 2.893-.08c.627-.075.854-.198.986-.306q.129-.106.235-.236c.108-.13.231-.358.306-.985.078-.66.08-1.541.08-2.893m.33-9.274c-.754-.618-1.82-.71-3.745-.724L9 0H7q-.042 0-.085.002C4.99.016 3.924.108 3.17.726a3.2 3.2 0 0 0-.444.444C2 2.055 2 3.37 2 6v4c0 2.63 0 3.945.726 4.83q.2.243.444.444C4.055 16 5.37 16 8 16s3.945 0 4.83-.726q.243-.2.444-.444C14 13.945 14 12.63 14 10V6c0-2.63 0-3.945-.726-4.83a3.2 3.2 0 0 0-.444-.444M7.5 11.7a.8.8 0 0 0 0 1.6h1a.8.8 0 0 0 0-1.6z'
                  ></path>
                </svg>
                <Heading
                  as='h3'
                  size='xl'
                  className='ml-2  !text-white-A700_bf'
                >
                  Phone Number
                </Heading>
                <Button
                  size='small'
                  className='ml-[130px] bg-gray-100 w-[100px] font-bold'
                >
                  Required
                </Button>
                
              </div>
              <Button className='mt-5 bg-gray-100 flex flex-row items-center gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    className='w-3'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M8.5 1.75a.75.75 0 0 0-1.5 0V7H1.75a.75.75 0 0 0 0 1.5H7v5.25a.75.75 0 0 0 1.5 0V8.5h5.25a.75.75 0 0 0 0-1.5H8.5z'
                    ></path>
                  </svg>
                  <p>Add Question</p>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
