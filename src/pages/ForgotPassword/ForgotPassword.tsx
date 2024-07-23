import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
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
      <Header />
      <div className='container flex justify-center h-full'>
        <form
          className='flex justify-center items-center  h-[300px] w-[300px] border-cyan-900'
          onSubmit={onSubmit}
        >
          <InputVerTwo
            renderProps={<div className='pb-2'>Email</div>}
            type='text'
            name='email'
            register={register}
            classNameInput='mt-2 rounded-[10px] border border-solid
                   text-black-900 sm:pr-5 font-euclid p-2 outline-none
                    bg-white-A700 w-full'
            errorMessage={errors.email?.message}
          />
          <button className='mx-2 btn mt-2'>Forgot password</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default ForgotPassword
