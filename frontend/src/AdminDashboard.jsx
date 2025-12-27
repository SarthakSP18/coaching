import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const [data, setdata] = useState([])

  async function fetchUsers() {
    const res = await axios.get("http://localhost:5000/getcoaches")
    setdata(res.data.getcoaches)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleDelete(id) {
    if (window.confirm("delete coach ?")) {
      try {
        await axios.delete(`http://localhost:5000/deleteusers/${id}`)
        alert("User deleted success !")
        fetchUsers()
      } catch (error) {
        alert("error while deleting user")
        console.log(error)
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Admin Dashboard</h2>
      <h4 className="mb-3">All Coaches</h4>

      <table className="border border-gray-400" cellPadding="8">
        <thead>
          <tr>
            <th className="border border-gray-400">Fullname</th>
            <th className="border border-gray-400">Email</th>
            <th className="border border-gray-400">Activity</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((e) => (
              <tr key={e._id}>
                <td className="border border-gray-400">{e.fullname}</td>
                <td className="border border-gray-400">{e.email}</td>
                <td className="border border-gray-400">
                  <button
                    className="px-2 py-1 border border-gray-400"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-400" colSpan="3">
                Coaches not found
              </td>
            </tr>
          )}
        </tbody>
      </table><br />
      <h3>All Atheletes</h3>
    </div>
  )
}

export default AdminDashboard;
