import EventList from 'src/Components/EventLists/EventList'
import Footer from 'src/Components/Footer/Footer'
import HeaderAdmin from 'src/Components/HeaderAdmin/HeaderAdmin'

const AdminDashboard = () => {
  return (
    <div className='bg-black_night h-autop'>
      <HeaderAdmin />
      <div className='container'>
        <div className='m-6 grid grid-cols-3 gap-10'>
          {/* {Array(12)
            .fill(0)
            .map((_, index) => (
              <EventList
                key={index}
                className='hover:translate-y-[-0.625rem] hover:shadow-md duration-100 transition-transform'
              />
            ))} */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard
