import { UserOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { Button, Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'

import { LoginSchema, LoginSchemaYup } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputVerTwo from 'src/Components/InputVerTwo/InputVerTwo'
import { useMutation } from '@tanstack/react-query'
import { ErrorResponse } from 'src/@types/utils.type'
import {
  isAxiosUnauthorized,
  isAxiosUnprocessableEntityError
} from 'src/utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from 'src/context/app.context'
import authAPI from 'src/apis/auth.api'
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { auth } from '../../../firebase'
import { googleAuthUrl } from 'src/utils/getGoogleAuthUrl'
import { UserRole } from 'src/@types/enum'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import { clearEventIdFromLS, setIsStaffToLS } from 'src/utils/auth'
import { toast } from 'react-toastify'

export type FormData = LoginSchema

const Login = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile, setIsStaff, eventId, setEventId } =
    useContext(AppContext)
  const {
    register,
    handleSubmit,
    // setError,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchemaYup)
  })

  const [loginError, setLoginError] = useState<string>('')

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authAPI.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        if (data.data.data.user.role == UserRole.Admin) {
          navigate('/admin/list-all-event')
        } else if (data.data.data.user.role == UserRole.EventOperator) {
          navigate('/event-operator')
        } else if (data.data.data.listEvent.length != 0) {
          setIsStaff(true)
          setIsStaffToLS(true)
          if (eventId) {
            setEventId('')
            clearEventIdFromLS()
            navigate(`/events/${eventId}`)
          } else {
            navigate('/event-list/users')
          }
        } else {
          if (eventId) {
            setEventId('')
            clearEventIdFromLS()
            navigate(`/events/${eventId}`)
          } else {
            navigate('/event-list/users')
          }
        }
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          // trigger()
          const errors = error.response?.data.errors
          setLoginError(errors?.email as string)
        }
      }
    })
  })
  return (
    <div className='flex w-full flex-col item-center bg-gradient_vistor'>
      <div className='flex flex-col items-center  '>
        <Header _id={setProfile.name} />
      </div>
      <div className='mt-10 container-xs flex justify-center md:p-5 md:px-5'>
        <div className='flex flex-col w-[500px] items-start rounded-[15px] border border-solid border-white-A700 pb-5 sm:pt-5'>
          <div className='mx-[30px] w-[430px]'>
            <div className='flex flex-col items-start'>
              <Button
                color='pink_normail'
                size='4xl'
                shape='circle'
                className='w-[68px] !rounded-[34px]'
              >
                <UserOutlined className='!text-white-A700' />
              </Button>
              <div className=' flex flex-col items-start mt-5'>
                <Heading
                  size='2xl'
                  as='h1'
                  className='!font-bold !text-white-A700'
                >
                  Welcome to EventBok
                </Heading>
                <Heading size='xl' as='h2' className='mt-5'>
                  Please sign in or sign up below
                </Heading>
              </div>
            </div>
            <form
              className=' mt-5 w-full flex items-start flex-col '
              noValidate
              onSubmit={onSubmit}
            >
              <div className='w-full flex flex-col  '>
                <Heading
                  size='lg'
                  as='h3'
                  className='!font-bold !text-white-A700'
                >
                  Email
                </Heading>
                {/* <span className='text-rose-300'></span> */}
                <InputVerTwo
                  type='text'
                  name='email'
                  classNameInput='mt-2 rounded-[10px] border text-black-900  border-solid bg-white-A700  w-full font-euclid p-2 outline-none
                    '
                  register={register}
                  errorMessage={errors.email?.message}
                />
                {/* <Input
                  color='white_A700'
                  type='email'
                  name='email'
                  placeholder={`your@email.com`}
                  addonBefore=''
                  className='rounded-[10px] border border-solid border-white-A700 font-bold sm:pr-5 w-full '
                /> */}
              </div>
              <div className='flex flex-col w-full'>
                <Heading
                  size='lg'
                  as='h3'
                  className='!text-white-A700 !font-bold'
                >
                  Password
                </Heading>
                <InputVerTwo
                  type='password'
                  name='password'
                  classNameInput='mt-2 rounded-[10px] border border-solid
                   border-white-A700 text-black-900 sm:pr-5 font-euclid p-2 outline-none
                    bg-white-A700 w-full'
                  register={register}
                  errorMessage={errors.password?.message}
                />
                <span className=' text-red text-sm'>{loginError}</span>
              </div>
              <Link
                to={'/forgot-password'}
                className='text-white-A700 hover:text-black-900 hover:underline'
              >
                Forgot password. Click here to get new password
              </Link>
              <Button
                size='xl'
                color='white_A700'
                className='mt-[10px] w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5 hover:opacity-95'
              >
                Continue with Email
              </Button>
              <div className='my-3 h-px w-full self-stretch bg-white-A700' />
              {/* <Button
                onClick={onSignInWithGoogle}
                color='blue_gray_900'
                size='xl'
                className='min-w-[345px] p-5 h-[37px] gap-1.5 rounded-[10px] border border-solid
                 border-blue_gray-100_04 font-semibold sm:px-5 text-white-A700 text-center 
                 flex justify-center items-center hover:bg-white-A700 hover:text-black-900'
              >
                Sign in with FPT EDU Email
              </Button> */}
              <div className='grid grid-cols-2 gap-2'>
                <Link
                  to={googleAuthUrl}
                  className='mt-[10px] p-2 w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5 text-center hover:opacity-80 text-white-A700'
                >
                  Sign in with FPT EDU Email
                </Link>
                <Link
                  to={'/register'}
                  className='mt-[10px] p-2 w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5 text-center hover:bg-white flex justify-center items-center hover:opacity-80 text-white-A700'
                >
                  Register account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
