import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
const CoachDashboard = () => {
    const [athelete,setathlete] = useState([]);
    async function fetchAthletes() {
    try {
        const res = await axios.get("http://localhost:5000/getatheletes");
        setathlete(res.data.getatheletes)
    } catch (error) {
        alert(`error while fetching athletes`)
        console.log(error);
        
    }
    }
    useEffect(()=>{
        fetchAthletes()
    },[])
  return (
    <>
    <h2>Coach Dashboard</h2>
    <h4>All Atheletes</h4>
        <table cellPadding="8" border="2">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>

                <tbody>
                    {  athelete.map((a)=>(
                        <tr key={a._id}>
                            <td>{a.fullname}</td>
                            <td>{a.email}</td>
                        </tr>

                    ))
                    }
                </tbody>
        </table>
    </>
  )
}

export default CoachDashboard;