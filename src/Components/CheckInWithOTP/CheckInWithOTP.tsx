import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { OTPCheckInSchema, otpCheckInSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import InputVerTwo from '../InputVerTwo/InputVerTwo'

type FormData = OTPCheckInSchema

const CheckInWithOTP = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
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
        console.log(data)
        toast.success(data.data.message)
        queryClient.invalidateQueries({
          queryKey: ['list-user-register-event']
        })
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          toast.error(error.response?.data.errors?.otp_check_in)
        }
      }
    })
  })
  return (
    <div className='flex bg-white-A700 flex-col m-5 items-center justify-center '>
      <Text size='xl' as='p' className=' self-center mt-2 !text-black-900 '>
        Input code
      </Text>
      <InputVerTwo
        classNameInput='mt-5 h-[40px] outline-none border border-solid border-black_light rounded-lg px-1 '
        className='w-full flex flex-col justify-center items-center '
        register={register}
        name='otp_check_in'
        errorMessage={errors.otp_check_in?.message}
      />
      <Button
        size='lg'
        shape='round'
        className='min-w-[100px] mt-3 font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  )
}

export default CheckInWithOTP
