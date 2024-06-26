import React, { useState } from 'react'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { FormRegister } from '../FormRegister/FormRegister'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
type Props = {
  _id: string
}
export const Register = ({ _id }: Props) => {
  const [togglePop, setTogglePop] = useState(false)

  return (
    <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-blue_gray-900_02 pb-[26px] shadow-xl sm:pb-5'>
      <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-gray-800 px-6 pb-[7px] pt-3 sm:px-5'>
        <Heading size='s' as='p' className='!font-semibold'>
          Registration
        </Heading>
      </div>
      <Text size='s' as='p' className='ml-6 self-start '>
        Welcome! To join the event, please register below.
      </Text>

      <Button
        size='lg'
        shape='round'
        className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
        onClick={() => {
          setTogglePop(true)
        }}
      >
        Register Now
      </Button>
      {togglePop && (
        <FormRegister
          className='w-full h-full bg-blue_gray-400_01 border border-gray-900_03 border-solid'
          setTrigger={setTogglePop}
          _id={_id || ''}
        />
      )}
    </div>
  )
}
