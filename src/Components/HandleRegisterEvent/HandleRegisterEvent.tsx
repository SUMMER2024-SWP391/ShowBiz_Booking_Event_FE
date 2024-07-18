import { Event } from 'src/@types/event.type'
import { Register } from '../EventDetail/Register'
import { Button } from '../Button/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import paymentAPI from 'src/apis/payment.api'
import eventApi from 'src/apis/event.api'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ErrorResponse,
  StatusRegisterEvent,
  SuccessResponse
} from 'src/@types/utils.type'
import {
  canCancelEvent,
  isAxiosError,
  isAxiosErrorConflictAndNotPermisson,
  isValidToFeeback
} from 'src/utils/utils'
import { toast } from 'react-toastify'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'

import { useContext, useState } from 'react'
import { Modal, Button as ButtonAntd } from 'antd'
import { AppContext } from 'src/context/app.context'
import HandleLoginWhenRegisterEvent from '../HandleLoginWhenRegisterEvent/HandleLoginWhenRegisterEvent'
import FeedbackEventOfUser from '../FeedbackEventOfUser/FeedbackEventOfUser'
import HandleFeedbackOfUser from '../HandleFeedbackOfUser/HandleFeedbackOfUser'
import { AxiosResponse } from 'axios'
import { Ticket } from 'src/@types/ticket.type'
import { User } from 'src/@types/users.type'

type Props = {
  event: Event
}

const handleComponentEvent = (event: Event): JSX.Element => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AppContext)
  const [popupCancel, setPopupCancel] = useState(false)

  const { id } = useParams()
  const queryClient = useQueryClient()
  let newData:
    | AxiosResponse<
        SuccessResponse<{
          ticket: {
            register: Ticket
            event: Event
            user_profile: User
          }
        }>,
        any
      >
    | null
    | undefined = null
  if (isAuthenticated) {
    const { data } = useQuery({
      queryKey: ['ticket-detail'],
      queryFn: () => eventApi.getTicket(id as string)
    })
    newData = data ? data : null
  }
  console.log(newData)
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
    setPopupCancel(false)
  }

  const handlePayment = useMutation({
    mutationFn: (id: string) => paymentAPI.pay(id)
  })

  const handleRegisterEventNoFormNoPaymentMutation = useMutation({
    mutationFn: (id: string) => eventApi.registerNoFormNoPayment(id)
  })

  const handleRegisterNoPaymentNoForm = (id: string) => () => {
    handleRegisterEventNoFormNoPaymentMutation.mutate(id, {
      onSuccess: (data) => {
        toast.success(`${data.data.message}`)
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

  if (
    (newData && !newData.data.data.ticket.register) ||
    !isAuthenticated ||
    !newData
  ) {
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

          <HandleLoginWhenRegisterEvent
            handleRegisterEvent={handleClickForPaymentAPI}
          />
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

        <HandleLoginWhenRegisterEvent
          handleRegisterEvent={handleRegisterNoPaymentNoForm(event._id)}
        />
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

        {!newData.data.data.ticket.register.status_check_in && (
          <>
            <Text size='s' as='p' className='ml-6 self-start '>
              This is your code to help you checkin in this event
            </Text>
            <Text
              size='lg'
              className='min-w-[423px] text-center rounded-md font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
            >
              {newData.data.data.ticket.register.otp_check_in}
            </Text>
          </>
        )}

        {newData != undefined &&
          newData.data.data.ticket.register.status_register ==
            StatusRegisterEvent.SUCCESS &&
          canCancelEvent(
            newData.data.data.ticket.event.date_event,
            newData.data.data.ticket.event.time_start
          ) && (
            <>
              <Button
                size='lg'
                shape='round'
                className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-red  text-white-A700'
                onClick={() => setPopupCancel(true)}
              >
                Cancel event
              </Button>
              <Modal
                title={
                  <div className='flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                      />
                    </svg>
                    <span className='ml-1 mb-2'>Confirm</span>
                  </div>
                }
                centered
                open={popupCancel}
                okButtonProps={{ danger: true }}
                okText={'Confirm'}
                onCancel={() => setPopupCancel(false)}
                onOk={handleCancelEvent(newData.data.data.ticket.register._id)}
              >
                <p>Are you really want to cancel this event?</p>
              </Modal>
            </>
          )}

        {isAuthenticated &&
          isValidToFeeback(
            newData.data.data.ticket.event.date_event,
            newData.data.data.ticket.event.time_end
          ) &&
          newData.data.data.ticket.register.status_check_in && (
            <HandleFeedbackOfUser
              _id={newData.data.data.ticket.event._id as string}
              isFeedback={newData.data.data.ticket.register.isFeedback}
              isHasFormFeedBack={
                newData.data.data.ticket.register.isHasFormFeedback
                  ? true
                  : false
              }
            />
          )}
      </div>
    </>
  )
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
