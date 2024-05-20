import Footer from 'src/Components/Footer/Footer'
import HeaderHomePage from 'src/Components/HeaderHomePage/HeaderHomePage'

const Register = () => {
  return (
    <div className='bg-blue_night'>
      <HeaderHomePage />
      <div className='container flex items-center justify-center text-[#ffffff] font-euclid'>
        <div className='bg-black_night w-[435px] h-[510px] border rounded-[20px]'>
          <div className='pt-10 pl-16'>
            <div className='pb-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-10 h-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819'
                />
              </svg>
            </div>
            <div className='pb-6 font-bold text-xl'>Welcome to EventBook</div>
            <form>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold hover:text-gray'>
                    Email
                  </label>
                  <input
                    type='text'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px] border-2 border-blueDark focus:border-lightgray'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold hover:text-gray'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px] border-2 border-blueDark focus:border-lightgray'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold hover:text-gray'>
                    Confirm password
                  </label>
                  <input
                    type='password'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px] border-2 border-blueDark focus:border-lightgray'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <button className='h-10 w-80 bg-[#ffff] text-[#000000] rounded-[10px] hover:text-black_supper_light'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register
