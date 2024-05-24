import { GoogleOutlined, UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { Button, Heading } from 'src/Components'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'

const Register = () => {
  return (
    <>
      <div className='flex w-full flex-col gap-[175px] bg-gray-900  sm:gap-[87px]'>
        <div className='flex flex-col items-center gap-[79px] md:gap-[72px] sm:gao-12'>
          <Header className='bg-gradient' />
        </div>
        <div className='container-xs pl-[313px] pr-[296px] md:p-5 md:px-5'>
          <div className='flex flex-col items-center gap-[21px] rounded-[20px] border border-solid border-white-A700 bg-gray-900_04 pb-5 pt-[26px] sm:pt-5'>
            <div className='ml-[46px] flex flex-col item-start gap-[18px] self-start'>
              <Button
                color='blue_gray_900'
                size='4xl'
                shape='circle'
                className='w-[68px] !rounded-[34px]'
              >
                <UserOutlined className='!text-gray-500_02' />
              </Button>
              <div className='flex flex-col items-start gap-[13px]'>
                <Heading size='2xl' as='h1' className='!font-bold'>
                  Welcome to EventBok
                </Heading>
                <Heading size='xl' as='h2' className='!text-blue_gray-100_02'>
                  Please sign in or sign up below
                </Heading>
              </div>
            </div>
            <div className=' ml-[46px] mr-[46px] flex w-[95%] flex-col gap-[15px]  md:p-5'>
              <div className='flex flex-col items-start gap-2'>
                <Heading size='lg' as='h3' className='!font-bold'>
                  Email
                </Heading>
                <Input
                  color='white_A700'
                  type='email'
                  name='email'
                  placeholder={`your@email.com`}
                  addonBefore=''
                  className='rounded-[10px] border border-solid border-white-A700 font-bold sm:pr-5 w-full '
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <Heading size='lg' as='h3' className='!font-bold'>
                  Password
                </Heading>
                <Input
                  color='white_A700'
                  type='password'
                  name='password'
                  placeholder={`Input your password`}
                  className='rounded-[10px] border border-solid border-white-A700 font-bold sm:pr-5 w-full '
                />
              </div>
              <Button
                size='xl'
                color='white_A700'
                className='mt-[10px] w-full rounded-[10px] border border-solid border-white-A700 font-medium sm:px-5'
              >
                Continue with Email
              </Button>
              <div className='h-px w-full self-stretch bg-white-A700' />
              <Button
                color='blue_gray_900'
                size='xl'
                leftIcon={<GoogleOutlined className='h-[14px] w-[14px]' />}
                className='min-w-[345px] gap-1.5 rounded-[10px] border border-solid border-blue_gray-100_04 font-semibold sm:px-5 text-white-A700'
              >
                Sign in with FPT EDU
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Register
