import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { Button } from '../Button/Button'
import { setEventIdToLS } from 'src/utils/auth'
import { useQuery } from '@tanstack/react-query'
import eventApi from 'src/apis/event.api'

interface Props {
  handleRegisterEvent: () => void
}

const HandleLoginWhenRegisterEvent = ({ handleRegisterEvent }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isAuthenticated, setEventId } = useContext(AppContext)
  const handleLogin = () => {
    setEventIdToLS(id as string)
    setEventId(id as string)
    navigate('/login')
  }

  if (!isAuthenticated) {
    return (
      <Button
        size='lg'
        shape='round'
        className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#9DADBC] text-white-A700'
        onClick={handleLogin}
      >
        Register Now
      </Button>
    )
  }
  return (
    <Button
      size='lg'
      shape='round'
      className='min-w-[423px] font-semibold hover:shadow-md sm:px-5 bg-[#9DADBC] text-white-A700'
      onClick={handleRegisterEvent}
    >
      Register Now
    </Button>
  )
}

export default HandleLoginWhenRegisterEvent
