import { useQuery } from '@tanstack/react-query'
import { Modal, Skeleton } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'src/Components'
import CheckInWithOTP from 'src/Components/CheckInWithOTP/CheckInWithOTP'
import eventApi from 'src/apis/event.api'

const StaffPage = () => {
  const { id } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['list-user-register-event'],
    queryFn: () => eventApi.getListUserRegisterEvent(id as string)
  })
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='w-full flex flex-col items-start'>
        <div className='flex flex-row'>
          <div className='mt-10 items-start'>
            <Button
              className='bg-pink-normail rounded-lg !text-white-A700 font-bold'
              size='lg'
              onClick={() => setOpen(true)}
            >
              Checking Guest
            </Button>
          </div>
        </div>

        <div className='mt-5 text-black_light flex flex-col container-xs '>
          <div className='overflow-x-auto '>
            <table className='table w-full'>
              <thead>
                <tr className='text-black_dark text-center'>
                  <th>Id</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isFetching && (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}

                {!isFetching &&
                  data?.data.data.listUser.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.email}</td>
                      <td>{user.user_name}</td>
                      <td>
                        {user.statusCheckIn ? 'check in' : 'not check in'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        width='300px'
        footer
      >
        <CheckInWithOTP />
      </Modal>
    </>
  )
}

export default StaffPage
