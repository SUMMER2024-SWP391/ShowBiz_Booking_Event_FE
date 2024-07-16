import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EventStatus } from 'src/@types/enum'
import { Event } from 'src/@types/event.type'
import eventApi from 'src/apis/event.api'

interface Props {
  event: Event
  status: EventStatus | string
}

const TableListAllEvent = ({ event, status }: Props) => {
  const queryClient = useQueryClient()
  const mutationEventStatus = useMutation({
    mutationFn: (status: EventStatus) =>
      eventApi.handleStatusEventAdmin(event._id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['event-list-all', status],
        exact: true
      })
    }
  })

  const handleEvent = (status: EventStatus) => () => {
    mutationEventStatus.mutate(status)
    toast.success(`${status} event success`)
  }

  return (
    <tr>
      <td>{event.name}</td>
      <td>{event.event_operator.user_name}</td>
      <td>{event.capacity}</td>
      <td>{event.ticket_price}</td>
      <td>{event.location}</td>
      <td>{event.status}</td>
      {EventStatus.PENDING === event.status && (
        <td>
          <button className='btn' onClick={handleEvent(EventStatus.APPROVED)}>
            Approved
          </button>
        </td>
      )}
      <td>
        <Link to={`/events/${event._id}`} className='btn'>
          Detail
        </Link>
      </td>
      {EventStatus.PENDING === event.status && (
        <td>
          <button className='btn' onClick={handleEvent(EventStatus.REJECTED)}>
            Reject
          </button>
        </td>
      )}{' '}
    </tr>
  )
}

export default TableListAllEvent
