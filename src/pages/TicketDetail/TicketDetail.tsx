import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StatusRegisterEvent } from 'src/@types/utils.type'
import eventApi from 'src/apis/event.api'
import { Button, Heading, Text } from 'src/Components'
import EventDetail from 'src/Components/EventDetail/EventDetail'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

const TicketDetail = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { isFetching, data } = useQuery({
    queryKey: ['ticket-detail'],
    queryFn: () => eventApi.getTicket(id as string)
  })

  console.log(
    data?.data.data.ticket.status_register,
    StatusRegisterEvent.SUCCESS
  )

  const handleCancelEventMutation = useMutation({
    mutationFn: (id: string) => eventApi.cancelEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ticket-detail'],
        exact: true
      }),
        toast.success('Cancel event successfully')
    }
  })

  const handleCancelEvent = () => {
    handleCancelEventMutation.mutate(id as string)
  }

  return (
    <div className='flex w-full flex-col items-center gap-[61px] bg-gradient_vistor'>
      <Header className='' />
      {isFetching && (
        <>
          <Skeleton />
        </>
      )}
      {data?.data.data.ticket && (
        <EventDetail
          event={data.data.data.ticket.event}
          renderProps={
            <>
              <div className='mt-[37px] flex flex-col items-center gap-[21px] self-stretch rounded-[20px] bg-pink-normail pb-[26px] shadow-md sm:pb-5'>
                <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
                  <Heading size='s' as='p' className='!font-semibold'>
                    {data.data.data.ticket.status_register ==
                    StatusRegisterEvent.SUCCESS
                      ? 'You are in this event now'
                      : 'You did cancel this event'}
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
                  {data.data.data.ticket.otp_check_in}
                </Button>

                {data.data.data.ticket.status_register ==
                  StatusRegisterEvent.SUCCESS && (
                  <Button
                    size='lg'
                    shape='round'
                    className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-red  text-white-A700'
                    onClick={handleCancelEvent}
                  >
                    Cancel event
                  </Button>
                )}
              </div>
            </>
          }
        />
      )}
      <Footer className='' />
    </div>
  )
}

export default TicketDetail
