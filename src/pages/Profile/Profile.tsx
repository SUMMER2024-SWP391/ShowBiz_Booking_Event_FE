import { useQuery } from '@tanstack/react-query'
import { NavLink, Route, Routes } from 'react-router-dom'
import ChangePassword from 'src/Components/ChangePassword/ChangePassword'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import ProfileComponent from 'src/Components/ProfileComponent/ProfileComponent'
import UpdateProfile from 'src/Components/UpdateProfile/UpdateProfile'
import authAPI from 'src/apis/auth.api'

const Profile = () => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => authAPI.getMe()
  })

  return (
    <div className='bg-gradient_vistor'>
      <Header />
      <div className='container h-96 flex flex-col justify-start items-center'>
        <div className='mb-4 mt-2'>
          <ul className='menu menu-vertical lg:menu-horizontal bg-white-A700 rounded-box'>
            <li className='bg-white-A700 text-black-900'>
              <NavLink to={'/profile/info'}>Profile</NavLink>
            </li>
            <li className='bg-white-A700 text-black-900'>
              <NavLink to={'/profile/update'}>Update Profile</NavLink>
            </li>
            <li className='bg-white-A700 text-black-900'>
              <NavLink to={'/profile/change-password'}>Change password</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route
              path='info'
              element={data && <ProfileComponent user={data.data.data.user} />}
            />
            <Route path='update' element={<UpdateProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
