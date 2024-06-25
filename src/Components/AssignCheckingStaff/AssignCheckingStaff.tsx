import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'
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

type FormData = AddStaffCheckingSchema

const AssignCheckingStaff = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data } = useQuery({
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

  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <EventOfForm id={id as string} render='List Staff' />
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='flex justify-evenly items-center gap-3'>
          {data &&
            data.data.data.result.length !== 0 &&
            data.data.data.result.map((user) => (
              <div
                key={user._id}
                className='bg-white-A700 h-[40px] w-[300px] rounded-lg text-black-900 text-center flex justify-center items-center'
              >
                {user.email}
                <div className='flex  justify-end items-center'>
                  <button
                    onClick={handleDeleteCheckingStaff(id as string, user._id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='ml-4 size-5 hover:stroke-red'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <div className='flex flex-col mb-4'>
            <div className='text-slate-100 text-sm mb-2'>New Staff</div>
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
            Add checking staff
          </button>
        </form>
      </div>
    </div>
  )
}

export default AssignCheckingStaff
