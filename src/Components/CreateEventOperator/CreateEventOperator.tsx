import { useForm } from 'react-hook-form'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import { CreateEventOperatorSchema, CreateEventOperatorSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { adminApi } from 'src/apis/admin.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { toast } from 'react-toastify'

type FormData = CreateEventOperatorSchema

const CreateEventOperator = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(CreateEventOperatorSchemaYup)
  })

  const createEventOperatorMutation = useMutation({
    mutationFn: (body: FormData) => adminApi.createEventOperator(body)
  })

  const onSubmit = handleSubmit((data) => {
    createEventOperatorMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Create event operator success')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          console.log(error.response?.data.errors)
          const formError = error.response?.data.errors

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: String(formError[key as keyof FormData]), // Convert to string
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
      <form className='grid gap-4 grid-cols-2' onSubmit={onSubmit} noValidate>
        <InputVerTwo
          name='user_name'
          type='text'
          className='flex flex-col'
          renderProps={<label className='mb-2'>Event operator name</label>}
          classNameInput='input input-bordered w-full max-w-xs'
          register={register}
          errorMessage={errors.user_name?.message}
        />
        <InputVerTwo
          className='flex flex-col w-[270px]'
          type='text'
          name='email'
          renderProps={<label className='mb-2'>Email</label>}
          classNameInput='input input-bordered w-full max-w-xs'
          register={register}
          errorMessage={errors.email?.message}
        />
        <InputVerTwo
          className='flex flex-col'
          type='text'
          name='phone_number'
          renderProps={<label className='mb-2'>Phone number</label>}
          classNameInput='input input-bordered w-full max-w-xs'
          register={register}
          errorMessage={errors.phone_number?.message}
        />

        <button className='btn mt-8'>Create</button>
      </form>
    </div>
  )
}

export default CreateEventOperator
