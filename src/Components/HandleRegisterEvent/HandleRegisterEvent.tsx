import { Event } from 'src/@types/event.type'
import { Register } from '../EventDetail/Register'
import { Button } from '../Button/Button'
import { useMutation } from '@tanstack/react-query'
import paymentAPI from 'src/apis/payment.api'

type Props = {
  event: Event
}

const handleComponentEvent = (event: Event): JSX.Element => {
  const handlePayment = useMutation({
    mutationFn: (id: string) => paymentAPI.pay(id)
  })

  const handleClick = () => {
    handlePayment.mutate(event._id)
  }

  if (event.is_required_form_register && Number(event.ticket_price) !== 0) {
    return <Register _id={event._id} event={event} />
  } else if (
    event.is_required_form_register &&
    Number(event.ticket_price) === 0
  ) {
    return <Register _id={event._id} event={event} />
  } else if (
    !event.is_required_form_register &&
    Number(event.ticket_price) !== 0
  ) {
    return <>3</>
  }
  return (
    <Button
      size='lg'
      shape='round'
      className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
      onClick={handleClick}
    >
      Register now
    </Button>
  )
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
