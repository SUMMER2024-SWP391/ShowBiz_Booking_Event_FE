import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProfileUpdate } from 'src/@types/users.type'
import { Heading, Text } from 'src/Components'
import ChangePassword from 'src/Components/ChangePassword/ChangePassword'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import ProfileComponent from 'src/Components/ProfileComponent/ProfileComponent'
import UpdateProfile from 'src/Components/UpdateProfile/UpdateProfile'
import authAPI from 'src/apis/auth.api'

export type FormUpdateUser = ProfileUpdate

const initForm: FormUpdateUser = {
  email: '',
  user_name: '',
  phone_number: '',
  date_of_birth: '2020-12-01'
}

const Profile = () => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => authAPI.getMe()
  })
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
    <div className='w-full'>
      <Header />
      <div className='container-xs flex flex-col '>
        <div className='mt-10 flex flex-row justify-between items-center'>
          <Heading size='2xl' as='h1'>
            My Profile
          </Heading>
        </div>

        {/* UserName */}
        <div className='mt-10 container-xs'>
          <form noValidate onSubmit={handleSubmit}>
            <div className='flex flex-col items-center'>
              <Heading size='xl' as='h2' className='mb-2'>
                Full Name
              </Heading>
              <input
                type='text'
                className='w-[300px] h-[45px] p-2 outline-none rounded-md border border-solid text-center'
                value={form.user_name}
                onChange={handleChange('user_name')}
              />
              <Heading size='xl' as='h2' className='mt-5 mb-2'>
                Email
              </Heading>
              <input
                type='text'
                className='w-[300px] h-[45px] p-2 outline-none rounded-md border border-solid text-center'
                value={form.email}
                onChange={handleChange('email')}
              />
              
              <button className='mt-10 h-[45px] rounded-lg bg-pink-normail p-2 text-white-A700 hover:opacity-95'>
                Update profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
