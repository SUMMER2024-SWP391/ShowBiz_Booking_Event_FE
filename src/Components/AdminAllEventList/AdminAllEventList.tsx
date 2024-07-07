import { useQuery } from '@tanstack/react-query'
import AdminEventList from '../AdminEventList/AdminEventList'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'
import TableListAllEvent from '../TableListAllEvent/TableListAllEvent'

const AdminTableEventList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-all'],
    queryFn: () => eventApi.getAllEventListAdmin()
  })

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event operator name</th>
            <th>Capacity</th>
            <th>Ticket price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isFetching &&
            data?.data.data.events.length != 0 &&
            data?.data.data.events.map((event) => (
              <TableListAllEvent key={event._id} event={event} />
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
  )
}

export default AdminTableEventList
