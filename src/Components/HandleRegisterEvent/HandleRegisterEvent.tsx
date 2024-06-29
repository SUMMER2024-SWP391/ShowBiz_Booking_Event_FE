import { Event } from 'src/@types/event.type'
import { Register } from '../EventDetail/Register'
import { Button } from '../Button/Button'
import { useMutation } from '@tanstack/react-query'
import paymentAPI from 'src/apis/payment.api'
import eventApi from 'src/apis/event.api'
import { useNavigate } from 'react-router-dom'
import { ErrorResponse } from 'src/@types/utils.type'
import {
  isAxiosError,
  isAxiosErrorConflictAndNotPermisson
} from 'src/utils/utils'
import { toast } from 'react-toastify'

type Props = {
  event: Event
}

const handleComponentEvent = (event: Event): JSX.Element => {
  const navigate = useNavigate()
  const handlePayment = useMutation({
    mutationFn: (id: string) => paymentAPI.pay(id)
  })

  const handleRegisterEventNoFormNoPaymentMutation = useMutation({
    mutationFn: (id: string) => eventApi.registerNoFormNoPayment(id)
  })

  const handleRegisterNoPaymentNoForm = (id: string) => () => {
    handleRegisterEventNoFormNoPaymentMutation.mutate(id, {
      onSuccess: (data) => {
        toast.success(`$${data.data.message}`)
        navigate(`/event/${id}`)
      },
      onError: (error) => {
        if (isAxiosErrorConflictAndNotPermisson<ErrorResponse<{}>>(error)) {
          toast.error(error.response?.data.message)
        }
      }
    })
  }

  const handleClickForPaymentAPI = () => {
    handlePayment.mutate(event._id, {
      onSuccess: (data) => {
        window.location.assign(data.data.data.url)
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse<{}>>(error)) {
          toast.error(error.response?.data.message)
        }
      }
    })
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
    return (
      <Button
        size='lg'
        shape='round'
        className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
        onClick={handleClickForPaymentAPI}
      >
        Register now
      </Button>
    )
  }
  return (
    <Button
      size='lg'
      shape='round'
      className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
      onClick={handleRegisterNoPaymentNoForm(event._id)}
    >
      Register now
    </Button>
  )
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
