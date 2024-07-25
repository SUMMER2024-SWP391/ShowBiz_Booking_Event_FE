import { useContext, useState } from 'react'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { FormRegisterToAnswer } from '../FormRegister/FormRegisterToAnswer'
import { Event } from 'src/@types/event.type'
import { AppContext } from 'src/context/app.context'
import HandleLoginWhenRegisterEvent from '../HandleLoginWhenRegisterEvent/HandleLoginWhenRegisterEvent'
import ModalPopup from '../ModalPopup/ModalPopup'

type Props = {
  _id: string
  event: Event
}
export const Register = ({ _id }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
      <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
        <Heading size='s' as='p' className='!font-semibold !text-white-A700'>
          Registration
        </Heading>
      </div>
      <Text
        size='s'
        as='p'
        className='ml-6 self-start !text-white-A700 !text-[16px]'
      >
        Welcome! To join the event, please register below.
      </Text>
      <HandleLoginWhenRegisterEvent
        handleRegisterEvent={() => {
          setOpen(true)
        }}
      />

      <ModalPopup
        type=''
        open={open}
        onClose={() => setOpen(false)}
        children={<FormRegisterToAnswer _id={_id || ''} />}
      />
    </div>
  )
}
