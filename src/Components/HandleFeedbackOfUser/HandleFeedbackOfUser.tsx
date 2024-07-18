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
  return (
    <>
      {isHasFormFeedBack ? (
        isFeedback ? (
          <div className='flex justify-center items-center text-blue'>
            Thank you to go this event
          </div>
        ) : (
          <FeedbackEventOfUser id={_id} />
        )
      ) : (
        <div className='flex justify-center items-center text-blue'>
          Thank you to go this event
        </div>
      )}
    </>
  )
}

export default HandleFeedbackOfUser
