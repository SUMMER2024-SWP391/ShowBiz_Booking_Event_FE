import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

const InfoEventRegisterOfUser = () => {
  let { id } = useParams()
  const { data } = useQuery({
    queryKey: ['ahihi'],
    queryFn: () => eventApi.getTicket(id as string)
  })

  console.log(data)
  return (
    <div className='flex flex-col'>
      <EventOfForm id={id as string} render={'Information of your ticket'} />
      <div className=''></div>
    </div>
  )
}

export default InfoEventRegisterOfUser
