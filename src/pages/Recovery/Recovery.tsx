import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import InputVerTwo from 'src/Components/InputVerTwo/InputVerTwo'
import authAPI, { ResetPassword } from 'src/apis/auth.api'
import { ResetPasswordSchema, ResetPasswordSchemaYub } from 'src/utils/rules'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { toast } from 'react-toastify'

type FormData = ResetPasswordSchema

const Recovery = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get('token')
  if (!token) {
    navigate('/forgot-password')
  }
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ResetPasswordSchemaYub)
  })

  const resetPasswordMuation = useMutation({
    mutationFn: (body: ResetPassword) => authAPI.resetPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = { ...data, forgot_password_token: token as string }
    resetPasswordMuation.mutate(body, {
      onSuccess: (data) => {
        toast.success('Reset password success')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.errors
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <>
      <Header />
      <div className='container flex justify-center h-full'>
        <form
          className='flex flex-col justify-center items-center  h-[300px] w-[300px] border-cyan-900'
          onSubmit={onSubmit}
        >
          <InputVerTwo
            renderProps={<div className='pb-2'>Password</div>}
            type='password'
            name='password'
            register={register}
            classNameInput='btn w-[300px] h-[30px]'
            errorMessage={errors.password?.message}
          />

          <InputVerTwo
            renderProps={<div className='pb-2'>Confirm password</div>}
            type='password'
            name='confirm_password'
            register={register}
            classNameInput='btn w-[300px] h-[30px]'
            errorMessage={errors.confirm_password?.message}
          />
          <button className='mx-2 btn mt-2'>Reset password</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Recovery
