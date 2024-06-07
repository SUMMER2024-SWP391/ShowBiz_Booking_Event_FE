import { useQuery } from '@tanstack/react-query'
import TableEventListOperator from '../TableEventListOperator/TableEventListOperator'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'

const EventListOperator = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-operator'],
    queryFn: () => eventApi.getEventListOperator()
  })
  return (
    <div>
      <div className='overflow-x-auto mt-4'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Member register</th>
              <th>Ticket price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.data.events.map((event) => (
              <TableEventListOperator event={event} key={event._id} />
            ))}
            {isFetching && (
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventListOperator
