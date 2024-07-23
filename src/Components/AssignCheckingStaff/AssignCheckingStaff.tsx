import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { useForm } from 'react-hook-form'
import {
  AddStaffCheckingSchema,
  addStaffCheckingSchemaYup
} from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { Heading } from '../Heading/Heading'
import { Modal, Skeleton } from 'antd'
import { Button } from '../Button/Button'
import { useState } from 'react'

type FormData = AddStaffCheckingSchema

const AssignCheckingStaff = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data, isFetching } = useQuery({
    queryKey: ['checking-staff-list'],
    queryFn: () => eventApi.getListCheckingStaff(id as string)
  })

  const addStaffMutation = useMutation({
    mutationFn: (body: { email: string; event_id: string }) =>
      eventApi.addCheckingStaff(body)
  })

  const deleteCheckingStaff = useMutation({
    mutationFn: ({
      event_id,
      user_id
    }: {
      event_id: string
      user_id: string
    }) => eventApi.unassignCheckingStaff(event_id, user_id)
  })

  const {
    handleSubmit,
    reset,
    setError,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(addStaffCheckingSchemaYup)
  })

  const onSubmit = handleSubmit((data) => {
    addStaffMutation.mutate(
      { ...data, event_id: String(id) },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          reset()
          queryClient.invalidateQueries({ queryKey: ['checking-staff-list'] })
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
            if (error.response?.data.errors?.email) {
              setError('email', {
                message: error.response.data.errors.email,
                type: 'server'
              })
            }
          }
        }
      }
    )
  })

  const handleDeleteCheckingStaff =
    (event_id: string, user_id: string) => () => {
      deleteCheckingStaff.mutate(
        { event_id, user_id },
        {
          onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: ['checking-staff-list'] })
          }
        }
      )
    }
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='mt-10 m-auto flex flex-col gap-3 justify-center items-center'>
      <Heading className=''>List Staff</Heading>
      <div className='w-full flex flex-row justify-start items-center'>
        <Button
          className='bg-pink-normail rounded-lg !text-white-A700 font-bold'
          size='lg'
          onClick={() => setOpen(true)}
        >
          Add Staff
        </Button>
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='flex justify-evenly items-center gap-3'>
          {data &&
            data.data.data.result.length !== 0 &&
            data.data.data.result.map((_) => (
              <div className='mt-5 text-black_light flex flex-col container-xs '>
                <div className='overflow-x-auto '>
                  <table className='table w-full'>
                    <thead>
                      <tr className='text-black_dark text-center'>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th></th>
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
                        data?.data.data.result.map((user) => (
                          <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.user_name}</td>
                            <td>
                              <button
                                onClick={handleDeleteCheckingStaff(
                                  id as string,
                                  user._id
                                )}
                                className='bg-red text-white-A700 p-2 rounded-md'
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              // <div
              //   key={user._id}
              //   className='bg-white-A700 border border-solid rounded-xl h-[40px] w-[300px]  text-black-900 text-center flex justify-center items-center'
              // >
              //   {user.email}
              //   <div className='flex  justify-end items-center'>

              //   </div>
              // </div>
            ))}
        </div>

        <Modal
          centered
          footer
          onCancel={() => setOpen(false)}
          open={open}
          width={'300px'}
        >
          <form
            className='flex flex-col justify-center items-center'
            onSubmit={onSubmit}
          >
            <div className='flex flex-col mb-4'>
              <div className=' text-sm mb-2 mt-3 text-center'>
                Add Email Staff
              </div>
              <input
                type='text'
                className='text-black-900 w-[200px] h-[40px] outline-none border-2 hover:border-slate-400 rounded-lg bg-slate-50 pl-3 duration-500'
                {...register('email')}
              />
              <span className='text-red mt-1 text-sm'>
                {errors.email?.message}
              </span>
            </div>
            <button className='w-[200px] h-[40px] text-slate-50 bg-[#0958d9] rounded-lg opacity-90 hover:opacity-100 duration-300'>
              Add
            </button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default AssignCheckingStaff
