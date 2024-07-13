import { useQuery } from '@tanstack/react-query'
import { Button, Skeleton } from 'antd'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heading } from 'src/Components'
import CheckInWithOTP from 'src/Components/CheckInWithOTP/CheckInWithOTP'
import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import ModalPopup from 'src/Components/ModalPopup/ModalPopup'
import authAPI from 'src/apis/auth.api'
import eventApi from 'src/apis/event.api'

const PageOfStaff = () => {
  const { id } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['list-user-register-event'],
    queryFn: () => eventApi.getListUserRegisterEvent(id as string)
  })
  // console.log(
  //   'hi',
  //   data?.data.data.dataUser.listUser.map((user) => user.status_checkin)
  // )
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <Heading as='h1' size='2xl' className='mt-10 !text-white-A700'>
          Checking Guest
        </Heading>
        <div className=''>
          <button type='button' onClick={() => setOpen(true)}>
            CheckIn
          </button>
        </div>
        <ModalPopup type='' open={open} onClose={() => setOpen(false)}>
          <CheckInWithOTP />
        </ModalPopup>
        <div className='mt-10 text-white-A700 flex flex-col'>
          <div className='overflow-x-auto'>
            <table className='table w-[1000px]'>
              <thead>
                <tr className=''>
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
    </>
  )
}

export default PageOfStaff
