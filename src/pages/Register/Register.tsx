import { UserOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import authAPI from 'src/apis/auth.api'
import { Button, Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import InputVerTwo from 'src/Components/InputVerTwo/InputVerTwo'
import { AppContext } from 'src/context/app.context'
import { googleAuthUrl } from 'src/utils/getGoogleAuthUrl'
import { RegisterSchema, registerSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = RegisterSchema

const Register = () => {
  const navigate = useNavigate()
  const { setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchemaYup)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      authAPI.register(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        navigate('/login')
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FormData, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.errors

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message:
                  formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='flex w-full flex-col gap-[175px]  sm:gap-[87px]'>
        <div className='flex flex-col items-center gap-[79px] md:gap-[72px] sm:gao-12'>
          <Header _id={setProfile.name} />
        </div>
        <div className='container-xs pl-[313px] pr-[2p96px] flex justify-center md:p-5 md:px-5'>
          <div className='flex flex-col w-[55%] h-[100%] items-center gap-[21px] rounded-[15px] border border-solid border-black-900 shadow-2xl bg-gray-900_04 pb-5 pt-[26px] sm:pt-5'>
            <div className='ml-[46px] flex flex-col item-start gap-[18px] self-start'>
              <Button
                color='pink_normail'
                size='4xl'
                shape='circle'
                className='w-[68px] !rounded-[34px]'
              >
                <UserOutlined className='' />
              </Button>
              <div className='flex flex-col items-start gap-[13px]'>
                <Heading
                  size='2xl'
                  as='h1'
                  className='!font-bold '
                >
                  Welcome to EventBok
                </Heading>
                <Heading size='xl' as='h2' className='!text-blue_gray-900'>
                  Please sign in or sign up below
                </Heading>
              </div>
            </div>
            <form
              className=' ml-[46px] mr-[46px] flex w-[95%] flex-col gap-[15px]  md:p-5'
              noValidate
              onSubmit={onSubmit}
            >
              <div className='flex flex-col items-start gap-0 w-[90%]'>
                <Heading
                  size='lg'
                  as='h3'
                  className='!font-bold '
                >
                  Email
                </Heading>
                {/* <span className='text-rose-300'></span> */}
                <InputVerTwo
                  type='text'
                  name='email'
                  className='w-full'
                  classNameInput='mt-2 rounded-[10px] border text-black-900 hover:border-black_dark border-solid bg-white-A700  w-full font-euclid p-2 outline-none'
                  register={register}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col items-start gap-0'>
                  <Heading
                    size='lg'
                    as='h3'
                    className='!font-bold '
                  >
                    Your name
                  </Heading>
                  <InputVerTwo
                    type='text'
                    name='user_name'
                    classNameInput='mt-2 rounded-[10px] border text-black-900 hover:border-black_dark border-solid bg-white-A700  w-full font-euclid p-2 outline-none'
                    register={register}
                    errorMessage={errors.user_name?.message}
                  />
                </div>
                <div className='flex flex-col items-start gap-0'>
                  <Heading
                    size='lg'
                    as='h3'
                    className='!font-bold '
                  >
                    Student code
                  </Heading>
                  <InputVerTwo
                    type='text'
                    name='mssv'
                    classNameInput='mt-2 rounded-[10px] border text-black-900 hover:border-black_dark border-solid bg-white-A700  w-full font-euclid p-2 outline-none'
                    register={register}
                    errorMessage={errors.mssv?.message}
                  />
                </div>
                <div className='flex flex-col items-start gap-0'>
                  <Heading
                    size='lg'
                    as='h3'
                    className='!font-bold '
                  >
                    Password
                  </Heading>
                  <InputVerTwo
                    type='password'
                    name='password'
                    classNameInput='mt-2 rounded-[10px] border text-black-900 hover:border-black_dark border-solid bg-white-A700  w-full font-euclid p-2 outline-none'
                    register={register}
                    errorMessage={errors.password?.message}
                  />
                </div>
                <div className='flex flex-col items-start gap-0'>
                  <Heading
                    size='lg'
                    as='h3'
                    className='!font-bold '
                  >
                    Confirm Password
                  </Heading>
                  <InputVerTwo
                    type='password'
                    name='confirm_password'
                    classNameInput='mt-2 rounded-[10px] border text-black-900 hover:border-black_dark border-solid bg-white-A700  w-full font-euclid p-2 outline-none'
                    register={register}
                    errorMessage={errors.confirm_password?.message}
                  />
                </div>
              </div>
              <Button
                size='xl'
                color='white_A700'
                className='mt-[10px] w-full rounded-[10px] border border-solid border-black_dark font-medium sm:px-5 hover:opacity-95'
              >
                Register your account
              </Button>
              <div className='h-px w-full self-stretch bg-black_light ' />
              <div className='flex flex-row justify-between'>
                <Link
                  to={googleAuthUrl}
                  className='w-[45%] mt-[10px] p-2  rounded-[10px] border border-solid border-black_dark font-medium sm:px-5 text-center hover:opacity-80'
                >
                  Sign in with FPT EDU Email
                </Link>
                <Link
                  to={'/login'}
                  className='mt-[10px] p-2 w-[45%] rounded-[10px] border border-solid border-black_dark font-medium sm:px-5 text-center hover:bg-white flex justify-center items-center hover:opacity-80'
                >
                  Login with account
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Register
