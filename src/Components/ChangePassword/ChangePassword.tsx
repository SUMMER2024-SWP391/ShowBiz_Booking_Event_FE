import { useForm } from 'react-hook-form'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import { useMutation } from '@tanstack/react-query'
import authAPI, { ChangePasswordBody } from 'src/apis/auth.api'
import { ChangePasswordSchema, ChangePasswordSchemaYub } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import {
  isAxiosUnauthorized,
  isAxiosUnprocessableEntityError
} from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import Header from '../HeaderHomePage/HeaderHomePage'
import { Heading } from '../Heading/Heading'
import Footer from '../Footer/Footer'

type FormData = ChangePasswordSchema

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordSchemaYub)
  })

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordBody) => authAPI.changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Change password success')
      },
      onError: (error) => {
        if (isAxiosUnauthorized<ErrorResponse<FormData>>(error)) {
          const message = error.response?.data.message
          console.log(message)
          setError('old_password', {
            message: message,
            type: 'server'
          })
        }

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
      <div className='w-full h-auto'>
        <Header />
        <div className='container-xs  flex flex-col '>
          <div className='mt-10 flex flex-row justify-between items-center'>
            <Heading size='2xl' as='h1'>
              My Profile
            </Heading>
          </div>

          {/* UserName */}
          <div className='mt-10 container-xs'>
            <form onSubmit={onSubmit} noValidate>
              <div className='flex flex-col items-center'>
                <Heading size='xl' as='h2' className='mb-2'>
                  Old Password
                </Heading>
                <InputVerTwo
                  classNameInput='w-[300px] h-[45px] border border-solid text-black-900 pl-2 rounded-lg outline-none'
                  register={register}
                  type='password'
                  name='old_password'
                  errorMessage={errors.old_password?.message}
                />
                <Heading size='xl' as='h2' className='mb-2'>
                  New Password
                </Heading>
                <InputVerTwo
                  classNameInput='w-[300px] h-[45px] border border-solid text-black-900 pl-2 rounded-lg outline-none'
                  register={register}
                  type='password'
                  name='old_password'
                  errorMessage={errors.old_password?.message}
                />
                <Heading size='xl' as='h2' className='mb-2'>
                  Confirm new password
                </Heading>
                <InputVerTwo
                  classNameInput='w-[300px] h-[45px] border border-solid text-black-900 pl-2 rounded-lg outline-none'
                  register={register}
                  type='password'
                  name='old_password'
                  errorMessage={errors.old_password?.message}
                />
                <button
                  type='submit'
                  className='mt-10 h-[45px] rounded-lg bg-pink-normail p-2 text-white-A700 hover:opacity-95'
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ChangePassword
