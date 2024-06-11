import { useForm } from 'react-hook-form'
import InputVerTwo from '../InputVerTwo/InputVerTwo'
import { UserProfile } from '../ProfileComponent/ProfileComponent'
import {
  CreateEventOperatorSchema,
  CreateEventOperatorSchemaYup
} from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { useState } from 'react'

export type FormUpdateUser = CreateEventOperatorSchema

const UpdateProfile = ({ user }: UserProfile) => {
  const date = user.date_of_birth?.split('T')[0]
  const [form, setForm] = useState<FormUpdateUser>(user as FormUpdateUser)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormUpdateUser>({
    resolver: yupResolver(CreateEventOperatorSchemaYup)
  })

  const updateMutation = useMutation({
    mutationFn: (body: FormUpdateUser) => authAPI.updateProfile(body)
  })

  return (
    <form className='grid grid-cols-2 gap-8'>
      <InputVerTwo
        type='text'
        defaultValue={user.user_name}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Name</div>}
        register={register}
      />
      <InputVerTwo
        type='text'
        defaultValue={user.email}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Email</div>}
        register={register}
      />
      <InputVerTwo
        type='text'
        className='basis-2'
        defaultValue={user.phone_number}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Phone number</div>}
        register={register}
      />
      <InputVerTwo
        type='date'
        defaultValue={date as string}
        classNameInput='btn'
        renderProps={<div className='mb-2'>Birthdate</div>}
        register={register}
      />
      <button className='btn'>Update profile</button>
    </form>
  )
}

export default UpdateProfile
