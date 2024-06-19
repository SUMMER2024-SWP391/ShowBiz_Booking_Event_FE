import { useParams } from 'react-router-dom'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import InfoEventRegisterOfUser from 'src/Components/InfoEventRegisterOfUser/InfoEventRegisterOfUser'

const TicketDetail = () => {
  const { id } = useParams()
  return (
    <>
      <Header />
      <div className='container flex flex-col justify-center items-center w-[90%]'>
        {id && <InfoEventRegisterOfUser id={id} />}
      </div>
      <Footer />
    </>
  )
}

export default TicketDetail
