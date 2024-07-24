import { useState } from 'react'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { FormRegister } from '../FormRegister/FormRegisterToAnswer'
import { Event } from 'src/@types/event.type'

type Props = {
  _id: string
  event: Event
}
export const Register = ({ _id }: Props) => {
  const [togglePop, setTogglePop] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-blue_gray-900_02 pb-[26px] shadow-xl sm:pb-5'>
      <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-gray-800 px-6 pb-[7px] pt-3 sm:px-5'>
        <Heading size='s' as='p' className='!font-semibold'>
          You're In
        </Heading>
      </div>
      <Text size='s' as='p' className='ml-6 self-start '>
        A confirmation email has been sent to your email address. Please check
        your email and click on the link to confirm your registration.
      </Text>

      <Button
        size='lg'
        shape='round'
        className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
        onClick={() => {
          setTogglePop(true)
          setIsRegister(true)
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='size-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z'
          />
        </svg>
        My Ticket
      </Button>
      {togglePop && (
        <FormRegister
          className='w-full h-full bg-blue_gray-400_01 border border-gray-900_03 border-solid'
          setTrigger={setTogglePop}
          _id={_id || ''}
          setIsRegister={setIsRegister}
        />
      )}
    </div>
  )
}
