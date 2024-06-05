import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import authAPI from 'src/apis/auth.api'
import { getRefreshTokenFromLS } from 'src/utils/auth'

const HeaderAdmin = () => {
  const logoutMutation = useMutation({
    mutationFn: (body: { refresh_token: string }) => authAPI.logout(body)
  })

  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate({ refresh_token })
  }

  return (
    <header>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
          </div>
          <Link to={'/'} className='btn btn-ghost text-xl'>
            Event Book
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'></div>
        <div className='navbar-end'>
          <button className='btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin
