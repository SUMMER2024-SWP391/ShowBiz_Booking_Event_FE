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
      {!isFeedback && <FeedbackEventOfUser id={_id} />}
      {/* {isFeedback && (
        <div className='flex justify-center items-center text-blue'>
          Thank you to go this event
        </div>
      )}
      {isHasFormFeedBack && (
        <div className='flex justify-center items-center text-blue'>
          Thank you to go this event
        </div>
      )} */}
    </>
  )
}

export default HandleFeedbackOfUser
