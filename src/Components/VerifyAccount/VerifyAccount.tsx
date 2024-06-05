import { Link } from 'react-router-dom'
import path from 'src/constants/path'

const VerifyAccount = () => {
  return (
    <div>
      <p>Verify account success</p>
      <Link to={path.home}>Home</Link>
      <Link to={path.login}>Login</Link>
    </div>
  )
}

export default VerifyAccount
