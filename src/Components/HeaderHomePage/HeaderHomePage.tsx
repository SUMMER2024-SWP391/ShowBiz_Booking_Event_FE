import { Link } from 'react-router-dom'
import LOGO from '../../assets/img/Logo EventBooking (1).png'

const HeaderHomePage = () => {
  return (
    <header className='text-nav_color container capitalize'>
      <div className='w-full flex justify-between'>
        <div className='w-28 h-28 cursor-pointer hover:text-lightgray'>
          <img src={LOGO} alt='logo' className='w-full h-full' />
        </div>
        <div className='flex justify-evenly items-center font-euclid font-bold'>
          <div className='mr-8 hover:text-lightgray cursor-pointer'>Home</div>
          <div className='mr-8 hover:text-lightgray cursor-pointer'>
            My Event
          </div>
          <div className='mr-8 hover:text-lightgray cursor-pointer'>
            All Event
          </div>
          <div className='mr-8 hover:text-lightgray cursor-pointer'>
            Calendar
          </div>
        </div>
        <div className='flex justify-evenly items-center'>
          <div className='mr-6 cursor-pointer hover:text-lightgray'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </div>
          <div className='mr-6 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 hover:text-lightgray'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
              />
            </svg>
          </div>
          <div className='mr-6'>
            <Link to='' className='font-bold hover:text-lightgray'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderHomePage
