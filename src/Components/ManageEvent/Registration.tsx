import { Button, Switch } from 'antd'
import React, { useState } from 'react'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'
import { FormRegister } from '../FormRegister/FormRegister'

export const Registration = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='mt-10 m-auto w-[820px] container'>
      <div className=' flex flex-row items-center justify-between'>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' className='w-7'>
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M22.75 9c-.69 0-1.25-.56-1.25-1.25V3.2a.2.2 0 0 0-.2-.2H5.723C3.116 3 1.001 5.61 1.001 8.834L1 12.014c0 .336 0 .504.074.608s.286.178.711.327c1.124.394 1.942 1.61 1.942 3.05 0 1.441-.818 2.658-1.942 3.052-.425.149-.638.223-.711.327C1 19.482 1 19.65 1 19.985v3.18C1 26.39 3.113 29 5.722 29H21.3a.2.2 0 0 0 .2-.2v-4.55a1.25 1.25 0 0 1 2.5 0v4.55c0 .11.09.2.2.2h2.078C28.887 29 31 26.39 31 23.166v-3.181c0-.335 0-.503-.074-.607-.073-.104-.286-.178-.711-.327-1.124-.394-1.942-1.61-1.942-3.051 0-1.44.818-2.657 1.942-3.05.425-.15.637-.224.711-.328s.074-.272.074-.607l-.002-3.18C30.999 5.61 28.885 3 26.278 3H24.2a.2.2 0 0 0-.2.2v4.55C24 8.44 23.44 9 22.75 9m-1.25 9.75a1.25 1.25 0 1 0 2.5 0v-5.5a1.25 1.25 0 0 0-2.5 0zm-6.634-.65a1.25 1.25 0 0 1 .035 1.766l-4.04 4.2a1.25 1.25 0 0 1-1.803 0l-1.96-2.04a1.25 1.25 0 0 1 1.803-1.733l.915.953a.2.2 0 0 0 .289 0l2.994-3.113a1.25 1.25 0 0 1 1.767-.034'
              ></path>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>Registration</Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                Open
              </Text>
            </div>
          </div>
        </Button>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' className='w-7'>
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M8 15.875c-.69 0-1.25-.56-1.25-1.25v-4.254c-1.98-.017-3.013-.126-3.323-.838-.366-.84.57-1.848 2.442-3.865l.08-.085c.96-1.035 1.44-1.552 2.05-1.552.611 0 1.092.517 2.053 1.552l.079.085c1.872 2.017 2.808 3.025 2.442 3.865-.31.712-1.344.82-3.323.838v4.254c0 .69-.56 1.25-1.25 1.25m6-13.25a1.25 1.25 0 1 0 0-2.5H2a1.25 1.25 0 0 0 0 2.5z'
              ></path>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>Event Capacity</Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                50 - Waitlist Off
              </Text>
            </div>
          </div>
        </Button>
        <Button type='default' className='w-[257px] h-[56px] rounded-[15px]  '>
          <div className='flex flex-1 items-center gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-7'>
              <g fill='currentColor' fill-rule='evenodd'>
                <path d='M14.925 8.246a.853.853 0 1 0 1.705 0v-1.72c0-.377.305-.682.682-.682h1.677c1.778 0 3.22 1.774 3.22 3.965l.001 2.147c0 .233 0 .35-.051.422s-.2.125-.496.232c-.76.271-1.313 1.095-1.313 2.069 0 .973.553 1.797 1.313 2.069.297.106.445.16.496.231.051.073.051.19.051.422v2.148c0 2.19-1.441 3.965-3.22 3.965h-1.678a.68.68 0 0 1-.682-.682v-1.72a.852.852 0 1 0-1.705 0v1.72a.68.68 0 0 1-.682.682H4.97c-1.779 0-3.22-1.775-3.22-3.965V17.4c0-.233 0-.35.05-.422.052-.072.2-.125.497-.231.76-.272 1.313-1.096 1.313-2.07s-.553-1.797-1.313-2.068c-.297-.107-.445-.16-.496-.232s-.051-.189-.05-.422V9.81c0-2.19 1.442-3.965 3.22-3.965h9.272c.377 0 .682.305.682.682zm0 8.37a.853.853 0 1 0 1.705 0v-3.875a.852.852 0 1 0-1.705 0z'></path>
                <path d='M15.44 2.636a3.64 3.64 0 0 0-3.295.56l-5.842 4.4a.982.982 0 0 1-1.181-1.568l5.842-4.4a5.6 5.6 0 0 1 7.85 1.112l.104.14a3.93 3.93 0 0 1 .178 4.456.982.982 0 1 1-1.66-1.048c.436-.69.4-1.577-.089-2.23l-.104-.14a3.64 3.64 0 0 0-1.803-1.282'></path>
              </g>
            </svg>
            <div className='flex flex-col items-start'>
              <Text className='!text-black-900 text-[16px] !font-euclid'>Group Registration</Text>
              <Text size='md' as='p' className='!text-black_supper_light'>
                Off
              </Text>
            </div>
          </div>
        </Button>
      </div>
      <div className='mt-5 flex flex-row justify-between'>
        <Text size='xl' className='!font-semibold'>
          Tickets
        </Text>
        <Button className='bg-gray-100 flex flex-row items-center gap-3'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' className='w-3'>
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
        <div className='w-[386px] h-[178px] border border-solid shadow-2xl rounded-[15px] p-4 justify-between'>
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
          <Text as='p' size='xl' className='mt-5 font-euclid text-[30px] !text-black-900'>
            Free
          </Text>
          <div className='mt-3 flex flex-row justify-between'>
            <Text className='!text-black-900 text-[16px]'>Require Approval</Text>
            <Switch size='small' defaultChecked disabled />
          </div>
          <div className='mt-3 h-px w-full self-stretch bg-black_supper_light opacity-25' />
          <div className='flex flex-row justify-between mt-2 '>
            <Text className='!text-black-900'>Avaliable</Text>
            <Text className='!text-black-900'>0 Registered</Text>
          </div>
        </div>
      </div>
      <div className='mt-5 h-px w-full self-stretch bg-black_supper_light' />
      <div className='mt-5'>
        <Heading className='text-[25px] '>Registration Questions</Heading>
        <Text className='mt-3  text-[16px]'>We will ask guests the following questions when they register for the event.</Text>
        <div className=' flex flex-col'>
          <div className='mt-3 flex flex-row items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-[16px] h-[16px]'>
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M6.414 1c-1.17 0-2.293.465-3.121 1.293a1 1 0 1 0 1.414 1.414A2.41 2.41 0 0 1 6.414 3h11.172c.64 0 1.254.254 1.707.707a1 1 0 1 0 1.414-1.414A4.41 4.41 0 0 0 17.586 1zM0 14c0-3.75 0-5.625.955-6.939A5 5 0 0 1 2.06 5.955C3.375 5 5.251 5 9 5h6c3.75 0 5.625 0 6.939.955a5 5 0 0 1 1.106 1.106C24 8.375 24 10.251 24 14s0 5.625-.955 6.939a5 5 0 0 1-1.106 1.106C20.625 23 18.749 23 15 23H9c-3.75 0-5.625 0-6.939-.955A5 5 0 0 1 .955 20.94C0 19.625 0 17.749 0 14m10.398.36v-.002c0-.265-.17-.476-.377-.734-.325-.406-.743-.927-.743-1.957 0-1.563 1.208-2.85 2.722-2.85 1.513 0 2.721 1.287 2.721 2.85 0 1.03-.418 1.551-.743 1.957-.207.258-.376.469-.376.734v.002c0 .425.536.677 1.15.965.822.387 1.784.838 1.784 1.856 0 2.006-3.093 2.004-4.457 2.003h-.158c-1.365 0-4.457.003-4.457-2.003 0-1.018.961-1.47 1.783-1.856.615-.288 1.151-.54 1.151-.965'
              ></path>
            </svg>
            <Text className='ml-3 text-[16px] _bf'>Personal Information</Text>
          </div>
          <div className='mt-5 w-full flex flex-row items-center justify-between'>
            <div className='border rounded-lg shadow-md px-4 py-2 w-full flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center '>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' className='!text-black-900 w-[16px] h-[16px]'>
                  <g clip-path='url(#UserFilled16_svg__a)'>
                    <path
                      fill='currentColor'
                      d='m5.529 8.556-.001-.003C5.528 7.5 3.8 7 3.8 4.4 3.8 1.987 5.664 0 8 0s4.2 1.987 4.2 4.4c0 2.6-1.728 3.1-1.728 4.153v.003c0 1.531 4.528 1.609 4.528 4.353C15 16.066 10.036 16 8 16s-7 .066-7-3.09c0-2.745 4.529-2.823 4.529-4.354'
                    ></path>
                  </g>
                  <defs>
                    <clipPath id='UserFilled16_svg__a'>
                      <path fill='currentColor' d='M0 0h16v16H0z'></path>
                    </clipPath>
                  </defs>
                </svg>
                <Text className='ml-1'>Full Name</Text>
              </div>
              <Text as='p' size='lg' className='text-opacity-50'>
                Require
              </Text>
            </div>
            <div className='border rounded-lg shadow-md px-4 py-2 w-full ml-10 flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center '>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' className='!text-black-900 w-[16px] h-[16px]'>
                  <g clip-path='url(#UserFilled16_svg__a)'>
                    <path
                      fill='currentColor'
                      d='m5.529 8.556-.001-.003C5.528 7.5 3.8 7 3.8 4.4 3.8 1.987 5.664 0 8 0s4.2 1.987 4.2 4.4c0 2.6-1.728 3.1-1.728 4.153v.003c0 1.531 4.528 1.609 4.528 4.353C15 16.066 10.036 16 8 16s-7 .066-7-3.09c0-2.745 4.529-2.823 4.529-4.354'
                    ></path>
                  </g>
                  <defs>
                    <clipPath id='UserFilled16_svg__a'>
                      <path fill='currentColor' d='M0 0h16v16H0z'></path>
                    </clipPath>
                  </defs>
                </svg>
                <Text className='ml-1'>Student Id</Text>
              </div>
              <Text as='p' size='lg' className='text-opacity-50'>
                Require
              </Text>
            </div>
            <div className='border rounded-lg shadow-md px-4 py-2 w-full ml-10 flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center '>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' className='!text-black-900 w-[16px] h-[16px]'>
                  <g clip-path='url(#UserFilled16_svg__a)'>
                    <path
                      fill='currentColor'
                      d='m5.529 8.556-.001-.003C5.528 7.5 3.8 7 3.8 4.4 3.8 1.987 5.664 0 8 0s4.2 1.987 4.2 4.4c0 2.6-1.728 3.1-1.728 4.153v.003c0 1.531 4.528 1.609 4.528 4.353C15 16.066 10.036 16 8 16s-7 .066-7-3.09c0-2.745 4.529-2.823 4.529-4.354'
                    ></path>
                  </g>
                  <defs>
                    <clipPath id='UserFilled16_svg__a'>
                      <path fill='currentColor' d='M0 0h16v16H0z'></path>
                    </clipPath>
                  </defs>
                </svg>
                <Text className='ml-1'>Phone Number</Text>
              </div>
              <Text as='p' size='lg' className='text-opacity-50'>
                Require
              </Text>
            </div>
          </div>
        </div>
        <FormRegister />
      </div>
    </div>
  )
}
