import { useQuery } from '@tanstack/react-query'
import AdminUserList from '../AdminUserList/AdminUserList'
import { adminApi } from 'src/apis/admin.api'
import { Skeleton } from 'antd'

const TableUser = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['user-list'],
    queryFn: () => adminApi.getUserList()
  })

  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!isFetching &&
              data?.data.data.users.map((user) => (
                <AdminUserList key={user._id} user={user} />
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

export default TableUser
