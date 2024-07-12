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
  const { isFetching, data } = useQuery({
    queryKey: ['ticket-detail-fail'],
    queryFn: () => eventApi.getTicketDetailFailById(id as string)
  })

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
                  <Heading size='s' as='p' className='!font-semibold'></Heading>
                </div>
                <Text size='s' as='p' className='ml-6 self-start text-red'>
                  you were cancel event. This otp is not have effect
                </Text>
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
