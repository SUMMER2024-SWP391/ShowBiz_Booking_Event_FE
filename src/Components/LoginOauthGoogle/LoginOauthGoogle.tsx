import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserRole, UserVerifyStatus } from 'src/@types/enum'
import { User } from 'src/@types/users.type'
import { AppContext } from 'src/context/app.context'
import {
  clearEventIdFromLS,
  getEventIdFromLS,
  setIsStaffToLS,
  setProfileToLS,
  setTokenToLS
} from 'src/utils/auth'
import { convertIntToEnum } from 'src/utils/helper'
const LoginOauthGoogle = () => {
  const { setIsAuthenticated, setIsStaff } = useContext(AppContext)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = getEventIdFromLS()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    // const new_user = params.get('new_user')
    const verify = convertIntToEnum(
      UserVerifyStatus,
      parseInt(params.get('verify') as string)
    )
    const role = convertIntToEnum(
      UserRole,
      parseInt(params.get('role') as string)
    )
    const isStaff = params.get('isStaff')

    const user_id = params.get('user_id')
    const user_name = params.get('user_name')
    const userInfo: Pick<User, '_id' | 'user_name' | 'role' | 'status'> = {
      _id: user_id as string,
      user_name: user_name as string,
      role: role,
      status: verify
    }
    setIsAuthenticated(true)
    setTokenToLS(access_token as string, refresh_token as string)
    setProfileToLS(userInfo as User)
    if (isStaff && id) {
      clearEventIdFromLS()
      navigate(`/events/${id}`)
    } else if (isStaff && !id) {
      setIsStaffToLS(isStaff == 'true' ? true : false)
      setIsStaff(isStaff == 'true' ? true : false)
    } else if (role === UserRole.EventOperator) {
      navigate('/event-operator/')
    } else if (role === UserRole.Admin) {
      navigate('/admin')
    } else {
      navigate(`/`)
    }
  }, [params, id])
  return <div>Login</div>
}
export default LoginOauthGoogle
