import { Event } from 'src/@types/event.type'
import { Register } from '../EventDetail/Register'
import { Button } from '../Button/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import paymentAPI from 'src/apis/payment.api'
import eventApi from 'src/apis/event.api'
import { useParams } from 'react-router-dom'
import { ErrorResponse, StatusRegisterEvent } from 'src/@types/utils.type'
import { canCancelEvent, isAxiosError, isAxiosErrorConflictAndNotPermisson, isValidToFeeback } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { Text } from '../Text/Text'
import { Heading } from '../Heading/Heading'

import { useContext, useState } from 'react'
import { Modal } from 'antd'
import { AppContext } from 'src/context/app.context'
import HandleLoginWhenRegisterEvent from '../HandleLoginWhenRegisterEvent/HandleLoginWhenRegisterEvent'
import HandleFeedbackOfUser from '../HandleFeedbackOfUser/HandleFeedbackOfUser'
import { isValidToRegister } from 'src/utils/checkEventDate'

type Props = {
  event: Event
}

const handleComponentEvent = (event: Event): JSX.Element => {
  const { isAuthenticated } = useContext(AppContext)
  const [popupCancel, setPopupCancel] = useState(false)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const handleCancelEventMutation = useMutation({
    mutationFn: ({ id, registerId }: { id: string; registerId: string }) => eventApi.cancelEvent(id, registerId),
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

  if (!isAuthenticated) {
    if (isValidToRegister(event.date_event, event.time_start)) {
      if (event.is_required_form_register && Number(event.ticket_price) !== 0) {
        return <Register _id={event._id} event={event} />
      } else if (event.is_required_form_register && Number(event.ticket_price) === 0) {
        return <Register _id={event._id} event={event} />
      } else if (!event.is_required_form_register && Number(event.ticket_price) !== 0) {
        return (
          <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
            <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
              <Heading size='s' as='p' className='!font-semibold !text-white-A700'>
                Registration
              </Heading>
            </div>
            <Text size='s' as='p' className='ml-6 self-start !text-white-A700 !text-[16px]'>
              Welcome! To join the event, please register below.
            </Text>

            <HandleLoginWhenRegisterEvent handleRegisterEvent={handleClickForPaymentAPI} />
          </div>
        )
      }
      return (
        <div className='mt-[37px] flex flex-col items-center gap-[10px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
          <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
            <Heading size='2xl' as='h1' className='!font-semibold !text-white-A700'>
              Registration
            </Heading>
          </div>
          <Text size='s' as='p' className='ml-6 self-start !text-white-A700 !text-[16px]'>
            Welcome! To join the event, please register below.
          </Text>

          <HandleLoginWhenRegisterEvent handleRegisterEvent={handleRegisterNoPaymentNoForm(event._id)} />
        </div>
      )
    } else {
      return (
        <div className='mt-[37px] flex flex-col items-center gap-[10px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
          <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
            <Heading size='2xl' as='h1' className='!font-semibold !text-white-A700'>
              Notification
            </Heading>
          </div>
          <Button size='lg' shape='round' className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 !bg-[#F5222D] text-white-A700' disabled>
            This event was end
          </Button>
        </div>
      )
    }
  } else {
    const { data } = useQuery({
      queryKey: ['ticket-detail'],
      queryFn: () => eventApi.getTicket(id as string)
    })
    if (data && !data.data.data.ticket.register && isValidToRegister(event.date_event, event.time_start)) {
      //no register and event is upcoming
      if (event.is_required_form_register && Number(event.ticket_price) !== 0) {
        return <Register _id={event._id} event={event} />
      } else if (event.is_required_form_register && Number(event.ticket_price) === 0) {
        return <Register _id={event._id} event={event} />
      } else if (!event.is_required_form_register && Number(event.ticket_price) !== 0) {
        return (
          <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
            <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
              <Heading size='s' as='p' className='!font-semibold !text-white-A700'>
                Registration
              </Heading>
            </div>
            <Text size='s' as='p' className='ml-6 self-start !text-white-A700 !text-[16px]'>
              Welcome! To join the event, please register below.
            </Text>

            <HandleLoginWhenRegisterEvent handleRegisterEvent={handleClickForPaymentAPI} />
          </div>
        )
      }
      return (
        <div className='mt-[37px] flex flex-col items-center gap-[10px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
          <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
            <Heading size='2xl' as='h1' className='!font-semibold !text-white-A700'>
              Registration
            </Heading>
          </div>
          <Text size='s' as='p' className='ml-6 self-start !text-white-A700 !text-[16px]'>
            Welcome! To join the event, please register below.
          </Text>

          <HandleLoginWhenRegisterEvent handleRegisterEvent={handleRegisterNoPaymentNoForm(event._id)} />
        </div>
      )
    } else if (data && !data.data.data.ticket.register && !isValidToRegister(event.date_event, event.time_start)) {
      //no register and event is close
      return (
        <div className='mt-[37px] flex flex-col items-center gap-[10px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
          <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
            <Heading size='2xl' as='h1' className='!font-semibold !text-white-A700'>
              Notification
            </Heading>
          </div>
          <Button size='lg' shape='round' className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 !bg-[#F5222D] text-white-A700' disabled>
            This event was end
          </Button>
        </div>
      )
    } else {
      return data && data.data.data.ticket.register ? (
        //registed
        <div className='mt-[37px] flex flex-col items-center gap-[10px] self-stretch rounded-[20px] bg-[#51606E] pb-[26px] shadow-md sm:pb-5'>
          <div className='mt-3 flex flex-col self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#51606E] px-6 pb-[7px] pt-3 sm:px-5'>
            <Heading size='2xl' as='h1' className='!font-semibold !text-white-A700'>
              You're In
            </Heading>
          </div>

          {data &&
          data.data.data.ticket.register &&
          !isValidToFeeback(
            //nếu chưa tới thời gian feedback thì
            event.date_event,
            event.time_end
          ) ? (
            data.data.data.ticket.register.status_check_in ? ( //check tiếp người dùng đã check in chưa
              <Text size='lg' className='min-w-[423px] text-center !text-[20px] font-semibold hover:shadow-md sm:px-5 bg-[#9DADBC] text-white-A700'>
                You had check in this event
              </Text>
            ) : (
              <>
                <Text size='lg' as='p' className='mt-3 !text-white-A700 !text-[16px]'>
                  A confirmation email has been sent to your email.
                </Text>
                <Text size='lg' className='mt-5 !text-[20px] text-center rounded-md font-semibold hover:shadow-md sm:px-5 text-white-A700'>
                  {data.data.data.ticket.register.otp_check_in}
                </Text>
              </>
            )
          ) : (
            <></>
          )}

          {data &&
            data.data.data.ticket.register.status_register == StatusRegisterEvent.SUCCESS &&
            canCancelEvent(event.date_event, event.time_start) && (
              <>
                <Button
                  size='lg'
                  shape='round'
                  className='min-w-[200px] font-semibold hover:shadow-md sm:px-5 bg-red  text-white-A700'
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
                  onOk={handleCancelEvent(data?.data.data.ticket.register._id)}
                >
                  <p>Are you really want to cancel this event?</p>
                </Modal>
              </>
            )}

          {isValidToFeeback(event.date_event, event.time_end) && (
            <HandleFeedbackOfUser
              _id={event._id}
              isFeedback={data?.data.data.ticket.inforForm.isFeedback as boolean}
              isHasFormFeedBack={data?.data.data.ticket.inforForm.isHasFormFeedback ? true : false}
              statusCheckIn={data?.data.data.ticket.register.status_check_in as boolean}
            />
          )}
        </div>
      ) : (
        <></>
      )
    }
  }
}
const HandleRegisterEvent = ({ event }: Props) => {
  return <>{handleComponentEvent(event)}</>
}

export default HandleRegisterEvent
