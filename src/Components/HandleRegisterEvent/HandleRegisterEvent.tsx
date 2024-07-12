import { Event } from 'src/@types/event.type'
import { Register } from '../EventDetail/Register'
import { Button } from '../Button/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import paymentAPI from 'src/apis/payment.api'
import eventApi from 'src/apis/event.api'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorResponse, StatusRegisterEvent } from 'src/@types/utils.type'
import {
  isAxiosError,
  isAxiosErrorConflictAndNotPermisson,
  NoNullable
} from 'src/utils/utils'
import { toast } from 'react-toastify'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'

type Props = {
  event: Event
}

const handleComponentEvent = (event: Event): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['ticket-detail'],
    queryFn: () => eventApi.getTicket(id as string)
  })

  const handleCancelEventMutation = useMutation({
    mutationFn: ({ id, registerId }: { id: string; registerId: string }) =>
      eventApi.cancelEvent(id, registerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ticket-detail'],
        exact: true
      }),
        toast.success('Cancel event successfully')
    }
  })

  const handleCancelEvent = (registerId: string) => () => {
    const newId = id ? id : ''
    const query = { id: newId, registerId }
    handleCancelEventMutation.mutate(query)
  }

  console.log(data)

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
        queryClient.invalidateQueries({
          queryKey: ['ticket-detail'],
          exact: true
        })
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

  if (!data?.data.data.ticket.register) {
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
        <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-pink-normail pb-[26px] shadow-md sm:pb-5'>
          <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
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
            className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
            onClick={handleClickForPaymentAPI}
          >
            Register Now
          </Button>
        </div>
      )
    }
    return (
      <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-pink-normail pb-[26px] shadow-md sm:pb-5'>
        <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
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
          className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
          onClick={handleRegisterNoPaymentNoForm(event._id)}
        >
          Register Now
        </Button>
      </div>
    )
  }
  return (
    <>
      <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-pink-normail pb-[26px] shadow-md sm:pb-5'>
        <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
          <Heading size='s' as='p' className='!font-semibold'>
            You are in this event now
          </Heading>
        </div>
        <Text size='s' as='p' className='ml-6 self-start '>
          This is your code to help you checkin in this event
        </Text>

        <Button
          size='lg'
          shape='round'
          className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
          disabled
        >
          {data?.data.data.ticket.register.otp_check_in}
        </Button>

        {data?.data.data.ticket.register.status_register ==
          StatusRegisterEvent.SUCCESS && (
          <Button
            size='lg'
            shape='round'
            className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-red  text-white-A700'
            onClick={handleCancelEvent(data.data.data.ticket.register._id)}
          >
            Cancel event
          </Button>
        )}
      </div>
    </>
  )
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
