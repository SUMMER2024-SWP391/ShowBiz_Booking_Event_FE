import { Button } from '../Button/Button'
import FeedbackEventOfUser from '../FeedbackEventOfUser/FeedbackEventOfUser'

type Props = {
  _id: string
  isFeedback: boolean
  isHasFormFeedBack: boolean
}
const HandleFeedbackOfUser = ({
  _id,
  isHasFormFeedBack,
  isFeedback
}: Props) => {
  console.log(1)
  return (
    <>
      {isHasFormFeedBack ? (
        isFeedback ? (
          <Button
            size='lg'
            shape='round'
            className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
            disabled
          >
            Thank you to go this event
          </Button>
        ) : (
          <FeedbackEventOfUser id={_id} />
        )
      ) : (
        <Button
          size='lg'
          shape='round'
          className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
          disabled
        >
          Thank you to go this event
        </Button>
      )}
    </>
  )
}

export default HandleFeedbackOfUser
