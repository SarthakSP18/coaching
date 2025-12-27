import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [coaches, setCoaches] = useState([]);
  const [athletes, setAthletes] = useState([]);

  async function fetchCoaches() {
    const res = await axios.get("http://localhost:5000/getcoaches");
    setCoaches(res.data.getcoaches);
  }

  async function fetchAthletes() {
    const res = await axios.get("http://localhost:5000/getatheletes");
    setAthletes(res.data.getatheletes);
  }

  useEffect(() => {
    fetchCoaches();
    fetchAthletes();
  }, []);

  async function handleCoachDelete(id) {
    if (window.confirm("Delete coach ?")) {
      await axios.delete(`http://localhost:5000/deletecoaches/${id}`);
      fetchCoaches();
    }
  }

  async function handleAthleteDelete(id) {
    if (window.confirm("Delete athlete ?")) {
      await axios.delete(`http://localhost:5000/deleteatheletes/${id}`);
      fetchAthletes();
    }
  }

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <div>
        <h3 className="mb-2 font-medium">All Coaches</h3>
        <table className="border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Fullname</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {coaches.length > 0 ? (
              coaches.map((c) => (
                <tr key={c._id}>
                  <td className="border p-2">{c.fullname}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">
                    <button
                      className="px-3 py-1 border border-red-500 text-red-500"
                      onClick={() => handleCoachDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border p-2 text-center">
                  No coaches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-2 font-medium">All Athletes</h3>
        <table className="border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Fullname</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {athletes.length > 0 ? (
              athletes.map((a) => (
                <tr key={a._id}>
                  <td className="border p-2">{a.fullname}</td>
                  <td className="border p-2">{a.email}</td>
                  <td className="border p-2">
                    <button
                      className="px-3 py-1 border border-red-500 text-red-500"
                      onClick={() => handleAthleteDelete(a._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border p-2 text-center">
                  No athletes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
