import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AdminUserList from '../AdminUserList/AdminUserList'
import { adminApi } from 'src/apis/admin.api'
import { Skeleton } from 'antd'
import { UserRole } from 'src/@types/enum'

interface Props {
  role: UserRole | string
}

const TableUser = ({ role }: Props) => {
  const { data, isFetching } = useQuery({
    queryKey: ['user-list', role],
    queryFn: () => adminApi.getUserList(role),
    placeholderData: keepPreviousData
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
                <AdminUserList key={user._id} user={user} role={role} />
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
