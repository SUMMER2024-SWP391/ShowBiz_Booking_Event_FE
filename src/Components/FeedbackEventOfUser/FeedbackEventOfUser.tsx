import { useState } from 'react'
import { Button } from '../Button/Button'
import ModalPopup from '../ModalPopup/ModalPopup'
import { FormFeedbackToAnswer } from '../FormFeedbackToAnswer/FormFeedbackToAnswer'

interface Props {
  id: string
}

const FeedbackEventOfUser = ({ id }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Button
        size='lg'
        shape='round'
        className='min-w-[423px] font-semibold hover:shadow-md sm:px-5  text-white-A700 bg-[#0958d9] hover:bg-[#4096ff] mt-4'
        onClick={() => setOpen(true)}
      >
        Feedback now
      </Button>
      <ModalPopup
        open={open}
        onClose={() => setOpen(false)}
        children={<FormFeedbackToAnswer _id={id} />}
      />
    </>
  )
}

export default FeedbackEventOfUser
