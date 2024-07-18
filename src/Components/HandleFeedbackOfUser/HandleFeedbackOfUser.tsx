import { Button } from '../Button/Button'
import FeedbackEventOfUser from '../FeedbackEventOfUser/FeedbackEventOfUser'

type Props = {
  _id: string
  isFeedback: boolean
  isHasFormFeedBack: boolean
  statusCheckIn: boolean
}
const HandleFeedbackOfUser = ({
  _id,
  isHasFormFeedBack,
  isFeedback,
  statusCheckIn
}: Props) => {
  return (
    <>
      {statusCheckIn ? ( //nếu status check in true thì vô cái này
        isHasFormFeedBack ? ( //có form feedback
          isFeedback ? ( //feedback rồi thì hiển thị ra lời cảm ơn
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
          //ko có form feedback rồi thì hiển thị ra lời cảm ơn
          <Button
            size='lg'
            shape='round'
            className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
            disabled
          >
            Thank you to go this event
          </Button>
        )
      ) : (
        //ko đi sự kiện thì sẽ hiển thị ra bạn đã miss sự kiện
        <Button
          size='lg'
          shape='round'
          className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#F5222D] hover:bg-[#ff4d4f] text-white-A700'
          disabled
        >
          You was missed this event
        </Button>
      )}
    </>
  )
}

export default HandleFeedbackOfUser
