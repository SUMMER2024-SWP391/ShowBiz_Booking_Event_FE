import { useMutation, useQuery } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { useEffect, useState } from 'react'
import { ProfileUpdate } from 'src/@types/users.type'
import { toast } from 'react-toastify'

export type FormUpdateUser = ProfileUpdate

const initForm: FormUpdateUser = {
  email: '',
  user_name: '',
  phone_number: '',
  date_of_birth: '2020-12-01'
}

const UpdateProfile = () => {
  const [form, setForm] = useState<FormUpdateUser>(initForm)
  const getProfile = useQuery({
    queryKey: ['profile-update'],
    queryFn: () => authAPI.getProfileToUpdate()
  })
  console.log(getProfile.data?.data.data.user.date_of_birth.split('T')[0])
  useEffect(() => {
    if (getProfile.data) {
      setForm(getProfile.data.data.data.user)
    }
  }, [getProfile.data])

  const updateMutation = useMutation({
    mutationFn: (body: FormUpdateUser) => authAPI.updateProfile(body)
  })

  const handleChange =
    (name: keyof FormUpdateUser) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [name]: event.target.value }))
      if (updateMutation.data || updateMutation.error) {
        updateMutation.reset() //ko nhận và ko return về gì cả
      }
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateMutation.mutate(form, {
      onSuccess(data) {
        console.log(data)
        toast.success('Update success')
      },
      onError(error) {
        console.log(error)
      }
    })
  }

  return (
    <form className='grid grid-cols-2 gap-8' noValidate onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <label className='mb-2 text-white-A700'>User name</label>
        <input
          type='text'
          className='w-[300px] h-[45px] bg-white-A700 text-black-900 pl-2 rounded-lg outline-none'
          value={form.user_name}
          onChange={handleChange('user_name')}
        />
      </div>
      <div className='flex flex-col'>
        <label className='mb-2 text-white-A700'>Birthdate</label>
        <input
          type='date'
          className='w-[300px] h-[45px] bg-white-A700 text-black-900 pl-2 rounded-lg outline-none'
          value={form.date_of_birth.split('T')[0]}
          onChange={handleChange('date_of_birth')}
        />
      </div>
      <button className='h-[45px] rounded-lg bg-[#1677FF] text-white-A700 hover:opacity-95'>
        Update profile
      </button>
    </form>
  )
}

export default UpdateProfile
