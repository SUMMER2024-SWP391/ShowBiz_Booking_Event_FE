import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { setTokenToLS } from 'src/utils/auth'
const LoginOauthGoogle = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    // const new_user = params.get('new_user')
    // const verify = params.get('verify')

    setIsAuthenticated(true)
    setTokenToLS(access_token as string, refresh_token as string)
    navigate('/')
  }, [params])
  return <div>Login</div>
}
export default LoginOauthGoogle
