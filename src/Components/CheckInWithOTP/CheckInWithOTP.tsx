import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'
import { useForm } from 'react-hook-form'
import { OTPCheckInSchema, otpCheckInSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'

type FormData = OTPCheckInSchema

const CheckInWithOTP = () => {
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(otpCheckInSchemaYup)
  })

  const OTPCheckInMutation = useMutation({
    mutationFn: (body: { otp_check_in: string }) =>
      eventApi.checkInEvent({ id, body })
  })

  const onSubmit = handleSubmit((data) => {
    OTPCheckInMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          toast.error(error.response?.data.errors?.otp_check_in)
        }
      }
    })
  })
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <EventOfForm render={'Check in form'} id={id as string} />

      <form
        className='flex flex-col justify-center items-center w-80 h-40'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col justify-center items-center mb-4'>
          <div className='text-slate-50 text-left mb-2'>OTP check in</div>
          <input
            type='text'
            className='text-black-900 w-[200px] h-[40px] outline-none border-2 hover:border-slate-400 rounded-lg bg-slate-50 pl-3 duration-500'
            {...register('otp_check_in')}
          />
          <span className='text-sm text-red mt-2'>
            {errors.otp_check_in?.message}
          </span>
        </div>
        <button className='w-[200px] h-[40px] text-slate-50 bg-[#0958d9] rounded-lg opacity-90 hover:opacity-100 duration-300'>
          Check in
        </button>
      </form>
    </div>
  )
}

export default CheckInWithOTP
