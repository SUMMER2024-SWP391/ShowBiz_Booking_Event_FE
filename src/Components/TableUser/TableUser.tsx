import AdminUserList from '../AdminUserList/AdminUserList'

const TableUser = () => {
  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(0)
              .map((index) => (
                <AdminUserList key={index + 1} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableUser
