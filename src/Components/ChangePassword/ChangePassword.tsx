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
    <div className='flex justify-center items-center'>
      <form className='flex flex-col' onSubmit={onSubmit} noValidate>
        <InputVerTwo
          renderProps={<div className='mb-2'>Old password</div>}
          classNameInput='input border-slate-400 w-[300px]'
          register={register}
          type='password'
          name='old_password'
          errorMessage={errors.old_password?.message}
        />
        <InputVerTwo
          renderProps={<div className='mb-2'>New password</div>}
          classNameInput='input border-slate-400 w-[300px]'
          type='password'
          register={register}
          name='password'
          errorMessage={errors.password?.message}
        />
        <InputVerTwo
          renderProps={<div className='mb-2'>Confirm new password</div>}
          classNameInput='input border-slate-400 w-[300px]'
          type='password'
          register={register}
          name='confirm_password'
          errorMessage={errors.confirm_password?.message}
        />
        <button className='btn mt-1'>Change password</button>
      </form>
    </div>
  )
}

export default ChangePassword
