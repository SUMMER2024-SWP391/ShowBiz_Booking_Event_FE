import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UserRole } from 'src/@types/enum'
import { UserList } from 'src/@types/users.type'
import { adminApi } from 'src/apis/admin.api'

interface Props {
  user: UserList
  role: UserRole | string
}
const AdminUserList = ({ user, role }: Props) => {
  const queryClient = useQueryClient()
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-list', role],
        exact: true
      })
      toast.success('Delete user success')
    }
  })

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(user._id)
  }

  return (
    <tr>
      <td>{user.user_name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.status}</td>
      <td>
        <button className='btn' onClick={handleDeleteUser}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
            />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default AdminUserList
