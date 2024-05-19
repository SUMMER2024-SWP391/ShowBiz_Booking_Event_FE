import Footer from 'src/Components/Footer/Footer'
import HeaderHomePage from 'src/Components/HeaderHomePage/HeaderHomePage'

const Register = () => {
  return (
    <div className='bg-blue_night'>
      <HeaderHomePage />
      <div className='container flex items-center justify-center text-[#ffffff] font-euclid'>
        <div className='bg-black_night w-[435px] h-[510px] border rounded-[20px]'>
          <div className='pt-24 pl-16'>
            <div className='pb-6 font-bold text-xl'>Welcome to EventBook</div>
            <form>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold'>Email</label>
                  <input
                    type='text'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px]'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold'>Password</label>
                  <input
                    type='text'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px]'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <label className='pl-1 pb-4 font-bold'>
                    Confirm password
                  </label>
                  <input
                    type='text'
                    className='pl-4 h-9 w-80 outline-none bg-[#1F1D1B] rounded-[10px]'
                  />
                </div>
                <div className='pl-2 mt-1 text-red min-h-[1.25rem] text-sm'></div>
              </div>
              <button className='h-10 w-80 bg-[#ffff] text-[#000000] rounded-[10px]'>
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
