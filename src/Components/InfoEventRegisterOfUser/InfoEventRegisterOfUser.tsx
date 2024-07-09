import EventOfForm from '../EventOfForm/EventOfForm'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

type Props = {
  id: string
}

const InfoEventRegisterOfUser = ({ id }: Props) => {
  const { data } = useQuery({
    queryKey: ['ticket-detail'],
    queryFn: () => eventApi.getTicket(id as string)
  })
  return <div className='flex flex-col'></div>
}

export default InfoEventRegisterOfUser
