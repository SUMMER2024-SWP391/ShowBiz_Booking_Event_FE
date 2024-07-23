import { Route, Routes } from 'react-router-dom'
import { UserRole } from 'src/@types/enum'
import AdminTableEventList from 'src/Components/AdminAllEventList/AdminAllEventList'
import Chart from 'src/Components/Chart/Chart'
import CreateEventOperator from 'src/Components/CreateEventOperator/CreateEventOperator'
import HeaderAdmin from 'src/Components/HeaderAdmin/HeaderAdmin'
import SideBarAdmin from 'src/Components/SideBarAdmin/SideBarAdmin'
import TableUser from 'src/Components/TableUser/TableUser'

const AdminPage = () => {
  return (
    <div className='container'>
      <HeaderAdmin />
      <div className='grid grid-cols-10'>
        <div className='col-span-2'>
          <SideBarAdmin />
        </div>
        <div className='col-span-8'>
          <Routes>
            <Route path='chart' element={<Chart />}></Route>
            <Route path='list-all-user' element={<TableUser role={''} />} />
            <Route
              path='list-event-operator'
              element={<TableUser role={UserRole.EventOperator} />}
            />
            <Route
              path='list-visitor'
              element={<TableUser role={UserRole.Visitor} />}
            />
            <Route path='list-all-event' element={<AdminTableEventList />} />
            <Route
              path='create-event-operator'
              element={<CreateEventOperator />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
