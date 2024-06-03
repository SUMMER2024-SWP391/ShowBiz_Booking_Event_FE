import { useQuery } from '@tanstack/react-query'
import AdminEventList from '../AdminEventList/AdminEventList'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'

const TableEventList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['eventListPending'],
    queryFn: () => eventApi.getPendingEventListAdmin()
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
            data?.data.data.events.map((event) => (
              <AdminEventList key={event._id} event={event} />
            ))}
          {isFetching && (
            <div className='flex justify-start'>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableEventList
