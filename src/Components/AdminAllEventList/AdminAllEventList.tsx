import { keepPreviousData, useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { Skeleton } from 'antd'
import TableListAllEvent from '../TableListAllEvent/TableListAllEvent'
import useQueryParams from 'src/hooks/useQueryParams'

const AdminTableEventList = () => {
  const { status = '' } = useQueryParams()
  const { data, isFetching } = useQuery({
    queryKey: ['event-list-all', status],
    queryFn: () => eventApi.getAllEventListAdmin(status),
    placeholderData: keepPreviousData
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
      {!isFetching && data?.data.data.events.length == 0 && (
        <div className='flex justify-center items-center mt-2'>
          <h1>There are not have event {status.toLowerCase()} </h1>
        </div>
      )}
    </div>
  )
}

export default AdminTableEventList
