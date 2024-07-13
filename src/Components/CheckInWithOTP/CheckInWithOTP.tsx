import { useParams } from 'react-router-dom'
import EventOfForm from '../EventOfForm/EventOfForm'
import { useForm } from 'react-hook-form'
import { OTPCheckInSchema, otpCheckInSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import Header from '../HeaderHomePage/HeaderHomePage'
import Footer from '../Footer/Footer'
import { Skeleton } from 'antd'
import EventDetail from '../EventDetail/EventDetail'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import InputVerTwo from '../InputVerTwo/InputVerTwo'

type FormData = OTPCheckInSchema

const CheckInWithOTP = () => {
  const { id } = useParams()
  // const { isFetching, data } = useQuery({
  //   queryKey: ['event-detail'],
  //   queryFn: () => eventApi.getEventById(id as string)
  // })
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
    <div className='flex  flex-col items-center '>
      <div className=' flex flex-col items-center w-[300px] self-stretch rounded-[15px] bg-white shadow-md sm:pb-5'>
        {/* <div className='flex self-stretch rounded-tl-[17px] rounded-tr-[17px] bg-[#E67A5B] px-6 pb-[7px] pt-3 sm:px-5'>
          <Heading size='s' as='p' className='!font-semibold'>
            Welcome this event
          </Heading>
        </div> */}
        <Text size='xl' as='p' className=' self-center mt-10 !text-black-900 '>
          Input code of visitor to checkin
        </Text>
        <InputVerTwo
          classNameInput='mt-10 h-[50px] outline-none  rounded-lg text-white'
          className='w-full flex flex-col justify-center items-center !text-white-A700'
          register={register}
          name='otp_check_in'
          errorMessage={errors.otp_check_in?.message}
        />
        <Button
          size='lg'
          shape='round'
          className='min-w-[100px] font-semibold hover:shadow-md sm:px-5 bg-[#E67A5B] text-white-A700'
          onClick={onSubmit}
        >
          Submit OTP
        </Button>
      </div>
    </div>
  )
}

export default CheckInWithOTP
