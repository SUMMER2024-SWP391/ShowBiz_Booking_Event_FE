import AdminEventList from '../AdminEventList/AdminEventList'

const TableEventList = () => {
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event operator name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array(10)
            .fill(0)
            .map((index) => (
              <AdminEventList key={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableEventList
