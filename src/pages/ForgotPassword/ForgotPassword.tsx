import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import { Text } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import InputVerTwo from 'src/Components/InputVerTwo/InputVerTwo'
import authAPI from 'src/apis/auth.api'
import { ForgotPasswordSchema, ForgotPasswordSchemaYup } from 'src/utils/rules'
import { isAxiosError } from 'src/utils/utils'

type FormData = ForgotPasswordSchema

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(ForgotPasswordSchemaYup) })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.forgotPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Please check mail to reset password')
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          setError('email', {
            message: error?.response?.data?.message,
            type: 'server'
          })
        }
      }
    })
  })

  return (
    <>
      <div className=''>
        <Header />
        <div className='mt-10 container flex flex-col justify-center items-center h-full'>
          <div className='mb-5 '>
            <h1 className='block text-gray-700 text-lg font-bold mb-2'>
              Quên Mật Khẩu
            </h1>
            <p className='text-sm text-gray-600 mb-4'>
              Bạn đã quên mật khẩu của mình? Đừng lo lắng, chúng tôi sẽ giúp bạn
              khôi phục lại quyền truy cập.
            </p>
            <p className='text-sm text-gray-600 mb-4'>Bước 1: Nhập Email</p>
            <p className='text-sm text-gray-600'>
              Vui lòng nhập địa chỉ email đã đăng ký để chúng tôi có thể gửi cho
              bạn hướng dẫn khôi phục mật khẩu.
            </p>
          </div>
          <form
            className='w-full flex justify-center  border-cyan-900'
            onSubmit={onSubmit}
          >
            <InputVerTwo
              type='text'
              name='email'
              register={register}
              classNameInput='mt-2  rounded-[10px] border border-black-900
                   text-black-900 sm:pr-5 font-euclid p-2 
                    bg-white-A700 w-full'
              errorMessage={errors.email?.message}
            />
            <button className='mx-2 btn mt-2'>Forgot password</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ForgotPassword
