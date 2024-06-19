import EventOfForm from '../EventOfForm/EventOfForm'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

type Props = {
  id: string
}

const InfoEventRegisterOfUser = ({ id }: Props) => {
  const { data } = useQuery({
    queryKey: ['ahihi'],
    queryFn: () => eventApi.getTicket(id as string)
  })
  console.log(data)
  return (
    <div className='flex flex-col'>
      <EventOfForm id={id} render={'Information of your ticket'} />
      {data && (
        <div className='w-full'>
          <div className='flex justify-evenly items-center gap-6 mb-16'>
            {' '}
            <div className='h-[54px] w-52 text-lg bg-slate-100 text-slate-600 hover:bg-white-A700 hover:text-slate-900 text-center rounded-lg flex justify-center items-center duration-300'>
              <span>Date: {data.data.data.ticket.event[0].date_event} </span>
            </div>
            <div className='h-[54px] w-52 text-lg bg-slate-100 text-slate-600 hover:bg-white-A700 hover:text-slate-900 text-center rounded-lg flex justify-center items-center duration-300'>
              <span>
                Time start: {data.data.data.ticket.event[0].time_start}
              </span>
            </div>
            <div className='h-[54px] w-52 text-lg bg-slate-100 text-slate-600 hover:bg-white-A700 hover:text-slate-900 text-center rounded-lg flex justify-center items-center duration-300'>
              <span>Time end: {data.data.data.ticket.event[0].time_end}</span>
            </div>
          </div>
          <div className='flex justify-evenly items-center gap-6'>
            <div className='h-[54px] w-52 text-lg bg-slate-100 text-slate-600 hover:bg-white-A700 hover:text-slate-900 text-center rounded-lg flex justify-center items-center duration-300'>
              <span>Location: {data.data.data.ticket.event[0].location}</span>
            </div>
            <div className='h-[54px] w-52 text-lg bg-slate-100 text-slate-600 hover:bg-white-A700 hover:text-slate-900 text-center rounded-lg flex justify-center items-center duration-300'>
              Code Checkin: {data.data.data.ticket.otp_check_in}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoEventRegisterOfUser
