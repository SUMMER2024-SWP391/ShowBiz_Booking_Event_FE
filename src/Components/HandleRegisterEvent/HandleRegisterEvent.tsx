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
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'

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
      // <div className={`flex flex-col view_detail fixed inset-0`}>
      //   <Button
      //     size='lg'
      //     shape='round'
      //     className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
      //     onClick={handleClickForPaymentAPI}
      //   >
      //     Register now
      //   </Button>
      // </div>
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
          onClick={handleClickForPaymentAPI}
        >
          Register Now
        </Button>
      </div>
    )
  }
  return (
    // <Button
    //   size='lg'
    //   shape='round'
    //   className='min-w-[423px] font-semibold shadow-2xl sm:px-5 bg-blue_gray-800 text-white-A700'
    //   onClick={handleRegisterNoPaymentNoForm(event._id)}
    // >
    //   Register now
    // </Button>
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
          onClick={handleRegisterNoPaymentNoForm(event._id)}
        >
          Register Now
        </Button>
      </div>
  )
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
