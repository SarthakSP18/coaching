import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const AthleteLogin = () => {
    const navigate = useNavigate();
    const [data,setdata] = useState({email:"",password:""});

    async function handleForm(e){
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/atheletelogin",data);
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            alert("Athelete Login Successful !!");
            console.log(data);
            setdata({email:"",password:""});
            navigate("/atheletedashboard");
        } catch (error) {
            alert("login failed")
            console.log(error);
            
        }
    }
    function handleChange(e){
        setdata({...data,[e.target.name]:e.target.value})
    }
  return (
    <div>
       <form action="" onSubmit={handleForm}>
            <h2>Login Form</h2>
            <input type="email" name='email'  value={data.email} placeholder='Enter EmailID ' onChange={handleChange} required/><br /><br />
            <input type="password" name='password'  value={data.password} placeholder='Enter Password ' onChange={handleChange} required/><br /><br />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default AthleteLogin;
