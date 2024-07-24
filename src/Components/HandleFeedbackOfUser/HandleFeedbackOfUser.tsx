import { Button } from '../Button/Button'
import FeedbackEventOfUser from '../FeedbackEventOfUser/FeedbackEventOfUser'
import { Text } from '../Text/Text'

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
            <Text
              size='lg'
              as='p'
              className='!text-[16px] text-center font-semibold hover:shadow-md sm:px-5 text-white-A700'
            >
              Thank you to go this event
            </Text>
          ) : (
            <FeedbackEventOfUser id={_id} />
          )
        ) : (
          //ko có form feedback rồi thì hiển thị ra lời cảm ơn
          <Text
            size='lg'
            as='p'
            className='!text-[16px] text-center font-semibold hover:shadow-md sm:px-5 text-white-A700'
          >
            Thank you to go this event
          </Text>
        )
      ) : (
        //ko đi sự kiện thì sẽ hiển thị ra bạn đã miss sự kiện
        <Text
          size='lg'
          as='p'
          className='!text-[16px] text-center font-semibold hover:shadow-md sm:px-5 text-white-A700'
        >
          You missed this event
        </Text>
      )}
    </>
  )
}

export default HandleFeedbackOfUser
